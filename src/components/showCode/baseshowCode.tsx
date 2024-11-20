import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeDisplay: React.FC<{ code: string }> = ({ code }) => {
  return (
    <div >
      <SyntaxHighlighter 
      language="typescript" 
      style={atomOneDark}
      customStyle={{ textAlign: 'left',  fontWeight: 'bold',}}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeDisplay;
