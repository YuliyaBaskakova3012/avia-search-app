import { combineReducers, createStore} from 'redux';
import changeDataReducer from './changeData-reducer';
import changeCurrentPageReducer from './changeCurrentPage-reducer';
const reducers = combineReducers({
    searchedData: changeDataReducer,
    currentPage: changeCurrentPageReducer
});
const store = createStore(reducers);

export default store;
