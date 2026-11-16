import React from 'react';
import { BabaChatView } from './components/Chat/BabaChatView';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#090208] text-amber-50 selection:bg-rose-950 selection:text-amber-200">
      <BabaChatView />
    </div>
  );
};

export default App;
