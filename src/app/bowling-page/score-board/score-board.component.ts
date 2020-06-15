import {Component, Input, OnInit} from '@angular/core';
import {Roll} from "../store/bowling-page.reducer";

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent implements OnInit {

  @Input() frames: Roll[];
  @Input() frameScores: number[];
  @Input() totalScore: number;

  constructor() {
  }

  ngOnInit(): void {
  }
}
