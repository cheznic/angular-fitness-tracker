import { Component, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { delay, tap, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import * as fromRoot from '../../app.reducer';
import { UnSub } from '../../shared/unsub';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements AfterViewInit, OnDestroy, OnInit {
  private subs = new UnSub();
  displayedColumns = ['date', 'name', 'calories', 'state'];
  dataSource: MatTableDataSource<Exercise> = new MatTableDataSource<Exercise>();

  private history$: Observable<Exercise[]> = this.store.pipe(
    select(fromRoot.getExerciseHistory)
  );

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public trainingService: TrainingService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.subs.add(
      this.history$
        .pipe(
          delay(0),
          filter(history => !!history)
        )
        .subscribe((history: Exercise[]) => {
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
