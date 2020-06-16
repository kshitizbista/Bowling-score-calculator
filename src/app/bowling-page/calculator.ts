import {Roll} from "./store/bowling-page.reducer";

export class Calculator {

  // Calculates the score and store the value
  calculate(frames: Roll[], isBonus = false): { totalScore: number, frameScores: number[] } {
    let totalScore: number = 0;
    let frameScores: number[] = [];
    for (let i = 0; i < frames.length; i++) {
      const current: Roll = frames[i];
      const next: Roll = this.checkNext(frames[i + 1]);

      // if (!isBonus) {
      // Check if roll is STRIKE
      if (this.isStrike(current)) {
        frameScores.push(this.getStrikeScore(current, next));
        totalScore += this.getStrikeScore(current, next);

      }
      // Check if roll is SPARE
      else if (this.isSpare(current)) {
        frameScores.push(this.getSpareScore(current, next));
        totalScore += this.getSpareScore(current, next);
      }
      // Check if roll is NORMAL
      else {
        frameScores.push(this.sumIndexes(current));
        totalScore += this.sumIndexes(current);
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
    return {
      totalScore,
      frameScores: frameScores
    };
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

  private getStrikeScore(current: Roll, next: Roll) {
    return this.sumIndexes(next) + current.first;
  }

  private getSpareScore(current: Roll, next: Roll) {
    return this.sumIndexes(current) + next.first
  }
}
