import React from 'react';
import './style.scss';

interface TileProps {
  value: string;
  revealed: boolean;
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ value, onClick, revealed }) => {
  return (
    <div className="tile" onClick={onClick}>
      {revealed ? value : ''}
    </div>
  );
};

export default Tile;
