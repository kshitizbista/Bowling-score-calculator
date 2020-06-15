import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss'],
})
export class PinComponent implements OnInit {

  // availablePins: number[]
  // @Input() totalPins: number;
  // @Input() maxRollPerFrame: number;
  //
  // // Holds the current roll count temporarily until next frame. This is important for emitting event to parent component;
  // currentRollCount: number = 0;
  //
  // @Output() shot = new EventEmitter<Roll>();
  // @Output() bonusShot = new EventEmitter<number>();
  // @Output() startNewGame = new EventEmitter<void>();
  //
  // roll: Roll;
  // enableSubmit = false;
  //
  // constructor() {
  // }
  //
  // ngOnInit(): void {
  //   // Initialize pins for first time
  //   this.resetPins();
  // }
  //
  // resetPins() {
  //   this.preparePins(this.totalPins);
  // }
  //
  // onPinDown(count: number) {
  //   this.currentRollCount++;
  //   if (this.isRollCountMax()) {
  //     this.roll.second = count;
  //     this.showSubmit();
  //     this.resetRollCountForNextFrame();
  //     this.resetPins();
  //   } else {
  //     this.roll = new Roll();
  //     this.roll.first = count;
  //     this.setRemainingPin(count);
  //   }
  // }
  //
  // setRemainingPin(pinDownCount: number) {
  //   const remainingPin = this.totalPins - pinDownCount;
  //
  //   // In case all pins are down prepare for next frame else set the remaining pin for the current frame
  //   //todo
  //   if (remainingPin === 0) {
  //     this.resetRollCountForNextFrame();
  //     this.resetPins();
  //     this.showSubmit();
  //   } else {
  //     this.preparePins(remainingPin);
  //   }
  // }
  //
  // preparePins(numberOfPins: number) {
  //   this.availablePins = [];
  //   for (let i = 0; i <= numberOfPins; i++) {
  //     this.availablePins.push(i);
  //   }
  // }
  //
  // resetRollCountForNextFrame() {
  //   this.currentRollCount = 0;
  // }
  //
  // isRollCountMax(): boolean {
  //   return this.currentRollCount === this.maxRollPerFrame;
  // }
  //
  // newGame() {
  //   this.resetPins();
  //   this.resetRollCountForNextFrame();
  //   this.hideSubmit();
  //   this.startNewGame.emit();
  // }
  //
  // submit() {
  //   this.shot.emit(this.roll);
  //   this.hideSubmit();
  //   this.resetPins();
  // }
  //
  // showSubmit() {
  //   this.enableSubmit = true;
  // }
  //
  // hideSubmit() {
  //   this.enableSubmit = false;
  // }
  //
  //
  // // bonus(pinCount: number) {
  // //   if (this.roll.first === this.totalPins) {
  // //
  // //   }
  // //   if ((this.roll.second + this.roll.first) === this.totalPins) {
  // //     this.resetRollCountForNextFrame();
  // //     this.resetPins();
  // //     this.showSubmit();
  // //     this.bonusShot.emit(pinCount);
  // //   }
  // // }

  availablePins: number[]
  @Input() totalPins: number;
  @Input() disabled = false;
  @Output() shot = new EventEmitter<number>();

  ngOnInit(): void {
    // Initialize pins for first time
    this.resetPins();
  }

  onPinsHit(count: number) {
    this.shot.emit(count);
  }

  preparePins(numberOfPins: number) {
    this.availablePins = [];
    for (let i = 0; i <= numberOfPins; i++) {
      this.availablePins.push(i);
    }
  }

  setRemainingPin(pinsHit: number) {
    const remainingPin = this.totalPins - pinsHit;
    this.preparePins(remainingPin);
  }

  resetPins() {
    this.preparePins(this.totalPins);
  }
}
