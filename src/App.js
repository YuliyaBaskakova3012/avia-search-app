import './App.css';
import SearchPanelContainer from './SearchPanelContainer';
import AviaSearchResultsContainer from './AviaSearchResultsContainer';
export const App=()=>{
  return (
    <div className="app-wrapper">
    <SearchPanelContainer/>
    <AviaSearchResultsContainer/>
    </div>
  );
}
export default App;
