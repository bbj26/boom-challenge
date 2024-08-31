import React from 'react';
import {
  BOMB_ICON,
  RESETS_ICON,
  SMILEY_ICON,
} from 'constants/gameConfigConstants';
import { type GameState, flipTile, resetGame } from 'store/gameSlice';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import GameContainer from 'components/GameContainer';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import { createInitialState, setupStore } from 'utils/testUtils';

const mockStore = configureStore<GameState>([]);

describe('Game Container component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = setupStore();
  });

  test('should render the game board with the correct number of tiles', () => {
    render(
      <Provider store={store}>
        <GameContainer />
      </Provider>,
    );

    const boardElement = screen.getByTestId('board');
    expect(boardElement).toBeInTheDocument();

    const tiles = boardElement.querySelectorAll('div');
    expect(tiles).toHaveLength(36);
  });

  test('should properly render tiles"', () => {
    const customState: GameState = {
      ...createInitialState(),
      board: [
        { revealed: true, value: SMILEY_ICON },
        { revealed: true, value: SMILEY_ICON },
        { revealed: false, value: BOMB_ICON },
        { revealed: true, value: BOMB_ICON },
        { revealed: false, value: RESETS_ICON },
        { revealed: true, value: RESETS_ICON },
        { revealed: false, value: SMILEY_ICON },
        { revealed: false, value: SMILEY_ICON },
      ],
    };

    const customStore = mockStore(customState);

    render(
      <Provider store={customStore}>
        <GameContainer />
      </Provider>,
    );

    const boardElement = screen.getByTestId('board');
    const tiles = boardElement.querySelectorAll('div');

    const smileys = screen.getAllByText(SMILEY_ICON);
    expect(smileys).toHaveLength(2);

    const bombs = screen.getAllByText(BOMB_ICON);
    expect(bombs).toHaveLength(1);

    const resets = screen.getAllByText(RESETS_ICON);
    expect(resets).toHaveLength(1);

    expect(tiles[7]).toHaveTextContent('');
  });

  test('should dispatch flipTile action on tile click', () => {
    render(
      <Provider store={store}>
        <GameContainer />
      </Provider>,
    );

    const boardElement = screen.getByTestId('board');
    const tiles = boardElement.querySelectorAll('div');
    fireEvent.click(tiles[0]);

    const actions = store.getActions();
    expect(actions).toContainEqual(flipTile({ index: 0 }));
  });

  test('should dispatch resetGame action on reset button click', () => {
    render(
      <Provider store={store}>
        <GameContainer />
      </Provider>,
    );

    const resetButton = screen.getByText('RESET');
    fireEvent.click(resetButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(resetGame());
  });

  test('should display the correct total score in the header', async () => {
    render(
      <Provider store={store}>
        <GameContainer />
      </Provider>,
    );

    const headingElement = await screen.findByRole('banner');

    expect(headingElement).toHaveTextContent('WINS: 3');
    expect(headingElement).toHaveTextContent('DEFEATS: 4');
  });
});
