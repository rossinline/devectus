import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
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


const EditCompForm = ({ component, onClose }) => {
  const [name, setName] = useState('');
  const [tags, setTags] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [code3, setCode3] = useState('');
  const [dark, setDark] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setDark(savedTheme === 'dark');
  }, []);

  useEffect(() => {
    if (component) {
      setName(component.name);
      setTags(component.tags.map(tag => ({ value: tag, label: tag })));
      setLanguages(component.languages.map(lang => ({ value: lang, label: lang })));
      setCode1(component.code1 || '');
      setCode2(component.code2 || '');
      setCode3(component.code3 || '');
    }
  }, [component]);

  // Maximum amount of languages
  const maxLanguages = 3;

  
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

// Manual styling for react-tag-input light-mode
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

  //Check light/dark theme
  const selectStyles = dark ? darkModeStyles : lightModeStyles;

  //Editing language
  const handleLanguageChange = (selectedOptions) => {
    if (selectedOptions.length <= maxLanguages) {
      setLanguages(selectedOptions);
      setErrorMessage('');
    } else {
      setErrorMessage(`You can only select up to ${maxLanguages} languages.`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 3 coding fields for 3 max languages
    let updatedCode1 = code1;
    let updatedCode2 = code2;
    let updatedCode3 = code3;

    // Adjust code fields based on the number of languages selected
    if (languages.length === 1) {
      updatedCode2 = '';
      updatedCode3 = '';
    } else if (languages.length === 2) {
      updatedCode3 = '';
    }

    // Prep for update of table
    const updatedComponent = {
      ...component,
      name,
      tags: tags.map(tag => tag.value),
      languages: languages.map(lang => lang.value),
      code1: updatedCode1,
      code2: updatedCode2,
      code3: updatedCode3,
    };

    await window.electron.invoke('update-component', updatedComponent);
    onClose();
  };


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

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col mb-4">
          <label className="text-sm font-semibold text-text mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Component name"
            className="p-2 rounded-default bg-foreground text-text text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-semibold text-text mb-1">Tags</label>
          <CreatableSelect
            isMulti
            styles={selectStyles}
            value={tags}
            onChange={setTags}
            placeholder="Create Tags"
            noOptionsMessage={() => "Type Tag name"}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-semibold text-text mb-1">Languages</label>
          <CreatableSelect
            isMulti
            closeMenuOnSelect={false}
            options={languageOptions}
            styles={selectStyles}
            value={languages}
            onChange={handleLanguageChange}
            placeholder="Select or Add Languages"
          />
          {errorMessage && <div className="text-red-500 text-sm mt-1">{errorMessage}</div>}
        </div>
        <div className="flex flex-col mb-4">
          {/* 3 possible code inputs depending on language count of component*/}
          <label className="text-sm font-semibold text-text mb-1">Code</label>
          {languages.length > 0 && (
            <>
              {languages[0] && (
                <div className="flex flex-col mb-4">
                  <label className="text-sm text-text mb-1">{languages[0].label}</label>
                  <CodeMirror
                    value={code1}
                    options={{
                      mode: getCodeMirrorMode(languages[0].value),
                      theme: dark ? 'material' : 'eclipse',
                      lineNumbers: true,
                      tabSize: 2,
                      indentWithTabs: false,
                      autofocus: false,
                    }}
                    onBeforeChange={(_editor, _data, value) => setCode1(value)}
                    className="rounded-default border border-border scrollbar-thin scrollbar-thumb-muted scrollbar-track-foreground scrollbar-stable"
                  />
                </div>
              )}
              {languages.length > 1 && (
                <div className="flex flex-col mb-4">
                  <label className="text-sm text-text mb-1">{languages[1].label}</label>
                  <CodeMirror
                    value={code2}
                    options={{
                      mode: getCodeMirrorMode(languages[1].value),
                      theme: dark ? 'material' : 'eclipse',
                      lineNumbers: true,
                      tabSize: 2,
                      indentWithTabs: false,
                      autofocus: false,
                    }}
                    onBeforeChange={(_editor, _data, value) => setCode2(value)}
                    className="rounded-default border border-border scrollbar-thin scrollbar-thumb-muted scrollbar-track-foreground scrollbar-stable"
                  />
                </div>
              )}
              {languages.length > 2 && (
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-semibold text-text mb-1">{languages[2].label}</label>
                  <CodeMirror
                    value={code3}
                    options={{
                      mode: getCodeMirrorMode(languages[2].value),
                      theme: dark ? 'material' : 'eclipse',
                      lineNumbers: true,
                      tabSize: 2,
                      indentWithTabs: false,
                      autofocus: false,
                    }}
                    onBeforeChange={(_editor, _data, value) => setCode3(value)}
                    className="rounded-default border border-border scrollbar-thin scrollbar-thumb-muted scrollbar-track-foreground scrollbar-stable"
                  />
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-foreground hover:outline hover:outline-accent text-text hover:text-accent rounded-default space-x-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-100 ease-in-out"
          >
            <Pencil className="mr-2" size={18} />
            Update Component
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCompForm;


