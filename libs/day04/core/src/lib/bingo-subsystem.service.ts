import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable, of, scan, switchMap, take, tap } from 'rxjs';
import * as R from 'ramda';
import * as RA from 'ramda-adjunct';

export interface BingoBoard {
  board: MarkedNumber[][];
}

export interface BingoGame {
  numberDraw: number[];
  boards: BingoBoard[];
}

export interface BingoTurn {
  numberDrawn: number;
  players: BingoBoard[];
}

export interface MarkedNumber {
  number: number;
  marked: boolean;
}

export interface TurnWinner {
  lastNumberDrawn: number;
  winningBoard: BingoBoard | null;
}

@Injectable({
  providedIn: 'root',
})
export class BingoSubsystemService {
  static readonly BOARD_HEIGHT = 5;
  static readonly BOARD_WIDTH = 5;

  constructor(private httpClient: HttpClient) {}

  public getAnswer(inputFilename: string): Observable<number> {
    if (RA.isNonEmptyString(inputFilename)) {
      // load input file
      console.log(inputFilename);

      return this.loadInputFile(inputFilename).pipe(tap(console.log));
    } else {
      return of(-1);
    }
  }

  loadInputFile(
    inputFilename: string
  ): Observable<BingoGame | null | string | string[] | any> {
    return this.httpClient.get(inputFilename, { responseType: 'text' }).pipe(
      tap(console.log),
      map((input: string) => input.split('\n')),
      map((input) => {
        const numberDraw = input[0].split(',').map(Number);
        const boards: BingoBoard[] = R.splitEvery(
          BingoSubsystemService.BOARD_HEIGHT,
          input
            .slice(1)
            .filter(RA.isNonEmptyString)
            .map((board) =>
              board
                .split(' ')
                .filter(RA.isNonEmptyString)
                .map(Number)
                .map(R.unary(this.mapToMarkedNumber))
            )
        ).map((board) => ({ board } as BingoBoard));

        return {
          numberDraw,
          boards,
        } as BingoGame;
      }),
      tap(console.log),
      switchMap((bingoGame: BingoGame) =>
        bingoGame.numberDraw.map(
          (drawnNumber) =>
            ({
              numberDrawn: drawnNumber,
              players: bingoGame.boards,
            } as BingoTurn)
        )
      ),
      scan(
        (prev, cur) =>
          ({
            numberDrawn: cur.numberDrawn,
            players: cur.players.map(
              ({ board }, playerIndex) =>
                ({
                  board: board.map((row, rowIndex) =>
                    row.map(
                      (val, columnIndex) =>
                        ({
                          number: val.number,
                          marked:
                            (prev &&
                              RA.isNonEmptyArray(prev.players) &&
                              prev.players[playerIndex].board[rowIndex][
                                columnIndex
                              ].marked) ||
                            val.number === cur.numberDrawn,
                        } as MarkedNumber)
                    )
                  ),
                } as BingoBoard)
            ),
          } as BingoTurn),
        {} as BingoTurn
      ),
      map(this.mapToTurnWinner),
      filter((turnWinner) => RA.isNotNil(turnWinner.winningBoard)),
      tap(console.log),
      map((turnWinner: TurnWinner) => [
        turnWinner.lastNumberDrawn,
        turnWinner.winningBoard?.board
          .reduce(
            (acc, cur) => [
              ...acc,
              ...cur.filter((val) => !val.marked).map((val) => val.number),
            ],
            [] as number[]
          )
          .map((val) => {
            console.log(val);
            return val;
          })
          .reduce((acc, cur) => acc + cur),
      ]),
      map(
        ([lastNumberDrawn, sumOfUnMarked]) => lastNumberDrawn * sumOfUnMarked
      ),
      take(1)
    );
  }

  mapToTurnWinner(turn: BingoTurn): TurnWinner {
    const getWinningBoard = (players: BingoBoard[]): BingoBoard | null => {
      let winningBoard: BingoBoard | null = null;

      players.forEach((board) => {
        let winningColumn: number[] = [];
        let winningRow: number[] = [];

        for (
          let colIndex = 0;
          colIndex < BingoSubsystemService.BOARD_WIDTH;
          colIndex++
        ) {
          const col = [];

          for (
            let rowIndex = 0;
            rowIndex < BingoSubsystemService.BOARD_WIDTH;
            rowIndex++
          ) {
            col.push(board.board[rowIndex][colIndex]);
          }

          const colNums = col
            .filter((item) => item.marked)
            .map((item) => item.number);

          if (
            RA.isNonEmptyArray(colNums) &&
            colNums.length === BingoSubsystemService.BOARD_HEIGHT
          ) {
            winningColumn = [...colNums];
          }
        }

        board.board.forEach((row) => {
          const rowNums = row
            .filter((item) => item.marked)
            .map((item) => item.number);

          if (
            RA.isNonEmptyArray(rowNums) &&
            rowNums.length === BingoSubsystemService.BOARD_HEIGHT
          ) {
            winningRow = [...rowNums];
          }
        });

        if (
          RA.isNonEmptyArray(winningRow) ||
          RA.isNonEmptyArray(winningColumn)
        ) {
          console.log('winningRow', winningRow);
          console.log('winningColumn', winningColumn);
          winningBoard = board;
        }
      });

      return winningBoard;
    };

    return {
      lastNumberDrawn: turn.numberDrawn,
      winningBoard: getWinningBoard(turn.players),
    };
  }

  mapToMarkedNumber(number: number, drawn: number[] = []): MarkedNumber {
    return {
      number,
      marked: drawn.includes(number),
    };
  }
}
