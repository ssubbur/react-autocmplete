import React from 'react';
import AutoComplete from './components/AutoComplete/AutoComplete';
import Table from './components/Table/Table';
import './App.css';

function App() {
  const options = ['United States','Canada','United Kingdom', 'India']
  return (
    <div className="App">
      <div className="App-Component">
      <div className="App-Component">
        <AutoComplete options={options}></AutoComplete>
        <Table></Table>
        </div>
        </div>
    </div>
  );
}

export default App;
