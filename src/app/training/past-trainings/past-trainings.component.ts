import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Exercise } from '../exercise.model';
import { TrainingHistoryService } from '../training-history.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements AfterViewInit, OnDestroy {

  // displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  displayedColumns = ['date', 'name', 'calories', 'state'];
  dataSource: MatTableDataSource<Exercise>;
  private subscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private trainingHistoryService: TrainingHistoryService
  ) { }

  ngAfterViewInit() {
    this.subscription = this.trainingHistoryService
      .trainingHistory$
      .subscribe(history => {
        this.dataSource = new MatTableDataSource(history);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
