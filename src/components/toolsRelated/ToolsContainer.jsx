import React, { useState, useEffect } from 'react';
import RecentTags from './RecentTags.jsx';
import Tools from './Tools.jsx';
import LanguagesInDirTags from './LangaugesInDirTags.jsx';
import SettingsPopup from './SettingsPopup.jsx';
import SettingsAndSupport from './SettingsAndSupport.jsx';

export default function SearchAndToolsContainer({ selectedComponent, onSearchResults }) {
    const [components, setComponents] = useState([]);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const fetchComponents = async () => {
        const fetchedComponents = await window.electron.invoke('get-components');
        setComponents(fetchedComponents);
    };

    useEffect(() => {
        fetchComponents();
    }, []);

    const handleTagClick = (tag) => {
        if (onSearchResults) {
            onSearchResults(components.filter(component => component.tags.includes(tag)));
        }
    };

    const handleLanguageClick = (language) => {
        if (onSearchResults) {
            onSearchResults(components.filter(component => component.languages.includes(language)));
        }
    };

    const openSettings = () => {
        setIsSettingsOpen(true);
    };

    const closeSettings = () => {
        setIsSettingsOpen(false);
    };

    return (
        <div className="flex flex-col">
            {/* Inline LogoStamp and Buttons */}
            <div className="flex items-center justify-start gap-6 mb-4">
                <SettingsAndSupport onOpenSettings={openSettings} />
            </div>

            {/* 2x2 Grid Layout with Languages spanning 2 rows */}
            <div className="mt-2 grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-4 max-w-5xl w-full">
                <RecentTags onTagClick={handleTagClick} />
                <LanguagesInDirTags onLanguageClick={handleLanguageClick} className="row-span-2" />
                <Tools selectedComponent={selectedComponent} />
            </div>

            {/* Settings Popup */}
            {isSettingsOpen && <SettingsPopup onClose={closeSettings} />}
        </div>
    );
}
