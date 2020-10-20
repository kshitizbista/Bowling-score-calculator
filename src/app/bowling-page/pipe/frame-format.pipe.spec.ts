import {FrameFormatPipe, ScoreBoard} from './frame-format.pipe';
import {Roll} from '../store/bowling-page.reducer';
import {async} from '@angular/core/testing';

describe('FrameFormatPipe', () => {

  let pipe: FrameFormatPipe;

  beforeEach(async(() => {
    pipe = new FrameFormatPipe();
  }));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform array of roll object to array of score board object with given frame scores array as arguments',
    () => {
      const rolls: Roll[] = [{first: 9, second: 1}, {first: 2, second: 2}, {first: 7, second: 3}];
      const framesScore: number[] = [12, 4, 10];
      const expectedValue: ScoreBoard[] = [
        {frameNumber: 1, roll: 1, pinsHit: 9, totalScore: null},
        {frameNumber: 1, roll: 2, pinsHit: 1, totalScore: 12},
        {frameNumber: 2, roll: 1, pinsHit: 2, totalScore: null},
        {frameNumber: 2, roll: 2, pinsHit: 2, totalScore: 4},
        {frameNumber: 3, roll: 1, pinsHit: 7, totalScore: null},
        {frameNumber: 3, roll: 2, pinsHit: 3, totalScore: 10},
      ];
      expect(pipe.transform(rolls, framesScore)).toEqual(expectedValue);
    }
  );

  it('should not return incorrect score board object',
    () => {
      const formatPipe = new FrameFormatPipe();
      const rolls: Roll[] = [{first: 5, second: 5}];
      const framesScore: number[] = [10];
      const expectedValue: ScoreBoard[] = [
        {frameNumber: 1, roll: 1, pinsHit: 5, totalScore: 0},
        {frameNumber: 1, roll: 2, pinsHit: 5, totalScore: 12},
      ];
      expect(formatPipe.transform(rolls, framesScore)).not.toEqual(expectedValue);
    }
  );
});
