import React, { useState } from "react";
import ToolsContainer from "./toolsRelated/ToolsContainer.jsx";
import ComponentsContainer from "./componentsrelated/ComponentsContainer.jsx";
import CodeSpaceContainer from "./CodeSpaceContainer.jsx";

// Parent Container
export default function DashContainer() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
    console.log("Selected component:", component);
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 p-8 h-full">
      {/* Left Column Widget */}
      <div className="w-4/12 pb-2 flex flex-col h-full">
        <div className="flex h-60 flex-none">
          <ToolsContainer
            selectedComponent={selectedComponent}
            onSearchResults={handleSearchResults}
          />
        </div>
        <div className="flex flex-1 mt-2 min-h-0">
          <ComponentsContainer
            searchResults={searchResults}
            onComponentClick={handleComponentClick}
          />
        </div>
      </div>

      {/* Right Column Widget */}
      <div className="w-8/12 p-2 h-full">
        <CodeSpaceContainer component={selectedComponent} />
      </div>
    </div>
  );
}
