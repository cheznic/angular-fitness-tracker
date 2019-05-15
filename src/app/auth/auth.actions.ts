import { Action } from '@ngrx/store';

export enum AuthActions {
   SET_AUTHENTICATED = '[Auth] SET_AUTHENTICATED',
   SET_UNAUTHENTICATED = '[Auth] SET_UNAUTHENTICATED',
}


export class SetAuthenticated implements Action {
   readonly type = AuthActions.SET_AUTHENTICATED;

   constructor() {
      console.log(`ACTION: ${this.type}`);
   }
}
export class SetUnauthenticated implements Action {
   readonly type = AuthActions.SET_UNAUTHENTICATED;

   constructor() {
      console.log(`ACTION: ${this.type}`);
   }
}

export type AuthActionsTypes =
   SetAuthenticated |
   SetUnauthenticated;
