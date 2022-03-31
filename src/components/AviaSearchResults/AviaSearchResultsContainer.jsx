import React from 'react';
import {connect} from 'react-redux';
import AviaSearchResults from './AviaSearchResults';
import {changeCurrentPage} from '../../redux/changeCurrentPage-reducer';
const AviaSearchResultsContainer=(props)=><>
<AviaSearchResults {...props}/>
</>
const mapStateToProps = (state) => {
return {
  displayedData: state.searchedData.displayedData,
  initialData: state.searchedData.initialData,
  currentPage: state.currentPage.currentPage
}
}
const mapDispatchToProps = (dispatch) => {
  return {
  changeCurrentPage: (currentPage)=>{
      dispatch(changeCurrentPage(currentPage))  
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AviaSearchResultsContainer);