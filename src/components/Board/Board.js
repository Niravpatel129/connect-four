import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Swal from 'sweetalert2';
import { winningArrays } from '../../utils/winningArrays';
import './Board.scss';
const socket = io('https://asdasdasdkllk.herokuapp.com/');

export default function Board({ id }) {
  const [canMove, setCanMove] = useState(true);
  const [turn, setTurn] = useState('player-one');
  const [playerOneSpots, setPlayerOneSpots] = useState([]);
  const [playerTwoSpots, setPlayerTwoSpots] = useState([]);

  useEffect(() => {
    socket.emit('join', id);
  }, [id]);

  useEffect(() => {
    socket.on('turn', () => {
      console.log('turn');
      setCanMove(true);
      turn === 'player-one' ? setTurn('player-two') : setTurn('player-one');
    });

    socket.on('setTurn', (turnData) => {
      setTurn(turnData);
    });

    socket.on('playerOneMoves', (turnData) => {
      setPlayerOneSpots(turnData);
    });

    socket.on('playerTwoMoves', (turnData) => {
      setPlayerTwoSpots(turnData);
    });

    socket.on('winner', (winner) => {
      Swal.fire({
        title: `${winner === 'player-one' ? 'red' : 'blue'} wins!`,
        width: 600,
        padding: '3em',
        color: '#716add',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://c.tenor.com/xzjlrhYq_lQAAAAi/cat-nyan-cat.gif")
          left top
          no-repeat
        `,
      }).then(() => {
        socket.emit('reset');
      });
    });
  }, [turn]);

  socket.on('reset', () => {
    resetGame();
  });

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
        socket.emit('winner', 'player-one');
        return null;
      } else if (
        playerTwoSpots.includes(a) &&
        playerTwoSpots.includes(b) &&
        playerTwoSpots.includes(c) &&
        playerTwoSpots.includes(d)
      ) {
        socket.emit('winner', 'player-two');
        // resetGame();
        return null;
      }
    }
  };

  const handleOnClick = (i) => {
    if (!canMove) {
      alert('not your turn, wait for your turn');
      return null;
    }

    if (!document.getElementById(i + 7).className.includes('last')) {
      alert(`pick the bottom, gravity dosen't exist yet`);
      return null;
    }

    if (turn === 'player-one') {
      playerOneSpots.push(i);
      setPlayerOneSpots([...playerOneSpots, i]);
      setTurn('player-two');
      socket.emit('playerOneMoves', [...playerOneSpots, i]);
    }
    if (turn === 'player-two') {
      setPlayerTwoSpots([...playerTwoSpots, i]);
      console.log('🚀 playerTwoSpots', i);
      setTurn('player-one');
      socket.emit('playerTwoMoves', [...playerTwoSpots, i]);
    }

    setCanMove(false);
    socket.emit('turn');

    checkWinners();
  };

  const renderTiles = () => {
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
      <h2>Turn: {turn === 'player-one' ? '🔴' : '🔵'}</h2>
      <div className="Board">{renderTiles()}</div>
    </>
  );
}
