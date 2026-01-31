import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar.jsx';
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

    const handleSearchResults = (results) => {
        if (onSearchResults) {
            onSearchResults(results);
        }
    };

    const openSettings = () => {
        setIsSettingsOpen(true);
    };

    const closeSettings = () => {
        setIsSettingsOpen(false);
    };

    return (
        <div className="flex flex-col pb-4">
            {/* Inline LogoStamp and Buttons */}
            <div className="flex items-center justify-start gap-6 mb-4">
                <SettingsAndSupport onOpenSettings={openSettings} />
            </div>

            {/* 4x4 Grid Layout */}
            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-4 max-w-5xl w-full">
                <SearchBar onSearchResults={handleSearchResults} />
                <RecentTags onTagClick={handleTagClick} />
                <Tools selectedComponent={selectedComponent} />
                <LanguagesInDirTags onLanguageClick={handleLanguageClick} />
            </div>

            {/* Settings Popup */}
            {isSettingsOpen && <SettingsPopup onClose={closeSettings} />}
        </div>
    );
}
