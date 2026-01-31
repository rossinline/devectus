import React, { useState } from 'react';
import { SearchCode } from 'lucide-react';

export default function SearchBar({ onSearchResults }) {
  const [query, setQuery] = useState('');

  // Set input change
  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
  };

  // Search submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Search db
      const results = await window.electron.invoke('search-components', query);
      
      // If callback, pass search results to parent 
      if (onSearchResults) {
        onSearchResults(results);
      }

      // Store search query if it matches any tags
      if (results.some(result => result.tags.includes(query))) {
        await window.electron.invoke('insert-search-history', query);
        await window.electron.invoke('delete-old-search-history');
        
        console.log("awaiting");
      }

    } catch (error) {
      console.error('Error searching components:', error);
    }
  };

  return (
    <div className="max-w-md">
      {/* Title */}
      <h2 className="text-sm font-semibold text-text mb-1">Search</h2>
      
      {/* Search Form */}
      <form
        className="flex items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          className="flex-1 py-2 px-2 mr-0.5 w-1/2 border-none bg-foreground focus:outline-2 focus:outline-accent text-sm text-text rounded-l-default"
        />
        <button
          type="submit"
          className="group flex flex-col items-center justify-center bg-foreground text-text hover:text-accent rounded-r-default focus:outline-2 focus:outline-accent p-2 space-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-100 ease-in-out"
        >
          <SearchCode size={20} />
        </button>
      </form>
    </div>
  );
}
