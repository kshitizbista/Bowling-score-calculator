import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  frame;

  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {
  }

}
