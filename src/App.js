import React from 'react';
import logo from './logo.svg';
import './App.css';
import BarExample from './example/bar';
import PieExample from './example/pie';
import TreeMapExample from './example/treemap';
import LineExample from './example/line';
import { fdatasyncSync } from 'fs';

function App() {
  return (
    <div className="App">
      <BarExample/>
      <PieExample/>
      <TreeMapExample/>
      <LineExample/>
    </div>
  );
}

export default App;
