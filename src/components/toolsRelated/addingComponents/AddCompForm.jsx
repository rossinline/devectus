import React, { useState, useEffect } from 'react';
import { SquarePlus } from 'lucide-react';
import CreatableSelect from 'react-select/creatable';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/php/php';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/go/go';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/vue/vue';
import 'codemirror/mode/jsx/jsx';
import languageOptions from '../../../data/languageOptions';
  // Map language value to CodeMirror mode
  const getCodeMirrorMode = (langValue) => {
    switch (langValue) {
      case 'javascript':
      case 'nodejs':
      case 'react':
      case 'vuejs':
      case 'angularjs':
      case 'webpack':
      case 'babel':
      case 'gulp':
      case 'grunt':
        return 'javascript';
      case 'typescript':
        return 'text/typescript';
      case 'python':
      case 'django':
      case 'flask':
        return 'python';
      case 'java':
      case 'spring':
        return 'text/x-java';
      case 'csharp':
        return 'text/x-csharp';
      case 'cpp':
        return 'text/x-c++src';
      case 'go':
        return 'go';
      case 'ruby':
      case 'rails':
        return 'ruby';
      case 'php':
        return 'php';
      case 'html':
        return 'xml';
      case 'css':
      case 'sass':
      case 'less':
        return 'css';
      case 'shell':
        return 'shell';
      case 'mysql':
      case 'postgresql':
      case 'mongodb':
        return 'sql';
      case 'markdown':
        return 'markdown';
      case 'xml':
        return 'xml';
      default:
        return 'javascript';
    }
  };


// Manual styling for react-tag-input dark-mode
const darkModeStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#222222' : '#222222',
    borderColor: state.isFocused ? '#222222' : '#222222',
    '&:hover': {},
    padding: '1px',
    boxShadow: state.isFocused ? '0 0 0 2px #25964C' : null,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#222222' : state.isFocused ? '#313131' : '#313131',
    color: state.isSelected ? '#25964C' : '#FFFFFF',
    '&:hover': {
      backgroundColor: state.isFocused ? '#222222' : '#222222',
      color: state.isFocused ? '#25964C' : '#FFFFFF',
    },
    padding: '4px 12px',
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: '#313131',
    color: '#FFFFFF',
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    backgroundColor: '#313131',
    color: '#FFFFFF',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? '#25964C' : '#FFFFFF',
    '&:hover': {
      color: state.isFocused ? '#25964C' : '#25964C',
    },
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    color: '#FFFFFF',
    '&:hover': {
      color: state.isFocused ? '#25964C' : '#25964C',
    },
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: '#FFFFFF',
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: '#222222',
  }),
};

// Manual styling for react-tag-input light mode
const lightModeStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#CBC8C8' : '#CBC8C8',
    borderColor: state.isFocused ? '#CBC8C8' : '#CBC8C8',
    '&:hover': {},
    padding: '1px',
    boxShadow: state.isFocused ? '0 0 0 2px #25964C' : null,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#CBC8C8' : state.isFocused ? '#D9D9D9' : '#D9D9D9',
    color: state.isSelected ? '#25964C' : '#000000',
    '&:hover': {
      backgroundColor: state.isFocused ? '#CBC8C8' : '#CBC8C8',
      color: state.isFocused ? '#25964C' : '#000000',
    },
    padding: '4px 12px',
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: '#D9D9D9',
    color: '#000000',
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    backgroundColor: '#D9D9D9',
    color: '#000000',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? '#25964C' : '#000000',
    '&:hover': {
      color: state.isFocused ? '#25964C' : '#25964C',
    },
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    color: '#000000',
    '&:hover': {
      color: state.isFocused ? '#25964C' : '#25964C',
    },
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: '#000000',
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: '#CBC8C8',
  }),
};

const AddCompForm = ({ onComponentAdded }) => {
  const [components, setComponents] = useState([]);
  const [name, setName] = useState('');
  const [tags, setTags] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [codes, setCodes] = useState(['', '', '']);
  const [dark, setDark] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const maxLanguages = 3;

  // Fetch components from the backend
  const fetchComponents = async () => {
    const fetchedComponents = await window.electron.invoke('get-components');
    setComponents(fetchedComponents);
    if (onComponentAdded) {
      onComponentAdded(); // Call the callback when components are fetched
    }
  };

  // Add a new component by sending data to the backend
  const addComponent = async (event) => {
    event.preventDefault();

    if (name.trim() && tags.length && languages.length && codes.some(code => code.trim())) {
      if (languages.length > maxLanguages) {
        setErrorMessage(`You can only add up to ${maxLanguages} languages per component.`);
        return;
      }

      const component = {
        name,
        tags: tags.map(tag => tag.value),
        languages: languages.map(lang => lang.value),
        code1: codes[0],
        code2: codes[1],
        code3: codes[2],
      };

      await window.electron.invoke('insert-component', component);
      setName('');
      setTags([]);
      setLanguages([]);
      setCodes(['', '', '']);
      setErrorMessage('');
      fetchComponents(); // Refresh the list of components
    }
  };

  useEffect(() => {
    fetchComponents();
    const savedTheme = localStorage.getItem('theme') || 'light';
    setDark(savedTheme === 'dark');
  }, []);

  const selectStyles = dark ? darkModeStyles : lightModeStyles;

  return (
    <div className="p-4">
      <form onSubmit={addComponent} className="space-y-4">
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="text-sm font-semibold text-text mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Component name"
            className="p-2 rounded-default bg-foreground text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="tags" className="text-sm font-semibold text-text mb-1">Tags</label>
          <CreatableSelect
            isMulti
            name="tags"
            styles={selectStyles}
            className="basic-multi-select text-sm"
            classNamePrefix="Create Tags"
            value={tags}
            onChange={setTags}
            placeholder="Create Tags"
            noOptionsMessage={() => "Type Tag name"}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="languages" className="text-sm font-semibold text-text mb-1">Languages</label>
          <CreatableSelect
            isMulti
            closeMenuOnSelect={false}
            name="languages"
            options={languageOptions}
            styles={selectStyles}
            className="basic-multi-select text-sm"
            classNamePrefix="select"
            value={languages}
            onChange={(selectedOptions) => {
              if (selectedOptions.length <= maxLanguages) {
                setLanguages(selectedOptions);
                setErrorMessage('');
              } else {
                setErrorMessage(`You can only select up to ${maxLanguages} languages.`);
              }
            }}
            placeholder="Select or Add Languages"
          />
          {errorMessage && (
            <div className="text-sm text-red-500 mt-1">{errorMessage}</div>
          )}
        </div>
        {languages.map((lang, index) => (
          <div className="flex flex-col mb-4" key={index}>
            <label htmlFor={`code${index}`} className="text-sm font-semibold text-text mb-1">
              {`Code for ${lang.label}`}
            </label>
            <CodeMirror
              value={codes[index]}
              options={{
                mode: getCodeMirrorMode(lang.value),
                theme: dark ? 'material' : 'eclipse',
                lineNumbers: true,
                tabSize: 2,
                indentWithTabs: false,
                autofocus: false,
              }}
              onBeforeChange={(_editor, _data, value) => {
                const newCodes = [...codes];
                newCodes[index] = value;
                setCodes(newCodes);
              }}
              className="rounded-default border border-border scrollbar-thin scrollbar-thumb-muted scrollbar-track-foreground scrollbar-stable"
            />
          </div>
        ))}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 bg-foreground hover:outline hover:outline-accent text-text hover:text-accent rounded-default space-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-100 ease-in-out"
          >
            <SquarePlus className="mr-2" size={18} />
            Add Component
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCompForm;
