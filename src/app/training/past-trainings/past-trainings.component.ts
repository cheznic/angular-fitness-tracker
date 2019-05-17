import { Component, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import * as fromRoot from '../../app.reducer';
import { TrainingHistoryLoaded } from '../training.actions';
import { UnSub } from '../../shared/unsub';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements AfterViewInit, OnDestroy, OnInit {
  private subs = new UnSub();
  displayedColumns = ['date', 'name', 'calories', 'state'];
  dataSource: MatTableDataSource<Exercise> = new MatTableDataSource();

  private exerciseHistory$: Observable<Exercise[]> = this.store.pipe(
    select(fromRoot.getExerciseHistory)
  );

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public trainingService: TrainingService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.subs.add(this.trainingService.exerciseHistory$
      .pipe(
        take(1)
      ).subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new TrainingHistoryLoaded(exercises));
      })
    );
  }

  ngAfterViewInit() {
    this.subs.add(this.exerciseHistory$
      .pipe(
        delay(0)
      ).subscribe(history => {
        this.dataSource.data = [];
        this.dataSource.data = history;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    );
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subs.unsub();
  }
}
