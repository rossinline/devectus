import React, { useState, useEffect } from 'react';
import { Sticker, Code, Fullscreen } from 'lucide-react';
import languageToIconClassMap from './IconMapping.jsx';
import Editor from './Editor.jsx';
import LogoStamp from './LogoStamp.jsx';

const languageModeMap = {
  javascript: 'javascript',
  python: 'python',
  java: 'text/x-java',
  html: 'html',
  css: 'css',
  ruby: 'ruby',
  php: 'php',
  swift: 'swift',
  csharp: 'text/x-csharp',
  cpp: 'text/x-c++src',
  go: 'go',
  rust: 'rust',
  typescript: 'text/typescript',
  kotlin: 'text/x-kotlin',
  scala: 'text/x-scala',
  perl: 'perl',
  shell: 'shell',
  docker: 'dockerfile',
  mysql: 'text/x-mysql',
  postgresql: 'text/x-pgsql',
  mongodb: 'text/x-mongodb',
  nodejs: 'javascript',
  angularjs: 'javascript',
  react: 'jsx',
  vuejs: 'vue',
  laravel: 'php',
  django: 'django',
  flask: 'python',
  spring: 'text/x-java',
  express: 'javascript',
  rails: 'ruby',
  sass: 'sass',
  less: 'less',
  webpack: 'javascript',
  babel: 'javascript',
  gulp: 'javascript',
  grunt: 'javascript',
  jenkins: 'groovy',
  git: 'text/x-sh',
  github: 'markdown',
  gitlab: 'markdown',
  vscode: 'javascript',
  intellij: 'text/x-java',
  atom: 'javascript',
  sublime: 'javascript',
  emacs: 'lisp',
  vim: 'vim',
  linux: 'text/x-sh',
  ubuntu: 'text/x-sh',
  windows: 'text/x-sh',
  apple: 'text/x-sh',
  android: 'text/x-java',
  raspberry_pi: 'text/x-sh',
  aws: 'text/x-sh',
  heroku: 'text/x-sh',
  nginx: 'nginx',
  apache: 'xml'
};

