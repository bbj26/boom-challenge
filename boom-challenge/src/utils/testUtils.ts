import {
  BOMB_ICON,
  RESETS_ICON,
  SMILEY_ICON,
} from 'constants/gameConfigConstants';
import configureStore from 'redux-mock-store';
import { type GameState } from 'store/gameSlice';

export const mockStore = configureStore<GameState>([]);

export const generateMockBoard = (): GameState['board'] => [
  ...Array(12).fill({
    value: SMILEY_ICON,
    revealed: false,
  }),
  ...Array(12).fill({
    value: BOMB_ICON,
    revealed: false,
  }),
  ...Array(12).fill({
    value: RESETS_ICON,
    revealed: false,
  }),
];

export const createInitialState = (): GameState => ({
  board: generateMockBoard(),
  losses: 4,
  wins: 3,
  gameOver: false,
  consecutiveBombs: 0,
  consecutiveSmileys: 0,
});

export const setupStore = () => mockStore(createInitialState());
