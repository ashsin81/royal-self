import React from 'react';
import { BabaBookView } from './components/Book/BabaBookView';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0d0910] text-amber-50 selection:bg-rose-950 selection:text-amber-200">
      <BabaBookView />
    </div>
  );
};

export default App;
