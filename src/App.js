import React from 'react';
import TimeDisplay from './components/TimeDisplay';
import MetricsDisplay from './components/MetricsDisplay';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="left-section">
        <TimeDisplay />
      </div>
      <div className="right-section">
        <MetricsDisplay />
      </div>
    </div>
  );
}

export default App;
