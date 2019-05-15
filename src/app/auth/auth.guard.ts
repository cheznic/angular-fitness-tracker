import { Injectable } from '@angular/core';
import {
   CanActivate,
   ActivatedRouteSnapshot,
   RouterStateSnapshot,
   Router,
   CanLoad,
   Route
} from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

   isAuthenticated: boolean;

   constructor(
      private store: Store<fromRoot.State>,
      private router: Router
   ) {
      this.store.select(fromRoot.getIsAuth)
         .subscribe(result => {
            this.isAuthenticated = result;
         });
   }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.isAuthenticated;
   }

   canLoad(route: Route): boolean {
      return this.isAuthenticated;
   }
}