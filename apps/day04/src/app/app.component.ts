import { Component } from '@angular/core';
import { Day04CoreService } from '@day04/core';
import { tap } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'day04-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'day04';

  partOneAnswer$ = this.day04CoreService.getPartOneAnswer(
    environment.inputFile
  );
  partTwoAnswer$ = this.day04CoreService.getPartTwoAnswer(
    environment.inputFile
  );

  constructor(private day04CoreService: Day04CoreService) {}
}
