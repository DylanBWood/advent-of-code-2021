import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Day05CoreService {
  getAnswer(): Observable<number> {
    return of(5);
  }
}
