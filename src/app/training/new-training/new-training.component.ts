import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import * as fromRoot from '../../app.reducer';
import { RequestExerciseList, SelectExercise } from '../training.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  private exercises: Exercise[];

  spinner$: Observable<boolean>;
  exercises$: Observable<Exercise[]> = this.store.pipe(
    select(fromRoot.getExerciseList),
    tap(exercises => {
      this.exercises = exercises;
    })
  );

  constructor(
    public trainingService: TrainingService,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new RequestExerciseList());
    this.spinner$ = this.store.select(fromRoot.getIsLoading);
  }

  onStartTraining(form: NgForm) {
    const exercise = this.exercises.find(exercise =>
      exercise.id === form.value.exerciseId
    );
    this.store.dispatch(new SelectExercise(exercise));
  }
}
