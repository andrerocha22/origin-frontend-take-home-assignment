import * as React from 'react';
import SavingGoal from './pages/SavingGoal';
import Header from './components/Header';

import './assets/styles/app.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <SavingGoal />
    </div>
  );
};

export default App;
