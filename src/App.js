import { useParams } from 'react-router-dom';
import './App.scss';
import Board from './components/Board/Board';

function App() {
  const { id } = useParams();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Connect Four</h1>
      </header>
      <main>
        <div className="Board-Container">
          <Board id={id} />
        </div>
      </main>
    </div>
  );
}

export default App;
