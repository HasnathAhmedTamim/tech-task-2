import React from 'react';
import Hero from './components/Hero';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Hero />
      <Contact />
    </div>
  );
}

export default App;
