import React, { useState } from 'react';
import { winningArrays } from '../../utils/winningArrays';
import './Board.scss';

export default function Board() {
  const [turn, setTurn] = useState('player-one');
  const [winner, setWinner] = useState('');
  const [playerOneSpots, setPlayerOneSpots] = useState([]);
  const [playerTwoSpots, setPlayerTwoSpots] = useState([]);

  const resetGame = () => {
    window.location.reload(false);
  };

  const checkWinners = () => {
    for (let i = 0; i < winningArrays.length; i++) {
      const [a, b, c, d] = winningArrays[i];

      if (
        playerOneSpots.includes(a) &&
        playerOneSpots.includes(b) &&
        playerOneSpots.includes(c) &&
        playerOneSpots.includes(d)
      ) {
        setWinner('player-one');
        alert('player one wins');
        resetGame();
        return null;
      } else if (
        playerTwoSpots.includes(a) &&
        playerTwoSpots.includes(b) &&
        playerTwoSpots.includes(c) &&
        playerTwoSpots.includes(d)
      ) {
        setWinner('player-two');
        alert('player two wins');
        resetGame();
        return null;
      }
    }
  };

  const handleOnClick = (i) => {
    if (!document.getElementById(i + 7).className.includes('last')) {
      alert(`pick the bottom`);
      return null;
    }

    if (turn === 'player-one') {
      playerOneSpots.push(i);
      setPlayerOneSpots([...playerOneSpots, i]);
      setTurn('player-two');
    }
    if (turn === 'player-two') {
      setPlayerTwoSpots([...playerTwoSpots, i]);
      setTurn('player-one');
    }

    checkWinners();
  };

  const renderTiles = () => {
    console.log('rendering!');
    const tiles = [];
    const lastRow = [42, 43, 44, 45, 46, 47, 48];

    for (let i = 0; i < 49; i++) {
      let className = 'tile';
      if (lastRow.includes(i)) className = `${className} last hidden`;

      // player moves
      if (playerOneSpots.includes(i)) className = `${className} p1 last`;
      if (playerTwoSpots.includes(i)) className = `${className} p2 last`;

      tiles.push(<div id={i} onClick={() => handleOnClick(i)} className={className} key={i}></div>);
    }

    return tiles;
  };

  return (
    <>
      <h2>Turn: {turn}</h2>
      <h2>{winner}</h2>
      <div className="Board">{renderTiles()}</div>
    </>
  );
}
