import CodeDisplay from "./baseshowCode";

const ShowCode: React.FC = () => {
    const myCode = `
import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeDisplay: React.FC<{ code: string }> = ({ code }) => {
  return (
    <div className="relative bg-gray-100 p-4 rounded-lg shadow-lg">
      <SyntaxHighlighter language="typescript" style={docco}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeDisplay;
    `;
  
    return (
      <div style={{position: 'absolute', width: '40rem', height: '50rem', zIndex: 8, top: 0, left: 0}}>
        <CodeDisplay code={myCode} />
      </div>
    );
  };
  
  export default ShowCode;