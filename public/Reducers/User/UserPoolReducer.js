const UserPool = (state => {

}, action) => {
  switch (action.type) {
    
  }
}

// const auth = (state = {
//   isAuthenticated: checkTokenExpiry(),
//   profile: getProfile(),
//   err: '',
// }, action) => {
//   switch (action.type) {
//     case LOGIN_SUCCESS :
//       return Object.assign({}, state, { isAuthenticated: true, profile: action.profile });
//     case LOGIN_ERROR :
//       return Object.assign({}, state, { isAuthenticated: false, profile: null, error: action.error });
//     case LOGOUT_SUCCESS :
//       return Object.assign({}, state, { isAuthenticated: false, profile: null });
//     default:
//       return state;
//   }
// };