import {
   AuthActionsTypes,
   AuthActions
} from './auth.actions';

export interface State {
   isAuthenticated: boolean;
}

const initialState: State = {
   isAuthenticated: false
};

export function authReducer(state: State = initialState, action: AuthActionsTypes) {

   for (let act in AuthActions) {
      if (act == action.constructor.name) {
         console.log(`REDUCER: ${action.type}`);
      }
   }

   switch (action.type) {
      case AuthActions.SET_AUTHENTICATED:
         return {
            isAuthenticated: true
         };
      case AuthActions.SET_UNAUTHENTICATED:
         return {
            isAuthenticated: false
         };
      default:
         return state;
   }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
