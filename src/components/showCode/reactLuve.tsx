// import React from 'react';
// import { LiveProvider, LiveEditor, LiveError, LivePreview,LiveContext } from 'react-live';
// import ResiumMap from '../resium'; // ייבוא הקומפוננטה
// import Draggable from 'react-draggable';

// const customTheme = {
//   plain: {
//     color: '#d6deeb',
//     backgroundColor: '#2d2d2d',
//   },
//   styles: [
//     {
//       types: ['comment', 'prolog', 'doctype', 'cdata'],
//       style: {
//         color: 'rgb(99, 119, 119)',
//         fontStyle: 'italic',
//       },
//     },
//     {
//       types: ['punctuation'],
//       style: {
//         color: 'rgb(199, 146, 234)',
//       },
//     },
//     {
//       types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol', 'deleted'],
//       style: {
//         color: 'rgb(247, 140, 108)',
//       },
//     },
//     {
//       types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
//       style: {
//         color: 'rgb(173, 219, 103)',
//       },
//     },
//     {
//       types: ['operator', 'entity', 'url', 'string', 'variable', 'language-css'],
//       style: {
//         color: 'rgb(214, 222, 235)',
//       },
//     },
//     {
//       types: ['atrule', 'attr-value', 'keyword'],
//       style: {
//         color: 'rgb(255, 203, 139)',
//       },
//     },
//     {
//       types: ['function', 'class-name'],
//       style: {
//         color: 'rgb(130, 170, 255)',
//       },
//     },
//     {
//       types: ['regex', 'important'],
//       style: {
//         color: 'rgb(214, 222, 235)',
//       },
//     },
//     {
//       types: ['bold'],
//       style: {
//         fontWeight: 'bold',
//       },
//     },
//     {
//       types: ['italic'],
//       style: {
//         fontStyle: 'italic',
//       },
//     },
//   ],
// };

// const scope = {
//   React,
//   useState: React.useState,
//   ResiumMap, // הוספת הקומפוננטה ל-scope
// };

// const code = `
// () => {
//   const [color, setColor] = useState('#ff0000');
//   const [text, setText] = useState('Hello, World!');

//   return (
//     <div>
//       <ResiumMap />
//       <input 
//         type="text" 
//         value={text} 
//         onChange={(e) => setText(e.target.value)} 
//       />
//       <input 
//         type="color" 
//         value={color} 
//         onChange={(e) => setColor(e.target.value)} 
//       />
//       <div style={{ color }}>{text}</div>
//     </div>
//   );
// }
// `;

// const LiveComponentDemo: React.FC = () => (
//     <div style={{direction: 'rtl'}}>
//   <LiveProvider code={code} scope={scope} theme={customTheme}>
//     <div style={{ display: 'flex', gap: '20px', textAlign: 'left',  fontWeight: 'bold', }}>
//       <div>
//         <h3>Live Preview</h3>
//         <LivePreview />
//         <LiveError />
//       </div>
//       <Draggable>
//       <div style={{position: 'absolute', top:0 , left:0, direction: 'ltr'}}>
  
//         <h3>Edit Code</h3>
//         <LiveEditor  />
//       </div>
// </Draggable>
//     </div>
//   </LiveProvider>
//     </div>
// );

// export default LiveComponentDemo;

