import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  hasSelectedExercise$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.hasSelectedExercise$ = this.store.pipe(
      select(fromRoot.getActiveExercise),
      map(exercise => !!exercise),
    );
  }
}
