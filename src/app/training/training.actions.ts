import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export enum TrainingActions {
   RequestExerciseList = '[Training] Request Exercise List',
   ExerciseListLoaded = '[API] Exercise List Loaded',
   RequestTrainingHistory = '[Training] Request Training History',
   TrainingHistoryLoaded = '[API] Training History Loaded',
   SelectExercise = '[Training] Select Exercise',
   DeselectExercise = '[Training] Deselect Exercise',
   SaveCompletedExercise = '[Training] Save Completed Exercise',
   SaveCanceledExercise = '[Training] Save Canceled Exercise',
   SaveExerciseSuccess = '[API] Save Exercise Success',
   SaveExerciseError = '[API] Save Exercise Error',
};

export class RequestExerciseList implements Action {
   readonly type = TrainingActions.RequestExerciseList;

   constructor() {
      // console.log(`ACTION: ${this.type}`);
   }
}

export class ExerciseListLoaded implements Action {
   readonly type = TrainingActions.ExerciseListLoaded;

   constructor(public payload: Exercise[]) {
      // console.log(`ACTION: ${this.type}`);
   }
}

export class RequestTrainingHistory implements Action {
   readonly type = TrainingActions.RequestTrainingHistory;

   constructor() {
      // console.log(`ACTION: ${this.type}`);
   }
}

export class TrainingHistoryLoaded implements Action {
   readonly type = TrainingActions.TrainingHistoryLoaded;

   constructor(public payload: Exercise[]) {
      // console.log(`ACTION: ${this.type}`);
   }
}

export class SelectExercise implements Action {
   readonly type = TrainingActions.SelectExercise;

   constructor(public payload: Exercise) {
      // console.log(`ACTION: ${this.type}`);
   }
}

export class DeselectExercise implements Action {
   readonly type = TrainingActions.DeselectExercise;

   constructor() {
      // console.log(`ACTION: ${this.type}`);
   }
}

export class SaveCompletedExercise implements Action {
   readonly type = TrainingActions.SaveCompletedExercise;

   constructor(public payload: { exercise: Exercise, progress: number }) {
      // console.log(`ACTION: ${this.type}`);
   }
}

export class SaveCanceledExercise implements Action {
   readonly type = TrainingActions.SaveCanceledExercise;

   constructor(public payload: Exercise) {
      // console.log(`ACTION: ${this.type}`);
   }
}

export class SaveExerciseSuccess implements Action {
   readonly type = TrainingActions.SaveExerciseSuccess;

   constructor() {
      // console.log(`ACTION: ${this.type}`);
   }
}

export class SaveExerciseError implements Action {
   readonly type = TrainingActions.SaveExerciseError;

   constructor() {
      // console.log(`ACTION: ${this.type}`);
   }
}

export type TrainingActionTypes
   = RequestExerciseList
   | ExerciseListLoaded
   | RequestTrainingHistory
   | TrainingHistoryLoaded
   | SelectExercise
   | DeselectExercise
   | SaveCompletedExercise
   | SaveCanceledExercise
   | SaveExerciseSuccess
   | SaveExerciseError;