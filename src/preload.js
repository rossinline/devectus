// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

// Rendering settings and application window setup
contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: { invoke: (channel, data) => ipcRenderer.invoke(channel, data), },
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
    on: (channel, callback) => ipcRenderer.on(channel, (event, ...args) => callback(...args)),
    
    getTheme: () => ipcRenderer.invoke('get-theme-setting'),  
    setTheme: (theme) => ipcRenderer.invoke('set-theme-setting', theme), 

    getSettings: () => ipcRenderer.invoke('get-settings'),

    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    maximizeWindow: () => ipcRenderer.send('maximize-window'),
    closeWindow: () => ipcRenderer.send('close-window'),
    refreshWindow: () => ipcRenderer.invoke('refresh-window'),
    
    // Maximize/Unmaximize window handlers
    onMaximize: (callback) => {
        const subscription = (event) => callback();
        ipcRenderer.on('window-maximized', subscription);
        return () => ipcRenderer.removeListener('window-maximized', subscription);
    },
    onUnmaximize: (callback) => {
        const subscription = (event) => callback();
        ipcRenderer.on('window-unmaximized', subscription);
        return () => ipcRenderer.removeListener('window-unmaximized', subscription);
    },
    removeMaximizeListener: () => ipcRenderer.removeAllListeners('window-maximized'),
    removeUnmaximizeListener: () => ipcRenderer.removeAllListeners('window-unmaximized'),
});

// Quickly apply initial theme to prevent flash of unstyled content
// App.jsx handles all actual theme management, syncing, and preference logic
window.addEventListener('DOMContentLoaded', () => {
    // Apply theme from localStorage (user preference) or system preference
    const userTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = userTheme ? userTheme === 'dark' : systemPrefersDark;
    
    document.body.classList.toggle('dark', shouldBeDark);
    document.body.style.visibility = 'visible';
});

console.log("!!! context bridge works !!!");
