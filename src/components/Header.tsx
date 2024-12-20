import React from 'react';
import { Briefcase } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-indigo-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-white" />
            <span className="ml-2 text-white text-xl font-bold">InterviewAI</span>
          </div>
          <div className="flex space-x-4">
            <a href="#features" className="text-white hover:text-indigo-100">Features</a>
            <a href="#practice" className="text-white hover:text-indigo-100">Practice</a>
            <a href="#feedback" className="text-white hover:text-indigo-100">Feedback</a>
          </div>
        </div>
      </nav>
    </header>
  );
}