import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Roll} from "../store/bowling-page.reducer";

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  pins: number[]
  @Input() maxPin: number;
  @Input() maxRollPerFrame: number;

  // Holds the current roll count temporarily until next frame. This is important for emitting event to parent component;
  currentRollCount: number = 0;

  @Output() shot = new EventEmitter<Roll>();
  @Output() startNewGame = new EventEmitter<void>();

  roll: Roll;
  disablePinClick = false;

  constructor() {
  }

  ngOnInit(): void {
    // Initialize pins for first time
    this.resetPins();
  }

  resetPins() {
    this.pins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  onPinDown(count: number) {
    this.currentRollCount++;
    if (this.isRollCountMax()) {
      this.roll.second = count;
      this.resetRollCountForNextFrame();
    } else {
      this.roll = new Roll();
      this.roll.first = count;
      this.setRemainingPin(count);
    }
  }

  setRemainingPin(pinDownCount: number) {
    this.pins = [];
    const remainingPin = this.maxPin - pinDownCount;
    for (let i = 0; i <= remainingPin; i++) {
      this.pins.push(i);
    }
    this.disablePinClick = false;
  }

  resetRollCountForNextFrame() {
    this.currentRollCount = 0;
    this.disablePinClick = true;
  }

  isRollCountMax(): boolean {
    return this.currentRollCount === this.maxRollPerFrame;
  }

  newGame() {
    this.resetPins();
    this.disablePinClick = false;
    this.startNewGame.emit();
  }

  submit() {
    this.shot.emit(this.roll);
    this.disablePinClick = false;
    this.resetPins();
  }

}
