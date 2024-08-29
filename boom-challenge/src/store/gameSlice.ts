import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  BOMB_ICON,
  NUMBER_OF_CONSECUTIVE_BOMBS_TO_LOSE_GAME,
  NUMBER_OF_CONSECUTIVE_SMILEYS_TO_WIN_GAME,
  RESETS_ICON,
  SMILEY_ICON,
} from 'constants/gameConfigConstants';

export interface Tile {
  value: string;
  revealed: boolean;
}

export interface GameState {
  board: Tile[];
  consecutiveSmileys: number;
  consecutiveBombs: number;
  gameOver: boolean;
  wins: number;
  losses: number;
}

export const initialState: GameState = {
  board: [],
  consecutiveSmileys: 0,
  consecutiveBombs: 0,
  gameOver: false,
  wins: 0,
  losses: 0,
};

const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateBoard = (): Tile[] => {
  const tiles = [
    ...Array(12).fill('😃'),
    ...Array(12).fill('💥'),
    ...Array(12).fill('🌀'),
  ];
  const shuffledTiles = shuffleArray(tiles);
  return shuffledTiles.map((tile) => ({ value: tile, revealed: false }));
};

const gameSlice = createSlice({
  name: 'game',
  initialState: { ...initialState, board: generateBoard() },
  reducers: {
    flipTile(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      const tile = state.board[index];

      if (state.gameOver || tile.revealed) return;

      tile.revealed = true;
      if (tile.value === SMILEY_ICON) {
        state.consecutiveSmileys += 1;
        state.consecutiveBombs = 0;
      } else if (tile.value === BOMB_ICON) {
        state.consecutiveBombs += 1;
        state.consecutiveSmileys = 0;
      } else if (tile.value === RESETS_ICON) {
        state.consecutiveSmileys = 0;
        state.consecutiveBombs = 0;
      }

      if (
        state.consecutiveSmileys === NUMBER_OF_CONSECUTIVE_SMILEYS_TO_WIN_GAME
      ) {
        state.wins += 1;
        state.gameOver = true;
      } else if (
        state.consecutiveBombs === NUMBER_OF_CONSECUTIVE_BOMBS_TO_LOSE_GAME
      ) {
        state.losses += 1;
        state.gameOver = true;
      }
    },
    resetGame(state) {
      state.board = generateBoard();
      state.consecutiveSmileys = 0;
      state.consecutiveBombs = 0;
      state.gameOver = false;
    },
  },
});

export const { flipTile, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
