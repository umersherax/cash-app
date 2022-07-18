
  const initialState = {
    SearchValue : "",
    showTabs : false,
    recentSearch : ""
  };
  
  function flowReducer(state = initialState, action) {
    switch (action.type) {
      case "SEARCH" : {
        return {
          ...state,
          SearchValue : action.payload
        }
      }
      case "SHOW_TABS": {
        return{
          ...state,
          showTabs : action.payload
        }
      }
      case "RECENT_SEARCH" : {
        return{
          ...state,
          recentSearch : action.payload
        }
      }
      default:
        return state;
    }
  }
  
  export default flowReducer;
  