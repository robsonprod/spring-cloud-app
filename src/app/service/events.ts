import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {count, defaultIfEmpty, distinct, filter, map} from 'rxjs/operators';

interface Message {
  type: string;
  payload?: any;
}

@Injectable({ providedIn: 'root' })
export class Events implements OnDestroy {

  private handler: Subject<Message>;

  constructor() {
    this.handler = new Subject<Message>();
  }

  ngOnDestroy() {
    this.handler.unsubscribe();
  }

  broadcast(type: string, payload?: any) {
    if (isDefined(payload)) {
      this.handler.next({type: type, payload: payload});
      this.handler.asObservable().pipe(distinct())
    }
  }

  on<T>(type: string): Observable<T> {
    return this.handler.asObservable()
      .pipe(
        filter(event => event.type === type),
        map(event => event.payload)
      );
  }
}

function isDefined<T>(value: T | undefined | null): value is T {
  return <T> value !== undefined && <T> value !== null;
}

function isEquals<T, E>(v1: T, v2: E): boolean {
  return Object.is(<T> v1, <E> v2);
}
