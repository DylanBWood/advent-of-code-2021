import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Day04CoreService {
  answer$ = of(500);

  constructor() {}
}
