import {Roll} from './store/bowling-page.reducer';

export class BlowingCalculator {

  /**
   * returns total scores along with scores in each frame
   * @param frames, list of roll to calculate scores from
   * @param isBonus, flag to check for bonus roll
   */
  calculate(frames: Roll[]): { totalScore: number, frameScores: number[] } {
    let totalScore = 0;
    const frameScores: number[] = [];
    for (let i = 0; i < frames.length; i++) {
      const current: Roll = frames[i];
      const next: Roll = this.checkNext(frames[i + 1]);

      if (i < 9) { // if not last frame, do standard calculation without bonus
        if (this.isStrike(current)) {
          frameScores.push(this.getStrikeScore(current, next));
          totalScore += this.getStrikeScore(current, next);

        } else if (this.isSpare(current)) {
          frameScores.push(this.getSpareScore(current, next));
          totalScore += this.getSpareScore(current, next);
        } else {
          frameScores.push(this.sumIndexes(current));
          totalScore += this.sumIndexes(current);
        }
      } else { // calculate bonus for final frame
        frameScores.push(current.first + current.second + (current.third ? current.third : 0));
        totalScore += current.first + current.second + (current.third ? current.third : 0);
      }
    }
    return {
      totalScore,
      frameScores
    };
  }

  /**
   * check if the roll is STRIKE
   */
  isStrike(roll: Roll): boolean {
    return roll.first === 10;
  }

  /**
   * check if the roll is SPARE
   */
  isSpare(roll: Roll): boolean {
    return (roll.first + roll.second) === 10;
  }

  /**
   * check if the roll is opem
   */
  isOpen(roll: Roll): boolean {
    return roll.first + roll.second < 10;
  }

  /**
   * get total of given roll as integer
   */
  private sumIndexes(roll: Roll): number {
    return roll.first + roll.second;
  }

  /**
   * set the fields of roll object to 0. This is for handling undefined or null value.
   */
  private checkNext(val: Roll): Roll {
    return val === undefined ? {first: 0, second: 0} : val;
  }

  private getStrikeScore(current: Roll, next: Roll) {
    return this.sumIndexes(next) + current.first;
  }

  private getSpareScore(current: Roll, next: Roll) {
    return this.sumIndexes(current) + next.first;
  }
}
