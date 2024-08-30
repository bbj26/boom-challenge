import { generateMockBoard } from 'utils/testUtils';
import gameReducer, {
  flipTile,
  resetGame,
  initialState,
  type GameState,
} from '../store/gameSlice';
import {
  NUMBER_OF_CONSECUTIVE_SMILEYS_TO_WIN_GAME,
  NUMBER_OF_CONSECUTIVE_BOMBS_TO_LOSE_GAME,
} from 'constants/gameConfigConstants';

describe('gameSlice', () => {
  let state: GameState;

  beforeEach(() => {
    state = { ...initialState, board: generateMockBoard() };
  });

  it('should declare a win when enough smiley icons are revealed', () => {
    state.consecutiveSmileys = NUMBER_OF_CONSECUTIVE_SMILEYS_TO_WIN_GAME - 1;

    const SMILEY_TILE_INDEX = 0;
    const nextState = gameReducer(
      state,
      flipTile({ index: SMILEY_TILE_INDEX }),
    );

    expect(nextState.consecutiveSmileys).toBe(
      NUMBER_OF_CONSECUTIVE_SMILEYS_TO_WIN_GAME,
    );
    expect(nextState.wins).toBe(1);
    expect(nextState.gameOver).toBe(true);
  });

  it('should declare a game over (loss) when enough bomb icons are revealed', () => {
    state.consecutiveBombs = NUMBER_OF_CONSECUTIVE_BOMBS_TO_LOSE_GAME - 1;

    const BOMB_TILE_INDEX = 15;
    const nextState = gameReducer(state, flipTile({ index: BOMB_TILE_INDEX }));

    expect(nextState.consecutiveBombs).toBe(
      NUMBER_OF_CONSECUTIVE_BOMBS_TO_LOSE_GAME,
    );
    expect(nextState.losses).toBe(1);
    expect(nextState.gameOver).toBe(true);
  });

  it('should not flip a tile if the game is already over', () => {
    state.gameOver = true;

    const nextState = gameReducer(state, flipTile({ index: 0 }));

    expect(nextState.board[0].revealed).toBe(false);
    expect(nextState.wins).toBe(0);
    expect(nextState.losses).toBe(0);
  });

  it('should reset the game correctly', () => {
    state.consecutiveSmileys = 2;
    state.consecutiveBombs = 2;
    state.gameOver = true;
    state.wins = 1;
    state.losses = 1;

    const nextState = gameReducer(state, resetGame());

    expect(nextState.consecutiveSmileys).toBe(0);
    expect(nextState.consecutiveBombs).toBe(0);
    expect(nextState.gameOver).toBe(false);
    expect(nextState.board).not.toEqual(state.board);

    // wins and losses should persist
    expect(nextState.wins).toBe(1);
    expect(nextState.losses).toBe(1);
  });
});
