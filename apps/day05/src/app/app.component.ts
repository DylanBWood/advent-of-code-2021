import { Component } from '@angular/core';

import { Day05CoreService } from '@day05/core';

@Component({
  selector: 'day05-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'day05';

  answer$ = this.day05CoreService.getAnswer();

  constructor(private day05CoreService: Day05CoreService) {}
}
