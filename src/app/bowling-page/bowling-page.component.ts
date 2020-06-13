import {Component, OnDestroy, OnInit} from '@angular/core';
import {BowlingState, framesSelector, Roll} from "./store/bowling-page.reducer";
import {Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {storeRoll} from "./store/bowling-page.action";

@Component({
  selector: 'app-bowling-page',
  templateUrl: './bowling-page.component.html',
  styleUrls: ['./bowling-page.component.scss']
})
export class BowlingPageComponent implements OnInit, OnDestroy {

  scored: number;
  frames: Roll[];
  totalFrames: number;
  maxRollPerFrame = 2;
  noOfPin: number;
  subscription: Subscription;

  constructor(private store: Store<BowlingState>) {
  }

  ngOnInit(): void {
    this.scored = 0;         // Saves the result of last calculation
    this.frames = [];        // Rolls of each frame
    this.totalFrames = 10;   // Limit of frames
    this.noOfPin = 10;        // max  number of pin

    this.subscription = this.store.pipe(select(framesSelector)).subscribe(value => this.frames = value);
  }


  onShot(value: Roll) {
    // console.log('frame length:' + this.frames.length);
    // console.log('limitFrames:' + this.limitFrames);
    // console.log(`isplayable '${this.frames.length} < ${this.limitFrames}': ` + (this.isPlayable()));
    if (this.isPlayable()) {

      // Verify the pin down doesnt exceeds max value
      if ((value.first + value.second) > this.noOfPin) {
        throw new Error(`There can only be maximum of ${this.noOfPin} pins down`);
      }
      this.store.dispatch(storeRoll({roll: value}));
    }
    // console.log('after dispatch frame length:' + this.frames.length)
    // console.log('--------------------')
    this.calculate();
  }

  // Calculates the score and store the value
  calculate() {
    let score = 0;
    for (let i = 0; i < this.frames.length; i++) {
      const current: Roll = this.frames[i];
      const next: Roll = this.checkNext(this.frames[i + 1]);

      // Check if is STRIKE
      if (this.isStrike(current)) {
        score += this.sumIndexes(next) + current.first;
      }
      // Check if is SPARE
      else if (this.isSpare(current)) {
        score += this.sumIndexes(current) + next.first;
      }
      // Check if is NORMAL
      else {
        score += this.sumIndexes(current);
      }
    }
    this.scored = score;
    return score;
  }


  // Check if the limit	of frames was reached
  isPlayable() {
    return this.frames.length < this.totalFrames;
  }

  // Check if the roll is STRIKE
  isStrike(roll: Roll): boolean {
    return roll.first === 10;
  }

  // Check if the roll is SPARE
  isSpare(roll: Roll): boolean {
    return (roll.first + roll.second) === 10;
  }

  // get total of given roll as integer
  sumIndexes(roll: Roll): number {
    return roll.first + roll.second;
  }

  // set roll object fields to 0. This is for handling undefined or null value if there is no roll in a frame.
  checkNext(val: Roll): Roll {
    return val == undefined ? {first: 0, second: 0} : val
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
