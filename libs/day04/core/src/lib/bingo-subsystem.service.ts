import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as R from 'ramda';
import * as RA from 'ramda-adjunct';

export interface BingoBoard {
  board: number[][];
}

export interface BingoGame {
  numberDraw: number[];
  boards: BingoBoard[];
}

@Injectable({
  providedIn: 'root',
})
export class BingoSubsystemService {
  static readonly BOARD_HEIGHT: 5;
  static readonly BOARD_WIDTH: 5;

  public getAnswer(inputFilename: string): Observable<number> {
    if (RA.isNonEmptyString(inputFilename)) {
      // load input file
      console.log(inputFilename);

      return of(400);
    } else {
      return of(-1);
    }
  }

  loadInputFile(inputFilename: string): Observable<BingoGame | null> {
    return of(null);
  }
}
