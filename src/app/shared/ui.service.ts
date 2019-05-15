import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService {

   constructor(
      private snackbar: MatSnackBar
   ) { }

   showError(err) {
      if (err.code === 'auth/email-already-in-use') {
         this.snackbar.open(err.message, null, {
            duration: 3000
         });
         return;
      }
      if (err.code === 'auth/wrong-password') {
         this.snackbar.open('Wrong user or password.', null, {
            duration: 3000
         });
         return;
      }
    this.snackbar.open('Unexpected error, check network and try again.', null, {
         duration: 3000
      });
   }
}
