import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import GameOverModal from 'components/GameOverModal';

describe('Game Container component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render modal with correct message when isOpen is true', () => {
    render(
      <GameOverModal isOpen={true} message="You lost!" onClose={mockOnClose} />,
    );

    const modalMessage = screen.getByText('You lost!');
    expect(modalMessage).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /PLAY AGAIN/i });
    expect(closeButton).toBeInTheDocument();
  });

  it('should close the modal after 5 seconds automatically', async () => {
    jest.useFakeTimers();

    render(
      <GameOverModal isOpen={true} message="You Lost!" onClose={mockOnClose} />,
    );

    expect(screen.getByText('You Lost!')).toBeInTheDocument();

    jest.advanceTimersByTime(5000);

    expect(mockOnClose).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  test('should call onClose when the close button is clicked', () => {
    render(
      <GameOverModal isOpen={true} message="You lost!" onClose={mockOnClose} />,
    );

    const closeButton = screen.getByRole('button', { name: /PLAY AGAIN/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
