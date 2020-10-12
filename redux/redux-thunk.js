/*
 * @Description: 
 * @Author: liushuhao
 * @Date: 2020-10-10 16:15:17
 * @LastEditors: liushuhao
 */
function createThunkMiddleware (extraArgument) {
    return ({ dispatch, getState }) => (next) => (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument);
      }
      return next(action);
    };
  }
  
  const thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;
  
  export default thunk;