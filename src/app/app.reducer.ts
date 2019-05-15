import {
   ActionReducerMap,
   createFeatureSelector,
   createSelector
} from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromTraining from './training/training.reducer';

export interface State {
   ui: fromUi.State;
   auth: fromAuth.State;
   training: fromTraining.State;
}

export const reducers: ActionReducerMap<State> = {
   ui: fromUi.uiReducer,
   auth: fromAuth.authReducer,
   training: fromTraining.trainingReducer
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);

export const getTrainingState = createFeatureSelector<fromTraining.State>('training');
export const getActiveExercise = createSelector(getTrainingState, fromTraining.getActiveExercise);
export const getExerciseHistory = createSelector(getTrainingState, fromTraining.getExerciseHistory);
export const getExerciseList = createSelector(getTrainingState, fromTraining.getExerciseList);
