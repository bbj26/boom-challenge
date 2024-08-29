import GameContainer from 'components/GameContainer';
import { TITLE } from 'constants/gameConfigConstants';
import React from 'react';

const App: React.FC = () => {
  return (
    <div>
      <h1>{TITLE}</h1>
      <GameContainer />
    </div>
  );
};

export default App;
