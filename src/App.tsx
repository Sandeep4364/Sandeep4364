import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { InterviewSimulator } from './components/InterviewSimulator';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <InterviewSimulator />
    </div>
  );
}

export default App;