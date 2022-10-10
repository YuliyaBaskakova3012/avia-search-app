const CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE';

let initialState = {
currentPage:  1
};

const changeCurrentPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage
      }
    }
    default: return state
  }
}

export const changeCurrentPage = (currentPage) => ({type: CHANGE_CURRENT_PAGE, currentPage });
export default changeCurrentPageReducer;
