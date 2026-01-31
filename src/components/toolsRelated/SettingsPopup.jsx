import React, { useEffect, useState } from 'react';
import { SquareX, Sun, Moon, SunMoon } from 'lucide-react';

const SettingsPopup = ({ onClose }) => {
    // Calculate initial theme mode synchronously to prevent flash
    const [themeMode, setThemeMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'auto';
    });

    // Set dark mode
    const setDarkMode = async () => {
        try {
            setThemeMode('dark');
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            await window.electron.setTheme('dark'); // Update theme in main process
        } catch (error) {
            console.error('Error setting dark theme:', error);
        }
    };

    // Set light mode
    const setLightMode = async () => {
        try {
            setThemeMode('light');
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            await window.electron.setTheme('light'); // Update theme in main process
        } catch (error) {
            console.error('Error setting light theme:', error);
        }
    };

    // Set auto mode (follow system preference)
    const setAutoMode = async () => {
        try {
            setThemeMode('auto');
            localStorage.removeItem('theme'); // Remove manual preference
            
            // Apply current system preference
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.body.classList.toggle('dark', systemPrefersDark);
            
            const systemTheme = systemPrefersDark ? 'dark' : 'light';
            await window.electron.setTheme(systemTheme); // Update theme in main process
        } catch (error) {
            console.error('Error setting auto theme:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-background rounded-default shadow-lg w-2/3 h-4/5 relative flex flex-col">
                {/* Title Bar */}
                <div className="shrink-0 flex items-center justify-between bg-background rounded-default p-4 border-b border-foreground rounded-t-default">
                    <h2 className="text-md font-semibold text-text">Settings</h2>
                    <button onClick={onClose} className="text-text hover:text-red-500">
                        <SquareX />
                    </button>
                </div>
                <div className="p-4 overflow-y-auto overflow-x-hidden grow">
                    {/* Settings Content */}
                    <h2 className="mb-4 text-sm text-text">Choose App Theme -</h2>
                    <div className="flex space-x-4">
                        <button 
                            onClick={setAutoMode} 
                            className={`group flex flex-col items-center justify-center text-text rounded-default p-2 space-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-100 ease-in-out ${themeMode === 'auto' ? 'bg-accent hover:text-text' : 'bg-foreground hover:text-accent'}`}
                        >
                            <SunMoon size={24} />
                            <span className="text-xs">Auto (System)</span>
                        </button>
                        <button 
                            onClick={setLightMode} 
                            className={`group flex flex-col items-center justify-center rounded-default p-2 space-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-100 ease-in-out ${themeMode === 'light' ? 'bg-accent hover:text-text' : 'bg-foreground hover:text-accent'}`}
                        >
                            <Sun size={24} />
                            <span className="text-xs">Light Mode</span>
                        </button>
                        <button 
                            onClick={setDarkMode} 
                            className={`group flex flex-col items-center justify-center text-text rounded-default p-2 space-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-100 ease-in-out ${themeMode === 'dark' ? 'bg-accent hover:text-text' : 'bg-foreground hover:text-accent'}`}
                        >
                            <Moon size={24} />
                            <span className="text-xs">Dark Mode</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPopup;
