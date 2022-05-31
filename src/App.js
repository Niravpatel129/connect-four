import { io } from 'socket.io-client';
import './App.scss';
import Board from './components/Board/Board';

function App() {
  const socket = io('localhost:4000');

  socket.io.on('connection', (attempt) => {
    console.log('connected');
    // ...
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Connect Four</h1>
      </header>
      <main>
        <div className="Board-Container">
          <Board />
        </div>
      </main>
    </div>
  );
}

export default App;
