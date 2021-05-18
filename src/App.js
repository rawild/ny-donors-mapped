import './App.css';
import { LayerMap } from './components/layerMap.js'
import { DonorMap } from './components/donorMap.js'
import { PieChartPanel } from './components/pieChartPanel.js'
import { GeocodingPanel } from './components/geocodingPanel.js'
import { StatesPanel } from './components/statesPanel.js'

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
      <PieChartPanel />
      <GeocodingPanel />
      <StatesPanel />
      
    </div>
  );
}

export default App;
