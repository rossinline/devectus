import React, { useState, useEffect } from 'react';
import { SquarePlus } from 'lucide-react';
import CreatableSelect from 'react-select/creatable';

// Language Options Map
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
  // Add more
];

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
          <label htmlFor="name" className="text-sm font-medium text-text mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Component name"
            className="py-1 px-2 rounded-default bg-foreground text-text focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="tags" className="text-sm font-medium text-text mb-1">Tags</label>
          <CreatableSelect
            isMulti
            name="tags"
            styles={selectStyles}
            className="basic-multi-select"
            classNamePrefix="Create Tags"
            value={tags}
            onChange={setTags}
            placeholder="Create Tags"
            noOptionsMessage={() => "Type Tag name"}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="languages" className="text-sm font-medium text-text mb-1">Languages</label>
          <CreatableSelect
            isMulti
            closeMenuOnSelect={false}
            name="languages"
            options={languageOptions}
            styles={selectStyles}
            className="basic-multi-select"
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
            <label htmlFor={`code${index}`} className="text-sm font-medium text-text mb-1">
              {`Code for ${lang.label}`}
            </label>
            <textarea
              id={`code${index}`}
              value={codes[index]}
              onChange={(e) => {
                const newCodes = [...codes];
                newCodes[index] = e.target.value;
                setCodes(newCodes);
              }}
              placeholder={`Enter code for ${lang.label}`}
              className="py-1 px-2 rounded-default bg-foreground text-text focus:outline-none focus:ring-2 focus:ring-accent"
              rows={7}
            />
          </div>
        ))}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-foreground hover:outline hover:outline-accent text-text hover:text-accent rounded-default space-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-100 ease-in-out"
          >
            <SquarePlus className="mr-2" size={18} />
            <span>Add Component</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCompForm;
