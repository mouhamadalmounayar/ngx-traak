import { BehaviorSubject, Observable } from "rxjs";

export abstract class EventService<T> {
  details?: T;
  eventSubject: BehaviorSubject<T | undefined> = new BehaviorSubject<
    T | undefined
  >(this.details);
  event$: Observable<T | undefined> = this.eventSubject.asObservable();

  constructor() {}

  sendDetails(details: T): void {
    if (details) {
      this.eventSubject.next(details);
      return;
    }
  }
}
