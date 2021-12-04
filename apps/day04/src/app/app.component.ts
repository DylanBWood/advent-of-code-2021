import { Component, OnInit } from '@angular/core';
import { Day04CoreService } from '@day04/core';

@Component({
  selector: 'day04-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'day04';

  answer$ = this.day04CoreService.answer$;

  constructor(private day04CoreService: Day04CoreService) {}

  ngOnInit(): void {}
}
