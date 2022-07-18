
  const initialState = {
    SearchValue : "",
    recentSearch : "",
    user: {}
  };
  
  function authReducer(state = initialState, action) {
    switch (action.type) {
      case "USER_OBJ" : {
        return {
          ...state,
          user : action.payload
        }
      }
      
      case "LOGOUT" : {
        return{
          ...state,
          user : {}
        }
      }
      default:
        return state;
    }
  }
  
  export default authReducer;
  