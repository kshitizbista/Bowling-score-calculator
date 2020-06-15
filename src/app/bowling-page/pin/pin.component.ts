import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss'],
})
export class PinComponent implements OnInit {
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
