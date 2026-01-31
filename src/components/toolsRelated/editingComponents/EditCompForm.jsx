import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import CreatableSelect from 'react-select/creatable';

const languageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'php', label: 'PHP' },
  { value: 'swift', label: 'Swift' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'scala', label: 'Scala' },
  { value: 'perl', label: 'Perl' },
  { value: 'shell', label: 'Shell' },
  { value: 'docker', label: 'Docker' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'angularjs', label: 'AngularJS' },
  { value: 'react', label: 'React' },
  { value: 'vuejs', label: 'Vue.js' },
  { value: 'laravel', label: 'Laravel' },
  { value: 'django', label: 'Django' },
  { value: 'flask', label: 'Flask' },
  { value: 'spring', label: 'Spring' },
  { value: 'express', label: 'Express' },
  { value: 'rails', label: 'Rails' },
  { value: 'sass', label: 'Sass' },
  { value: 'less', label: 'Less' },
  { value: 'webpack', label: 'Webpack' },
  { value: 'babel', label: 'Babel' },
  { value: 'gulp', label: 'Gulp' },
  { value: 'grunt', label: 'Grunt' },
  { value: 'jenkins', label: 'Jenkins' },
  { value: 'git', label: 'Git' },
  { value: 'github', label: 'GitHub' },
  { value: 'gitlab', label: 'GitLab' },
  { value: 'vscode', label: 'Visual Studio Code' },
  { value: 'intellij', label: 'IntelliJ IDEA' },
  { value: 'atom', label: 'Atom' },
  { value: 'sublime', label: 'Sublime Text' },
  { value: 'emacs', label: 'Emacs' },
  { value: 'vim', label: 'Vim' },
  { value: 'linux', label: 'Linux' },
  { value: 'ubuntu', label: 'Ubuntu' },
  { value: 'windows', label: 'Windows' },
  { value: 'apple', label: 'Apple' },
  { value: 'android', label: 'Android' },
  { value: 'raspberry_pi', label: 'Raspberry Pi' },
  { value: 'aws', label: 'AWS' },
  { value: 'heroku', label: 'Heroku' },
  { value: 'nginx', label: 'Nginx' },
  { value: 'apache', label: 'Apache' },
  //Add more
];

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

  const languageLabels = languages.map(lang => lang.label);

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-text mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Component name"
            className="py-1 px-2 rounded-default bg-foreground text-text focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-text mb-1">Tags</label>
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
          <label className="text-sm font-medium text-text mb-1">Languages</label>
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
          <label className="text-sm font-medium text-text mb-1">Code</label>
          {languages.length > 0 && (
            <>
              {languages[0] && (
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-medium text-text mb-1">{languages[0].label}</label>
                  <textarea
                    value={code1}
                    onChange={(e) => setCode1(e.target.value)}
                    placeholder={`Enter code for ${languages[0].label}`}
                    className="py-1 px-2 rounded-default bg-foreground text-text focus:outline-none focus:ring-2 focus:ring-accent"
                    rows={7}
                  />
                </div>
              )}
              {languages.length > 1 && (
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-medium text-text mb-1">{languages[1].label}</label>
                  <textarea
                    value={code2}
                    onChange={(e) => setCode2(e.target.value)}
                    placeholder={`Enter code for ${languages[1].label}`}
                    className="py-1 px-2 rounded-default bg-foreground text-text focus:outline-none focus:ring-2 focus:ring-accent"
                    rows={7}
                  />
                </div>
              )}
              {languages.length > 2 && (
                <div className="flex flex-col mb-4">
                  <label className="text-sm font-medium text-text mb-1">{languages[2].label}</label>
                  <textarea
                    value={code3}
                    onChange={(e) => setCode3(e.target.value)}
                    placeholder={`Enter code for ${languages[2].label}`}
                    className="py-1 px-2 rounded-default bg-foreground text-text focus:outline-none focus:ring-2 focus:ring-accent"
                    rows={7}
                  />
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-foreground hover:outline hover:outline-accent text-text hover:text-accent rounded-default space-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-100 ease-in-out"
          >
            <Pencil className="mr-2" size={18} />
            <span>Update Component</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCompForm;


