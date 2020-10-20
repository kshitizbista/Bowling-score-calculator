import {Pipe, PipeTransform} from '@angular/core';
import {Roll} from '../store/bowling-page.reducer';

export interface ScoreBoard {
  frameNumber: number;
  roll: number;
  pinsHit: number;
  totalScore: number;
}

@Pipe({
  name: 'frameFormat'
})
export class FrameFormatPipe implements PipeTransform {

  transform(value: Roll[], score: number[]): ScoreBoard[] {
    const formattedValues: ScoreBoard[] = [];

    value.forEach((rolls, index) => {
      const frameNumber = index + 1;
      const totalScore = null;
      if (rolls.first != null) {
        formattedValues.push({frameNumber, roll: 1, pinsHit: rolls.first, totalScore});
      }
      if (rolls.second != null && rolls.third == null) {
        formattedValues.push({frameNumber, roll: 2, pinsHit: rolls.second, totalScore: score[index]});
      } else {
        formattedValues.push({frameNumber, roll: 2, pinsHit: rolls.second, totalScore});
        formattedValues.push({frameNumber, roll: 3, pinsHit: rolls.third, totalScore: score[index]});
      }
    });
    return formattedValues;
  }
}
