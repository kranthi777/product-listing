import React from 'react';
import Products from './components/Products';
import TopArrow from './components/TopArrow.js';

const App = () => {
  return (
    <div className="container">
      <TopArrow />
      <Products/>
    </div>
  );
}

export default App;
