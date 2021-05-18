import './App.css';
import { LayerMap } from './components/layerMap.js'
import { DonorMap } from './components/donorMap.js'
import { BarChart } from './components/barChart.js'
import { PieChartPanel } from './components/pieChartPanel.js'

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
      <BarChart/>
    </div>
  );
}

export default App;
