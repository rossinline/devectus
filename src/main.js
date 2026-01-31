const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');
const Database = require('better-sqlite3');

// Use process.cwd() to get the current working directory (project root) and add the db to that area
const dbPath = path.join(process.cwd(), 'app.db');
console.log('Database path:', dbPath);

// Initialize the database
const db = new Database(dbPath);
console.log('Connected to the SQLite database.');

// Create tables synchronously
try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS components (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      tags TEXT,
      languages TEXT,
      code1 TEXT,
      code2 TEXT,
      code3 TEXT,
      isPinned INTEGER DEFAULT 0
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      themeSet TEXT
    )
  `);

  // Default theme setup
  const stmt = db.prepare('INSERT OR IGNORE INTO settings (id, themeSet) VALUES (?, ?)');
  stmt.run(1, 'light');

  console.log('Database initialized and tables created.');
} catch (err) {
  console.error('Error initializing database:', err.message);
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true, // Enable context isolation
      nodeIntegration: false, // Disable Node.js integration
      enableRemoteModule: false, // Disable remote module for better security
      webSecurity: true // Ensure web security is enable
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();

  // Send maximize/unmaximize events to renderer
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-maximized');
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-unmaximized');
  });

  // Register global shortcut for refreshing the window
  const ret = globalShortcut.register('CommandOrControl+R', () => {
    console.log('CommandOrControl+R is pressed: refreshing the window');
    mainWindow.reload();
  });
  if (!ret) {
    console.log('Global shortcut registration failed');
  }

  // IPC handler for reloading the window/application
  ipcMain.handle('reload-window', () => {
    mainWindow.reload();
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for window actions
//Minimise application
ipcMain.handle('minimize-window', (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  window.minimize();
});

//Maximise application
ipcMain.handle('maximize-window', (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  window.maximize();
});

//Unmaximise/Restore application
ipcMain.handle('unmaximize-window', (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  window.unmaximize();
});

// Check if window is maximized
ipcMain.handle('is-maximized', (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  return window.isMaximized();
});

// Close Application
ipcMain.handle('close-window', (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  window.close();
});

// ----------------- Database Operations ----------------- //

// Insert component
ipcMain.handle('insert-component', async (event, component) => {
  const { name, tags, languages, code1, code2, code3 } = component;
  try {
    const stmt = db.prepare(`
      INSERT INTO components (name, tags, languages, code1, code2, code3) 
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(name, JSON.stringify(tags), JSON.stringify(languages), code1, code2, code3);
    return info.lastInsertRowid;
  } catch (err) {
    console.error('Error inserting component:', err.message);
    throw err;
  }
});

// Get components
ipcMain.handle('get-components', async () => {
  try {
    const stmt = db.prepare('SELECT * FROM components');
    const rows = stmt.all();
    const components = rows.map(component => ({
      ...component,
      tags: JSON.parse(component.tags),
      languages: JSON.parse(component.languages)
    }));
    return components;
  } catch (err) {
    console.error('Error fetching components:', err.message);
    throw err;
  }
});

// Search components
ipcMain.handle('search-components', async (event, searchQuery) => {
  try {
    const likeQuery = `%${searchQuery}%`;
    const stmt = db.prepare(`
      SELECT * FROM components 
      WHERE name LIKE ? OR tags LIKE ? OR languages LIKE ?
    `);
    const rows = stmt.all(likeQuery, likeQuery, likeQuery);
    const components = rows.map(component => ({
      ...component,
      tags: JSON.parse(component.tags),
      languages: JSON.parse(component.languages)
    }));
    return components;
  } catch (err) {
    console.error('Error searching components:', err.message);
    throw err;
  }
});

// Delete component
ipcMain.handle('delete-component', async (event, componentId) => {
  try {
    const stmt = db.prepare('DELETE FROM components WHERE id = ?');
    stmt.run(componentId);
    return { success: true };
  } catch (err) {
    console.error('Error deleting component:', err.message);
    throw err;
  }
});

// Update component
ipcMain.handle('update-component', async (event, updatedComponent) => {
  const { id, name, tags, languages, code1, code2, code3 } = updatedComponent;
  try {
    const stmt = db.prepare(`
      UPDATE components
      SET name = ?, tags = ?, languages = ?, code1 = ?, code2 = ?, code3 = ?
      WHERE id = ?
    `);
    stmt.run(name, JSON.stringify(tags), JSON.stringify(languages), code1, code2, code3, id);
    return { success: true };
  } catch (err) {
    console.error('Error updating component:', err.message);
    throw err;
  }
});

// IPC handler to pin/unpin a component
ipcMain.handle('toggle-pin-component', async (event, componentId, isPinned) => {
  try {
    const stmt = db.prepare('UPDATE components SET isPinned = ? WHERE id = ?');
    stmt.run(isPinned ? 1 : 0, componentId);
    console.log(`Component with ID ${componentId} pinned state updated to ${isPinned}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating pin state:', error);
    throw error;
  }
});



// ------------------- Search History ------------------- //

// Insert search history
ipcMain.handle('insert-search-history', async (event, searchQuery) => {
  try {
    const checkStmt = db.prepare('SELECT COUNT(*) AS count FROM search_history WHERE search_query = ?');
    const row = checkStmt.get(searchQuery);
    
    if (row.count > 0) {
      console.log('Search query already exists. Not inserting.');
      return { success: false, message: 'Query already exists' };
    }

    // Insert the new search history entry
    const insertStmt = db.prepare('INSERT INTO search_history (search_query) VALUES (?)');
    const info = insertStmt.run(searchQuery);

    // Check total number of entries and delete if necessary
    const countStmt = db.prepare('SELECT COUNT(*) AS count FROM search_history');
    const countRow = countStmt.get();
    
    const max_history_entries = 5;
    if (countRow.count > max_history_entries) {
      const deleteStmt = db.prepare(`
        DELETE FROM search_history
        WHERE id IN (SELECT id FROM search_history ORDER BY timestamp ASC LIMIT ?)
      `);
      deleteStmt.run(countRow.count - max_history_entries);
    }
    
    return { success: true, id: info.lastInsertRowid };
  } catch (err) {
    console.error('Error managing search history:', err.message);
    throw err;
  }
});

// Get search history
ipcMain.handle('get-search-history', async () => {
  try {
    const stmt = db.prepare('SELECT * FROM search_history ORDER BY timestamp DESC');
    return stmt.all();
  } catch (err) {
    console.error('Error fetching search history:', err.message);
    throw err;
  }
});

// ------------------- Theme Settings ------------------- //

// Get theme setting
ipcMain.handle('get-theme-setting', async () => {
  try {
    const stmt = db.prepare('SELECT themeSet FROM settings WHERE id = 1');
    const row = stmt.get();
    return row.themeSet;
  } catch (err) {
    console.error('Error fetching theme setting:', err.message);
    throw err;
  }
});

// Set theme setting
ipcMain.handle('set-theme-setting', async (event, theme) => {
  try {
    const stmt = db.prepare('UPDATE settings SET themeSet = ? WHERE id = 1');
    stmt.run(theme);
    return { success: true };
  } catch (err) {
    console.error('Error updating theme setting:', err.message);
    throw err;
  }
});
