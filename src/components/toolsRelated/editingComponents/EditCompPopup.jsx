import React from 'react';
import ReactDOM from 'react-dom';
import { SquareX } from 'lucide-react';

const EditCompPopup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background rounded-default shadow-lg w-2/3 h-4/5 relative flex flex-col">
        {/* Title Bar */}
        <div className="shrink-0 flex items-center justify-between bg-background rounded-default p-4 border-b border-foreground rounded-t-default">
          <h2 className="text-md font-semibold text-text">Edit Component</h2>
          <button onClick={onClose} className="text-text hover:text-red-500">
            <SquareX />
          </button>
        </div>
        {/* Scrollable Content Area */}
        <div className="p-4 overflow-y-auto overflow-x-hidden grow scrollbar-thin  scrollbar-thumb-gray-400 scrollbar-track-foreground dark:scrollbar-thumb-gray-500">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EditCompPopup;
