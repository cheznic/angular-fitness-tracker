import { Subscription, of } from 'rxjs';

export class UnSub {
  private subscriptions: Subscription[] = [];

  add(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  unsub() {
    this.subscriptions.forEach(sub => {
      if (!!sub) {
        sub.unsubscribe();
      }
    });
    this.subscriptions = [];
  }
}