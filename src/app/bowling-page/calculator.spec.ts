import {async} from "@angular/core/testing";
import {Calculator} from "./calculator";
import {Roll} from "./store/bowling-page.reducer";

describe('Calculator', () => {

  let calculator: Calculator;

  beforeEach(async(() => {
    calculator = new Calculator();
  }));

  it('create an instance', () => {
    expect(calculator).toBeTruthy();
  });

  it('#isStrike should return true when all 10 pins where knocked down with the first roll', () => {
    const roll: Roll = {first: 10, second: 0};
    expect(calculator.isStrike(roll)).toBeTrue();
  });

  it('#isSpare should be true when all 10 pins where knocked down using two rolls', () => {
    const roll: Roll = {first: 6, second: 4};
    expect(calculator.isSpare(roll)).toBeTrue();
  });

  it('#isOpen should be true when some pins where left standing after the frame was completed', () => {
    const roll: Roll = {first: 2, second: 1};
    expect(calculator.isOpen(roll)).toBeTrue();
  });

  it('for an open frame, #calculate should return total score as sum number of pins knocked down in current frame', () => {
    const roll: Roll[] = [{first: 1, second: 4}, {first: 2, second: 2}];
    expect(calculator.calculate(roll)).toEqual({totalScore: 9, frameScores: [5, 4]});
  });

  it('for a spare, #calculate should add current frame score and the number of pins knocked down in the first roll of the following frame', () => {
    const frames: Roll[] = [{first: 8, second: 2}, {first: 1, second: 2}];
    expect(calculator.calculate(frames)).toEqual({totalScore: 14, frameScores: [11, 3]})
  });

  it('for a strike, the score is 10 + the sum of the two rolls in the following frame', () => {
    const roll: Roll[] = [{first: 10, second: 0}, {first: 3, second: 2}];
    expect(calculator.calculate(roll)).toEqual({totalScore: 20, frameScores: [15, 5]});
  });
});
