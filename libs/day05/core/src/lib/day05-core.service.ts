import { Injectable } from '@angular/core';
import { filter, map, Observable, of, switchMapTo, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Helpers } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class Day05CoreService {
  getAnswer(inputFilename: string): Observable<number> {
    return this.loadFileText(inputFilename).pipe(
      map(Helpers.parseFileText),
      map(Helpers.onlyHorizontalOrVerticalLines),
      tap(console.log),
      switchMapTo(of(50))
    );
  }

  private loadFileText(inputFileName: string): Observable<string> {
    return this.httpClient.get(inputFileName, { responseType: 'text' });
  }

  constructor(private httpClient: HttpClient) {}
}
