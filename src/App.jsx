import React from 'react';
import './App.css';
import BeerList from './BeerList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='punkhead text-center m-6 text-white text-4xl font-bold'>Punk API Beers</h1>
      </header>
      <main>
        <BeerList />
      </main>
    </div>
  );
}

export default App;