import './index.scss';
import {useState} from 'react';

function App() {
  const [counter, setCounter] = useState<number>(0)

  const clickPlus = () => setCounter(counter + 1)
  const clickMinus = () => setCounter(counter - 1)

  return (
      <div className="App">
        <div>
          <h2>Счетчик:</h2>
          <h1>{counter}</h1>
          <button className="minus" onClick={clickPlus}>- Минус</button>
          <button className="plus" onClick={clickMinus}>Плюс +</button>
        </div>
      </div>
  );
}

export default App;
