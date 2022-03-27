import React from 'react';
import './App.css';
import MdText from './components/MdText';
import Nav from './components/Nav';

const App = () => {
  return (
    <div className="App vh-100">
      <Nav />
      <MdText />
    </div>
  );
};

export default App;