// Set code areas
const CodeSpaceContainer = ({ component }) => {
  const [code, setCode] = useState({
    code1: '',
    code2: '',
    code3: ''
  });
  const [srcDoc, setSrcDoc] = useState('');
  const [isResultsVisible, setIsResultsVisible] = useState(true);
  const [collapsedEditors, setCollapsedEditors] = useState({});

  useEffect(() => {
    if (!component) return;

    const codeMapping = {
      [component.languages[0]?.toLowerCase()]: component.code1 || '',
      [component.languages[1]?.toLowerCase()]: component.code2 || '',
      [component.languages[2]?.toLowerCase()]: component.code3 || ''
    };

    setCode(codeMapping);
  }, [component]);

  // HTML, CSS, JavaScript Conversion Output
  useEffect(() => {
    const timeout = setTimeout(() => {
      const newSrcDoc = `
      <html>
        <body>${code.html || ''}</body>
        <style>${code.css || ''}</style>
        <script>${code.javascript || ''}</script>
      </html>`;

      setSrcDoc(newSrcDoc);

      setIsResultsVisible(!!(code.html || code.css || code.javascript));

    }, 250);
    return () => clearTimeout(timeout);
  }, [code]);

  const handleCodeChange = (language, value) => {
    setCode(prevCode => ({
      ...prevCode,
      [language]: value
    }));
  };

  const toggleCollapse = (language) => {
    setCollapsedEditors(prev => ({
      ...prev,
      [language]: !prev[language]
    }));
  };

  if (!component || !component.languages) {
    return (
      <div className="flex h-full">
        <div className="w-3/12 bg-foreground rounded-default p-2 shadow-inner mr-2">
          <div className='flex justify-center items-center w-full h-full'>
            <LogoStamp width={300} height={150}/>
          </div>
        </div>
        <div className="w-9/12 bg-foreground flex flex-col rounded-default h-full shadow-inner">
          <div className="flex-1 border-b border-background rounded-t-default p-2">
            <div className='flex justify-center items-center w-full h-full text-accent/80'>
              <Fullscreen size={70} />
            </div>
          </div>
          <div className="flex-1 rounded-b-default p-2">
            <div className='flex justify-center items-center w-full h-full text-accent/80'>
              <Code size={70} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Icon mapping setup
  const allIconsAvailable = component.languages.every(language => languageToIconClassMap[language.toLowerCase()]);

  return (
    <div className="flex h-full">
      <div className="w-3/12 bg-foreground rounded-default p-2 shadow-inner mr-2">
        <div className="text-left text-lg font-medium bg-background rounded-default p-2 shadow-lg">
          {/* Component details area */}
          <h2 className='px-2 text-sm font-medium'>Component Details</h2>
        </div>
        <h3 className='p-2 text-sm font-medium'>File name -</h3>
        <p className="px-2 text-xs">{component.name}</p>
        <h3 className='p-2 text-sm font-medium'>Tags -</h3>
        <div className="flex flex-wrap justify-start gap-2">
          {component.tags.map((tag, index) => (
            <button key={index} className="text-xs font-medium bg-background ml-2 px-2 py-1 rounded-default shadow-lg hover:outline hover:outline-accent text-text space-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-100 ease-in-out">
              {tag}
            </button>
          ))}
        </div>
        <h3 className='p-2 text-sm font-medium'>Languages -</h3>
        <div className="flex flex-wrap gap-2">
          {component.languages.map((language, index) => (
            <div key={index} className="flex items-center justify-center bg-background text-xs font-medium ml-2 px-2 py-1 rounded-default shadow-lg hover:outline hover:outline-accent text-text space-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-100 ease-in-out">
              <span>{language}</span>
              {allIconsAvailable && languageToIconClassMap[language.toLowerCase()] && (
                <i className={`${languageToIconClassMap[language.toLowerCase()]} devicon-plain text-text text-md ml-2`} title={language}></i>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-9/12 bg-foreground flex flex-col rounded-default h-full shadow-inner">
      {/* Component Output area (Only appears if output is available) */}
        <div className={`flex-1 border-b border-background rounded-t-default p-2 ${isResultsVisible ? '' : 'hidden'}`}>
          <div className="text-left text-lg font-medium bg-background rounded-default p-2 shadow-lg">
            <h2 className='px-2 text-sm font-medium'>Results / Output for {component.name}</h2>
          </div>
          <div className="h-full">
            {/* Output Iframe*/}
            <iframe
              srcDoc={srcDoc}
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          </div>
        </div>
        {!isResultsVisible && (
          <div className='py-2 border-b border-background'>
            <div className="text-left text-lg font-medium bg-background rounded-default p-2 mx-2 shadow-lg">
              <h2 className='px-2 text-sm font-medium'>No available output for {component.name}</h2>
            </div>
          </div>
        )}

        <div className="flex-1 rounded-b-default p-2 h-full">
          <div className='flex gap-2 w-full'>
            {/* Component code area (containing all code inputted for the selected component) */}
            <div className="grow text-left text-lg font-medium bg-background rounded-default p-2 shadow-lg">
              <h2 className='px-2 text-sm font-medium'>Code for {component.name}</h2>
            </div>
            <div className="shrink-0 w-auto flex items-center justify-center bg-background rounded-default p-2 shadow-lg">
              <div className="flex items-center">
                <span className='text-sm font-medium px-1'>Languages - </span>
                {allIconsAvailable ? (
                  component.languages.map((language, index) => {
                    const iconClass = languageToIconClassMap[language.toLowerCase()];
                    return iconClass ? (
                      <i key={index} className={`${iconClass} devicon-plain text-text group-hover:text-accent px-1 text-md`} title={language}></i>
                    ) : null;
                  })
                ) : (
                  <span className="text-xs truncate">{component.languages.join(', ')}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex overflow-hidden h-full pt-2">
            {/* Code Mirror Editor */}
            {component.languages.map((language, index,) => (
              <Editor
                key={index}
                language={languageModeMap[language.toLowerCase()]}
                displayName={language}
                value={code[language.toLowerCase()] || ''}
                onChange={(value) => handleCodeChange(language.toLowerCase(), value)}
                isCollapsed={collapsedEditors[language.toLowerCase()]}
                onToggle={() => toggleCollapse(language.toLowerCase())}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSpaceContainer;
