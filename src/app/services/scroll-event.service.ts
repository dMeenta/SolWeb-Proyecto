import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollEventService {
  private scrollSubject = new Subject<void>();
  scroll$ = this.scrollSubject.asObservable();

  emitScrollReachedBottom() {
    this.scrollSubject.next();
  }
}
