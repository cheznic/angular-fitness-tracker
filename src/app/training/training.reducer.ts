import {
   TrainingActionTypes,
   TrainingActions
} from './training.actions';
import { Exercise } from './exercise.model';

export interface State {
   exerciseList: Exercise[];
   exerciseHistory: Exercise[];
   activeExercise: Exercise;
}

export const initialState: State = {
   exerciseList: [],
   exerciseHistory: [],
   activeExercise: null
};

export function trainingReducer(state: State = initialState, action: TrainingActionTypes): State {

   for (let act in TrainingActions) {
      if (act == action.constructor.name) {
         console.log(`REDUCER: ${action.type}`);
      }
   }

   switch (action.type) {
      case TrainingActions.RequestExerciseList:
         return {
            ...state
         };

      case TrainingActions.ExerciseListLoaded:
         return {
            ...state,
            exerciseList: action.payload
         };

      case TrainingActions.RequestTrainingHistory:
         return {
            ...state
         };

      case TrainingActions.TrainingHistoryLoaded:
         return {
            ...state,
            exerciseHistory: action.payload
         };

      case TrainingActions.SelectExercise:
         return {
            ...state,
            activeExercise: {
               ...action.payload,
               state: 'selected'
            }
         };

      case TrainingActions.SaveCompletedExercise:
         return {
            ...state,
            activeExercise: null
         };

      case TrainingActions.SaveExerciseSuccess:
         return state;

      case TrainingActions.SaveCanceledExercise:
         return {
            ...state,
            activeExercise: null
         };

      case TrainingActions.SaveExerciseSuccess:
         return state;

      default:
         return state;
   }
}

export const getExerciseList = (state: State) => <Exercise[]>state.exerciseList;
export const getExerciseHistory = (state: State) => state.exerciseHistory;
export const getActiveExercise = (state: State) => state.activeExercise;
