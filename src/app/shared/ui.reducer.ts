import { UIActionTypes, UIActions } from './ui.actions';

export interface State {
   isLoading: boolean;
}

const initialState: State = {
   isLoading: false
};

export function uiReducer(state: State = initialState, action: UIActionTypes) {

   for(let act in UIActions) {
      if (act == action.constructor.name) {
         console.log(`REDUCER: ${action.type}`);
      }   
   }

   switch (action.type) {
      case UIActions.START_LOADING:
         return {
            isLoading: true
         };
      case UIActions.STOP_LOADING:
         return {
            isLoading: false
         };
      default:
         return state;
   }
}

export const getIsLoading = (state: State) => state.isLoading;
