import React, { useState, useEffect } from 'react';
import { Minus, Square, Copy, X } from 'lucide-react';

const CustomTitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  // Listen for maximize/unmaximize events from main process
  useEffect(() => {
    const handleMaximize = () => setIsMaximized(true);
    const handleUnmaximize = () => setIsMaximized(false);

    window.electron.onMaximize?.(handleMaximize);
    window.electron.onUnmaximize?.(handleUnmaximize);

    // Check initial state
    window.electron.invoke('is-maximized')?.then(setIsMaximized).catch(() => {});

    return () => {
      window.electron.removeMaximizeListener?.();
      window.electron.removeUnmaximizeListener?.();
    };
  }, []);

  // Minimize application
  const minimizeWindow = () => {
    window.electron.invoke('minimize-window');
  };

  // Toggle maximize/restore application
  const toggleMaximizeWindow = () => {
    if (isMaximized) {
      window.electron.invoke('unmaximize-window');
    } else {
      window.electron.invoke('maximize-window');
    }
  };

  // Close application
  const closeWindow = () => {
    window.electron.invoke('close-window');
  };

  return (
    <div
    className="title-bar flex justify-between items-center bg-foreground"
    style={{ WebkitUserSelect: 'none', WebkitAppRegion: 'drag' }}
  >
    {/* Devectus Text on the left side */}
    <div className="title-bar-logo w-auto" style={{ WebkitAppRegion: 'drag' }}>
    <p className="p-1 text-xs font-semibold">Devectus</p>
    </div>
  
    {/* Buttons on the right side */}
    <div className="title-bar-buttons flex space-x-2" style={{ WebkitAppRegion: 'no-drag' }}>
      <button className="title-bar-button flex items-center justify-center w-8 h-6 p-1 bg-transparent hover:bg-background rounded-sm" onClick={minimizeWindow}>
        <Minus size={16} className="text-text" />
      </button>
      
      <button className="title-bar-button flex items-center justify-center w-8 h-6 p-1 bg-transparent hover:bg-background rounded-sm" onClick={toggleMaximizeWindow}>
        {isMaximized ? (
          <Copy size={12} className="text-text rotate-90" />
        ) : (
          <Square size={11} className="text-text" />
        )}
      </button>
      
      <button className="title-bar-button flex items-center justify-center w-8 h-6 p-1 bg-transparent hover:bg-red-500 rounded-sm" onClick={closeWindow}>
        <X size={16} className="text-text" />
      </button>
    </div>
  </div>
  
  );
};

export default CustomTitleBar;
