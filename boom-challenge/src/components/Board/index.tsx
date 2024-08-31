import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { flipTile, resetGame, type GameState } from 'store/gameSlice';
import Tile from 'components/Tile';
import './style.scss';

const Board: React.FC = () => {
  const board = useSelector((state: GameState) => state.board);
  const dispatch = useDispatch();

  const handleTileClick = (index: number) => {
    dispatch(flipTile({ index }));
  };

  const handleReset = () => {
    dispatch(resetGame());
  };

  return (
    <main>
      <div className="board" data-testid="board">
        {board.map((tile, index) => (
          <Tile
            key={index}
            onClick={() => {
              handleTileClick(index);
            }}
            revealed={tile.revealed}
            value={tile.value}
          />
        ))}
      </div>
      <button className="reset-button" onClick={handleReset} type="submit">
        RESET
      </button>
    </main>
  );
};

export default Board;
