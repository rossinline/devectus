import React, { useEffect } from 'react';
import 'devicon/devicon.min.css';
import Titlebar from './components/TitleBar.jsx';
import DashContainer from './components/DashContainer.jsx';
import AddCompPopup from './components/toolsrelated/addingComponents/AddCompPopup.jsx';

export default function App() {
    useEffect(() => {
        // Function to apply the saved theme on page load
        const applySavedTheme = async () => {
            try {
                // Check if user has manually set a theme preference
                let userTheme = localStorage.getItem('theme');
                
                if (userTheme) {
                    // User has a saved preference, use it
                    document.body.classList.toggle('dark', userTheme === 'dark');
                    await window.electron.setTheme(userTheme); // Sync to database
                } else {
                    // No user preference, use auto mode (follow system preference)
                    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    const systemTheme = systemPrefersDark ? 'dark' : 'light';
                    
                    // Apply theme class but DON'T save to localStorage (keep auto mode)
                    document.body.classList.toggle('dark', systemPrefersDark);
                    await window.electron.setTheme(systemTheme);
                }
            } catch (error) {
                console.error('Error applying theme:', error);
                // Fallback to system preference
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.body.classList.toggle('dark', systemPrefersDark);
            }
        };

        // Listen for system theme changes (only if user hasn't set a manual preference)
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (e) => {
            const userTheme = localStorage.getItem('theme');
            // Only apply system theme if user hasn't set a manual preference
            if (!userTheme) {
                const newTheme = e.matches ? 'dark' : 'light';
                document.body.classList.toggle('dark', e.matches);
                window.electron.setTheme(newTheme).catch(console.error);
            }
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);
        applySavedTheme();

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, []);

    return (
        <div className='bg-background text-text h-screen transition-all duration-300 ease-in-out overflow-hidden'>
            <Titlebar />
            <DashContainer />
            <AddCompPopup />
        </div>
    );
}
