import { Subscription } from 'rxjs';

export class UnSub {
  private subs: Subscription[] = [];

  add(sub: Subscription) {
    this.subs.push(sub);
  }

  unsub() {
    this.subs
      .filter(sub => !!sub && !sub.closed)
      .forEach(sub => {
        try { sub.unsubscribe(); }
        catch (err) {
          console.error(err);
        }
      });
    this.subs = [];
  }
}
