import React from 'react';
import {connect} from 'react-redux';
import SearchPanel from './SearchPanel';
import {changeDisplayedData} from '../../redux/changeData-reducer';
import {changeCurrentPage} from '../../redux/changeCurrentPage-reducer';

const SearchPanelContainer = (props) => <>
  <SearchPanel {...props}/>
</>

const mapStateToProps = (state) => {
  return {
    initialData: state.searchedData.initialData,
    displayedData: state.searchedData.displayedData,
    currentPage: state.currentPage.currentPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeDisplayedData: (data) => {
      dispatch(changeDisplayedData(data))  
    },
    changeCurrentPage: (currentPage)=>{
      dispatch(changeCurrentPage(currentPage))  
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanelContainer);
