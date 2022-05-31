import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

export default function Home() {
  const min = 1;
  const max = 100;
  const rand = Math.round(min + Math.random() * (max - min));

  return (
    <div className="home">
      <h1>Home</h1>
      <Link to={`/room/${rand}`}>
        <button>Play Game</button>
      </Link>
    </div>
  );
}
