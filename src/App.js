import './App.css';
import { LayerMap } from './components/layerMap.js'
import { DonorMap } from './components/donorMap.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
         NY Political Donors Mapped
        </p>
      </header>
      <LayerMap />
      <DonorMap />
    </div>
  );
}

export default App;
