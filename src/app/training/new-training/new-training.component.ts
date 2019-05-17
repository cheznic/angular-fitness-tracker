import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import * as fromRoot from '../../app.reducer';
import {
  SelectExercise,
  ExerciseListLoaded
} from '../training.actions';
import { UnSub } from '../../shared/unsub';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  private subs: UnSub = new UnSub();

  spinner$: Observable<boolean>;
  exercises$: Observable<Exercise[]> = this.store.pipe(
    select(fromRoot.getExerciseList)
  );

  constructor(
    public trainingService: TrainingService,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.spinner$ = this.store.select(fromRoot.getIsLoading);
    this.subs.add(this.trainingService.exercisesList$
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new ExerciseListLoaded(exercises));
      }));
  }

  ngOnDestroy() {
    this.subs.unsub()
  }

  onSelectExercise(form: NgForm) {
    const id = form.value.exerciseId;
    this.subs.add(this.store.select<Exercise[]>(fromRoot.getExerciseList)
      .pipe(
        take(1),
        map(exercises => exercises.find(exercise => exercise.id === id)),
      ).subscribe(exercise => {
        this.store.dispatch(new SelectExercise(exercise));
      })
    );
  }
}
