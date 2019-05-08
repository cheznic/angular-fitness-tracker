import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class UIService {
   private spinningSubject = new Subject<boolean>();
   spinner$ = this.spinningSubject.asObservable();

   constructor(
      private snackbar: MatSnackBar
   ) { }

   startSpinner() {
      this.spinningSubject.next(true);
   }

   stopSpinner() {
      this.spinningSubject.next(false);
   }

   showError(err) {
      if (err.code === 'auth/email-already-in-use') {
         this.snackbar.open(err.message, null, {
            duration: 3000
         });
         return;
      }
      if (err.code === 'auth/wrong-password') {
         this.snackbar.open(err.message, null, {
            duration: 3000
         });
         return;
      }
      this.snackbar.open("Unexpected error.", null, {
         duration: 3000
      });

   }
}