import React from 'react';
import Board from 'components/Board';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { resetGame, type GameState } from 'store/gameSlice';
import GameOverModal from 'components/GameOverModal';
import {
  LOSER_MESSAGE,
  NUMBER_OF_CONSECUTIVE_SMILEYS_TO_WIN_GAME,
  WINNER_MESSAGE,
  WINS_LABEL,
  DEFEATS_LABEL,
} from 'constants/gameConfigConstants';

const GameContainer = () => {
  const losses = useSelector((state: GameState) => state.losses);
  const wins = useSelector((state: GameState) => state.wins);
  const isGameOver = useSelector((state: GameState) => state.gameOver);
  const consecutiveSmileys = useSelector(
    (state: GameState) => state.consecutiveSmileys,
  );
  const dispatch = useDispatch();

  const handleCloseGameOverModal = () => {
    dispatch(resetGame());
  };

  return (
    <div>
      <header className="game-container-header">
        <section className="score-section">
          <div className="score">
            {WINS_LABEL} {wins}
          </div>
          <div className="score">
            {DEFEATS_LABEL} {losses}
          </div>
        </section>
      </header>
      <Board />
      <GameOverModal
        isOpen={isGameOver}
        message={
          consecutiveSmileys === NUMBER_OF_CONSECUTIVE_SMILEYS_TO_WIN_GAME
            ? WINNER_MESSAGE
            : LOSER_MESSAGE
        }
        onClose={handleCloseGameOverModal}
      />
    </div>
  );
};

export default GameContainer;
