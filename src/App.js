import './App.scss';
import Board from './components/Board/Board';
function App() {
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
