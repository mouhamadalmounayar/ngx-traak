import { BehaviorSubject } from "rxjs";

export abstract class EventService<T> {
  details?: T;
  eventSubject: BehaviorSubject<T | undefined> = new BehaviorSubject<
    T | undefined
  >(this.details);
  constructor() {}

  sendDetails(details: T): void {
    if (details) {
      this.eventSubject.next(details);
      return;
    }
  }
}
