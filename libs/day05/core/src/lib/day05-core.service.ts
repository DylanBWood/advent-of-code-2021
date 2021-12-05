import { Injectable } from '@angular/core';
import { filter, map, Observable, of, switchMapTo, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Helpers } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class Day05CoreService {
  getAnswer(inputFilename: string): Observable<number | any> {
    return this.loadFileText(inputFilename).pipe(
      map(Helpers.parseFileText),
      map(Helpers.onlyHorizontalOrVerticalLines),
      map(Helpers.createVentDiagram),
      map(Helpers.numPointsOfOverlapOver2)
    );
  }

  private loadFileText(inputFileName: string): Observable<string> {
    return this.httpClient.get(inputFileName, { responseType: 'text' });
  }

  constructor(private httpClient: HttpClient) {}
}
