import {Roll} from "./store/bowling-page.reducer";

export class Calculator {

  // Calculates the score and store the value
  calculate(frames: Roll[], isBonus) {
    let score = 0;
    for (let i = 0; i < frames.length; i++) {
      const current: Roll = frames[i];
      const next: Roll = this.checkNext(frames[i + 1]);

      // if (!isBonus) {
      // Check if roll is STRIKE
      if (this.isStrike(current)) {
        score += this.sumIndexes(next) + current.first;
      }
      // Check if roll is SPARE
      else if (this.isSpare(current)) {
        score += this.sumIndexes(current) + next.first;
      }
      // Check if roll is NORMAL
      else {
        score += this.sumIndexes(current);
      }
      // }

      // else {
      //   // Check if roll is STRIKE
      //   if (this.isStrike(current)) {
      //     score += this.sumIndexes(next) + current.first + current.second + (current.third != undefined ? current.third : 0);
      //   }
      //   // Check if roll is SPARE
      //   else if (this.isSpare(current)) {
      //     score += current.first + current.second + (current.third != undefined ? current.third : 0) + next.first;
      //   }
      //   // Check if roll is NORMAL
      //   else {
      //     score += this.sumIndexes(current);
      //   }
      // }

    }
    return score;
  }

  // Check if the roll is STRIKE
  isStrike(roll: Roll): boolean {
    return roll.first === 10;
  }

  // Check if the roll is SPARE
  isSpare(roll: Roll): boolean {
    return (roll.first + roll.second) === 10;
  }

  isOpen(roll: Roll): boolean {
    return roll.first + roll.second < 10;
  }

  // get total of given roll as integer
  private sumIndexes(roll: Roll): number {
    return roll.first + roll.second;
  }

  // set roll object fields to 0. This is for handling undefined or null value.
  private checkNext(val: Roll): Roll {
    return val == undefined ? {first: 0, second: 0} : val
  }
}
