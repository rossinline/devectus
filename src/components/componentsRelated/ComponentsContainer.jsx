import React, { useEffect, useState } from 'react';
import { Pin, Folder, PencilLine, Tag, Code, FolderX } from 'lucide-react';
import PinnedBoxComponents from './PinnedBoxComponents.jsx';
import ComponentBox from './ComponentsBox.jsx';

const ComponentsContainer = ({ onComponentClick, searchResults }) => {
  const [components, setComponents] = useState([]);
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  const [displayedComponents, setDisplayedComponents] = useState([]);

  useEffect(() => {
    fetchComponents();
  }, []);

  // Fetch component data from database
  const fetchComponents = async () => {
    const fetchedComponents = await window.electron.invoke('get-components');
    setComponents(fetchedComponents);
    setDisplayedComponents(fetchedComponents);
  };

  // Display Search Results in Components area
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setDisplayedComponents(searchResults);
    } else {
      setDisplayedComponents(components);
    }
  }, [searchResults, components]);

  // On component click
  const handleComponentClick = (component) => {
    setSelectedComponentId(component.id);
    onComponentClick(component);
  };

  // On component delete
  const handleComponentDeleted = (componentId) => {
    setComponents(components.filter(component => component.id !== componentId));
    setDisplayedComponents(displayedComponents.filter(component => component.id !== componentId));
  };

  // On component Update/Edit
  const handleComponentUpdated = (updatedComponent) => {
    const updatedComponents = components.map(comp =>
      comp.id === updatedComponent.id ? updatedComponent : comp
    );
    setComponents(updatedComponents);
    setDisplayedComponents(updatedComponents);
  };

  //Pinned and Unpinned setup
  const pinnedComponents = displayedComponents.filter(component => component.isPinned);
  const unpinnedComponents = displayedComponents.filter(component => !component.isPinned);

  return (
    <div className="w-full my-4 bg-foreground rounded-default shadow-inner scrollbar-thin scrollbar-thumb-muted scrollbar-track-foreground h-[56.82vh] overflow-hidden hover:overflow-y-auto">
      {/* Total number of snippets */}
      <div className="flex flex-col items-center justify-center py-3 mb-1">
        <h2 className="text-sm font-medium text-muted">
          Total Components: {components.length}
        </h2>
        <div className="w-full border-b border-border my-2"></div>
      </div>
      <div className="px-4 pb-4">
      {displayedComponents.length === 0 ? (
        <div>
          <div className="flex flex-col items-center mb-4">
            <Pin className="text-text mr-2" size={18} />
            <h2 className="text-sm font-medium text-text">Pinned Components</h2>
            <div className="w-full border-b border-border my-2"></div>
          </div>
          <div className="flex flex-col items-center mb-4">
            <Folder className="text-text mr-2" size={18} />
            <h2 className="text-sm font-medium text-text">Components</h2>
            <div className="w-full border-b border-border my-2"></div>
          </div>
          <div className="flex items-center justify-between mb-2 text-sm text-muted">
            <div className="flex items-center w-3/12">
              <PencilLine className="mr-1" size={16} />
              <span>File Name</span>
            </div>
            <div className="flex items-center justify-center w-6/12">
              <Tag className="mr-1" size={16} />
              <span>Tags</span>
            </div>
            <div className="flex items-center w-3/12 justify-end">
              <Code className="mr-1" size={16} />
              <span>Languages</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-52 text-muted">
            <FolderX size={70} />
            <p className="text-md text-center">No components</p>
            <p className="text-md text-center">Click "Add" to create a new component</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center">
              <Pin className="text-accent mr-2" size={18} />
              <h2 className="text-sm font-medium text-text">Pinned Components</h2>
            </div>
            <div className="w-full border-b border-border my-2"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {pinnedComponents.map((component, index) => (
              <PinnedBoxComponents
                key={component.id}
                id={component.id}
                name={component.name}
                tags={component.tags}
                languages={component.languages}
                isSelected={component.id === selectedComponentId}
                onClick={() => handleComponentClick(component)}
              />
            ))}
          </div>
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center">
              <Folder className="text-accent mr-2" size={18} />
              <h2 className="text-sm font-medium text-text">Components</h2>
            </div>
            <div className="w-full border-b border-border my-2"></div>
          </div>
          <div className="flex items-center justify-between mb-2 text-sm text-muted">
            <div className="flex items-center w-3/12">
              <PencilLine className="mr-2" size={16} />
              <span>File Name</span>
            </div>
            <div className="flex items-center justify-center w-6/12">
              <Tag className="mr-2" size={16} />
              <span>Tags</span>
            </div>
            <div className="flex items-center w-3/12 justify-end">
              <Code className="mr-2" size={16} />
              <span>Languages</span>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            {unpinnedComponents.map((component) => (
              <ComponentBox
                key={component.id}
                id={component.id}
                name={component.name}
                tags={component.tags}
                languages={component.languages}
                isSelected={component.id === selectedComponentId}
                onClick={() => handleComponentClick(component)}
              />
            ))}
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default ComponentsContainer;
