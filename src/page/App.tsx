import React from 'react';
import './App.css';

export function add(addNum1: number, addNum2: number): number {
  return addNum1 + addNum2;
}

function App() {
  return (
    <div>
      <h1 className='border border-gray-400 rounded-xl'>
        Hello Tailwind CSS!
      </h1>
      <p>Tailwind CSSです</p>
      <button>ボタン</button>
    </div>
  );
}

export default App;
