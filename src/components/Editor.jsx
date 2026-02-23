import React, { useState } from 'react';
import { Maximize2, Minimize2, Copy, Check } from 'lucide-react';
import languageToIconClassMap from './IconMapping.jsx'; // Mapping for language to icon class
import { Controlled as ControlledEditor } from 'react-codemirror2';
import AlertPopup from './AlertPopup.jsx'; // Import the AlertPopup component

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/3024-day.css';

// Import CodeMirror modes
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike'; // for Java, C++, C#
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/php/php';
import 'codemirror/mode/swift/swift';
import 'codemirror/mode/go/go';
import 'codemirror/mode/rust/rust';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/sql/sql'; // for MySQL, PostgreSQL
import 'codemirror/mode/vue/vue';
import 'codemirror/mode/jsx/jsx'; // for React
import 'codemirror/mode/markdown/markdown'; // for GitHub Markdown
import 'codemirror/mode/dockerfile/dockerfile';
import 'codemirror/mode/django/django'; // for Django
import 'codemirror/mode/nginx/nginx';
import 'codemirror/mode/htmlembedded/htmlembedded'; // for PHP embedded in HTML
// Add more

const Editor = ({ language = '', displayName, value, onChange, isCollapsed, onToggle }) => {
  const [copyState, setCopyState] = useState('copy'); // 'copy' or 'check'
  const [alertMessage, setAlertMessage] = useState(null);

  function handleChange(editor, data, value) {
    onChange(value);
  }

  // Copy code to clipboard function
  function copyToClipboard() {
    navigator.clipboard.writeText(value).then(() => {
      setCopyState('check');
      setAlertMessage('Code copied to clipboard!');
      setTimeout(() => {
        setCopyState('copy');
        setAlertMessage(null);
      }, 2000); // Reset after 2 seconds
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  // Check for available icon based on language
  const iconClass = languageToIconClassMap[language.toLowerCase()];
  
  return (
    <div className={`p-2 ${isCollapsed ? 'flex flex-col items-center h-full' : 'grow'}`}>
      <div className={`flex ${isCollapsed ? 'flex-col items-center h-full w-12 pb-10 pt-4' : 'justify-between'} items-center bg-background px-2 py-1 rounded-t-sm border-b border-foreground`}>
        {iconClass ? (
          // Display the icon if available
          <i className={`${iconClass} devicon-plain text-text group-hover:text-accent px-1 text-md`} title={language}></i>
        ) : (
          // Fallback to display nothing when icon is not available
          ""
        )}
        {/* Collapsing code-mirror editors for more space */}
        <span className={`${isCollapsed ? 'transform -rotate-90 whitespace-nowrap py-2 my-10' : ''}`}>{displayName || language}</span>
        <div className={`flex ${isCollapsed ? 'flex-col gap-4 h-full' : 'gap-2'}`}>
          <button onClick={onToggle} className='text-xs px-1 py-0.5 rounded-default'>
            {isCollapsed ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button onClick={copyToClipboard} className='text-xs px-1 py-0.5 rounded-default'>
            {copyState === 'copy' ? <Copy size={18} /> : <Check size={18} />}
          </button>
        </div>
      </div>
      {!isCollapsed && (
        <ControlledEditor
          onBeforeChange={handleChange}
          value={value}
          className='h-full scrollbar-thin scrollbar-thumb-muted scrollbar-track-foreground scrollbar-stable'
          options={{
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: '3024-day',
            lineNumbers: true,
          }}
          editorDidMount={(editor) => {
            // Apply custom styles to make the background transparent
            const style = document.createElement('style');
            style.innerHTML = `
              .CodeMirror.cm-s-3024-day {
                background-color: #D9D9D9 !important;
                border-radius: 0px 0px 4px 4px;
              }
              .CodeMirror.cm-s-3024-day:is(.dark *) {
                  background-color: #313131 !important;
                  border-radius: 0px 0px 4px 4px;
              }             
              .CodeMirror-gutters {
                background-color: #D9D9D9 !important;
                border-right: solid 2px !important;
                border-color: #CBC8C8 !important;
                padding-right: 2px !important;
              }
              .CodeMirror-gutters:is(.dark *)  {
                background-color: #313131 !important;
                border-right: solid 2px !important;
                border-color: #222222 !important;
                padding-right: 2px !important;
              }
            `;
            document.head.append(style);
          }}
        />
      )}
      {alertMessage && (
        <AlertPopup message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default Editor;
