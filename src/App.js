import './App.css';
import SearchPanelContainer from './components/SearchPanel/SearchPanelContainer';
import AviaSearchResultsContainer from './components/AviaSearchResults/AviaSearchResultsContainer';

export const App = () => {

  return (
    <div className='app-wrapper'>
      <SearchPanelContainer/>
      <AviaSearchResultsContainer/>
    </div>
  );
}

export default App;
