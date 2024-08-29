import React, { useEffect } from 'react';
import './style.scss';
import {
  CLOSE_MODAL_BUTTON_TEXT,
  TIME_AFTER_MODAL_AUTOCLOSES_IN_MS,
} from 'constants/gameConfigConstants';

interface GameOverModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  message,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, TIME_AFTER_MODAL_AUTOCLOSES_IN_MS);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose} type="submit">
          {CLOSE_MODAL_BUTTON_TEXT}
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
