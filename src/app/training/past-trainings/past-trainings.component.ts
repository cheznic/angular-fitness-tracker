import { Component, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { Exercise } from '../exercise.model';
import * as fromRoot from '../../app.reducer';
import { RequestTrainingHistory } from '../training.actions';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements AfterViewInit, OnDestroy, OnInit {

  displayedColumns = ['date', 'name', 'calories', 'state'];
  dataSource: MatTableDataSource<Exercise> = new MatTableDataSource();
  
  private exerciseHistory$: Observable<Exercise[]>;
  private historySub: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.exerciseHistory$ = this.store.pipe(
      select(fromRoot.getExerciseHistory)
    );
    this.store.dispatch(new RequestTrainingHistory());
  }
  
  ngAfterViewInit() {
    this.historySub = this.exerciseHistory$.pipe(
      delay(0)
    ).subscribe(history => {
        this.dataSource.data = history;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (!!this.historySub) {
      this.historySub.unsubscribe();
      this.historySub = undefined;
    }
  }
}
