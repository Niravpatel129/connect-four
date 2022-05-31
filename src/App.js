import './App.scss';
import Board from './components/Board/Board';
function App() {
  const playerRed = '';
  const playerYellow = '';
  const currentPlayer = playerRed;

  const gameOver = false;

  const rows = 6;
  const columns = 7;

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
