import React, { useEffect, useState } from 'react';

export default function LanguagesInDirTags({ onLanguageClick }) {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        // Fetch all components from the database
        const allComponents = await window.electron.invoke('get-components');
        // Extract unique languages from all components
        const uniqueLanguages = Array.from(
          new Set(allComponents.flatMap(component => component.languages))
        );
        // Truncate the list to 15 languages
        setLanguages(uniqueLanguages.slice(0, 15));
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <div className="max-w-md row-span-2">
      {/* Title */}
      <h2 className="text-sm font-semibold text-text mb-1">Languages</h2>
      
      {/* Tag Container */}
      <div className="flex flex-wrap gap-2">
        {languages.map((language, index) => (
          <span
            key={index}
            onClick={() => onLanguageClick(language)}
            className="px-3 py-1 text-[10px] shadow-inner font-medium tracking-wide uppercase bg-foreground hover:outline hover:outline-accent text-text rounded-default space-y-1 cursor-pointer focus:outline-2 focus:outline-accent transition-all duration-100 ease-in-out"
          >
            {language}
          </span>
        ))}
      </div>
    </div>
  );
}
