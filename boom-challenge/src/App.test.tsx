import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { initialState } from 'store/gameSlice';

test('renders title: Boom Challenge', () => {
  const mockStore = configureStore();
  const store = mockStore(initialState);
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const linkElement = screen.getByText(/Boom Challenge/i);
  expect(linkElement).toBeInTheDocument();
});
