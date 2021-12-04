import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BingoSubsystemService } from './bingo-subsystem.service';

@Injectable({
  providedIn: 'root',
})
export class Day04CoreService {
  constructor(private readonly bingoSubsystemService: BingoSubsystemService) {}

  public getAnswer(inputFilename: string): Observable<number> {
    return this.bingoSubsystemService.getAnswer(inputFilename);
  }
}
