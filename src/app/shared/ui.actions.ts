import { Action } from '@ngrx/store';

export enum UIActions {
   START_LOADING = '[UI] START_LOADING',
   STOP_LOADING = '[UI] STOP_LOADING'
}

export class StartLoading implements Action {
   readonly type = UIActions.START_LOADING;

   constructor() {
      console.log(`ACTION: ${this.type}`);
   }
}
export class StopLoading implements Action {
   readonly type = UIActions.STOP_LOADING;
   
   constructor() {
      console.log(`ACTION: ${this.type}`);
   }
}

export type UIActionTypes =
   StartLoading |
   StopLoading;