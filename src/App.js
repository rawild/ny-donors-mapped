import './App.css';
import { LayerMap } from './components/layerMap.js'
import { DonorMap } from './components/donorMap.js'
import { PieChartPanel } from './components/pieChartPanel.js'
import { GeocodingPanel } from './components/geocodingPanel.js'
import { StatesPanel } from './components/statesPanel.js'
import { QuintilePanel } from './components/quintilePanel';
import { RecipientsPanel } from './components/recipientsPanel';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
         Mapping New York Political Donors
        </p>
      </header>
      <PieChartPanel />
      <GeocodingPanel />
      <StatesPanel />
      <QuintilePanel />
      <LayerMap />
      <RecipientsPanel />
      <DonorMap />
      
     
      
    </div>
  );
}

export default App;
