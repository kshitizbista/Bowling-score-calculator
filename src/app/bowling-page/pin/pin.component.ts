import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss'],
})
export class PinComponent implements OnInit {
  availablePins: number[]
  @Input() totalPins: number;
  @Output() shot = new EventEmitter<number>();
  unavailablePinCounter: number;

  ngOnInit(): void {
    // Initialize pins for first time
    this.preparePins(this.totalPins);
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

  disableUnavailablePins(pinsHit: number) {
    this.unavailablePinCounter = pinsHit;
  }

  resetPins() {
    this.unavailablePinCounter = 0;
  }
}
