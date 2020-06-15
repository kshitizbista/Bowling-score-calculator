import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BowlingState, framesSelector, Roll} from "./store/bowling-page.reducer";
import {Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {resetGame, storeRoll} from "./store/bowling-page.action";
import {PinComponent} from "./pin/pin.component";
import {Calculator} from "./calculator";

@Component({
  selector: 'app-bowling-page',
  templateUrl: './bowling-page.component.html',
  styleUrls: ['./bowling-page.component.scss']
})
export class BowlingPageComponent implements OnInit, OnDestroy {

  frames: Roll[];
  roll: Roll;
  scored: number;
  totalPins: number;
  totalFrames: number;
  calculator: Calculator;
  subscription: Subscription;

  // Holds roll count temporarily in normal play mode. Count is reset every time for a new frame
  currentRollCount: number = 0;

  // Holds roll count in bonus play mode. There can be maximum of three roll depending upon strike or spare in 10th frame
  bonusRollCount: number = 0;

  isPinsDisabled: boolean = false;

  @ViewChild('pinComponent') pinComponent: PinComponent;

  constructor(private store: Store<BowlingState>) {
  }

  ngOnInit(): void {
    this.scored = 0;         // Saves the result of last calculation
    this.frames = [];        // Rolls of each frame
    this.totalFrames = 10;   // Limit of frames
    this.totalPins = 10;     // max  number of pin

    this.calculator = new Calculator();
    this.subscription = this.store.pipe(select(framesSelector)).subscribe(value => this.frames = value);
  }


  onShot(pinsHit: number) {
    // if (this.isFinalFrame()) {
    //   this.bonusPlay(pinsHit);
    // } else {
      this.normalPlay(pinsHit);
    // }
  }

  normalPlay(pinsHit: number) {
    this.currentRollCount++;
    if (this.currentRollCount === 2) {
      this.roll.second = pinsHit;
      this.resetRollCountForNextFrame();
      this.pinComponent.resetPins();
      this.setScore(this.roll);
    } else {
      this.roll = new Roll();
      this.roll.first = pinsHit;
      if (this.calculator.isStrike(this.roll)) {
        this.resetRollCountForNextFrame();
        this.setScore(this.roll);
      } else {
        this.pinComponent.setRemainingPin(pinsHit);
      }
    }
  }


  bonusPlay(pinsHit: number) {
    this.bonusRollCount++;
    if (this.bonusRollCount === 1) {
      this.roll = new Roll();
      this.roll.first = pinsHit;
    } else if (this.bonusRollCount === 2) {
      this.roll.second = pinsHit
    } else {
      this.roll.third = pinsHit;
      this.setScore(this.roll, true);
      this.disablePins();
    }
    if (this.calculator.isStrike(this.roll) || this.calculator.isSpare(this.roll)) {
      this.pinComponent.resetPins();
    } else if (this.calculator.isOpen(this.roll) && this.bonusRollCount === 2) {
      this.pinComponent.resetPins();
      this.setScore(this.roll, true);
      this.disablePins();
    } else {
      this.pinComponent.setRemainingPin(this.roll.first);
    }
  }

  isFinalFrame(): boolean {
    return (this.frames.length < this.totalFrames) && (this.frames.length === (this.totalFrames - 1));
  }

  resetRollCountForNextFrame() {
    this.currentRollCount = 0;
  }

  setScore(value: Roll, isBonus: boolean = false) {
    if (this.isPlayable()) {
      // Verify the pin down doesnt exceeds max value
      // if ((value.first + value.second) > this.totalPins) {
      //   throw new Error(`There can only be maximum of ${this.totalPins} pins down`);
      // }
      this.store.dispatch(storeRoll({roll: value}));
    }
    this.scored = this.calculator.calculate(this.frames, isBonus);
  }

  // Check if the limit	of frames was reached
  isPlayable(): boolean {
    return this.frames.length < this.totalFrames;
  }

  enablePins() {
    this.isPinsDisabled = false;
  }

  disablePins() {
    this.isPinsDisabled = true;
  }

  newGame() {
    this.store.dispatch(resetGame());
    this.calculator.calculate(this.frames, false);
    this.enablePins();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
