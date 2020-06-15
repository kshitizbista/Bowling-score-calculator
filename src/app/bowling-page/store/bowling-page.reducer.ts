import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import * as BowlingPageAction from "./bowling-page.action";

export const bowlingPageFeatureKey = 'game';

export const bowlingPageFeatureSelector = createFeatureSelector<BowlingState>(bowlingPageFeatureKey);
export const framesSelector = createSelector(bowlingPageFeatureSelector, (s1 => s1.frames));

export class Roll {
  first: number = 0;
  second: number = 0;
  third?: number;
}

export interface Frame {
  roll: Roll;
  score: number;
}

export interface BowlingState {
  totalScore: number;
  frames: Roll[];
}

const initialState: BowlingState = {
  totalScore: 0,
  frames: []
};

export const bowlingPageReducer = createReducer(initialState,
  on(BowlingPageAction.storeRoll, (state, action) => ({...state, frames: [...state.frames, action.roll]})),
  on(BowlingPageAction.resetGame, (state => ({...state, frames: []})))
);
