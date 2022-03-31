
const {result}=require('../flights.json');

const CHANGE_DATA='CHANGE_DATA';
;

let flights=[...result.flights].concat();


let initialState = {
initialData:  flights,
displayedData: flights,
};
const changeDataReducer = (state = initialState, action) => {
switch (action.type) {
 
 case CHANGE_DATA: {
    return {
    ...state,
    displayedData: action.data
    }
     }
default: return state
}
}
export const changeDisplayedData = (data) => ({type: CHANGE_DATA, data });
export default changeDataReducer;
