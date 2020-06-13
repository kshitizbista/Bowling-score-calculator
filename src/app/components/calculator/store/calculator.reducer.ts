import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import * as CalculatorAction from "./calculator.action";

export const calculatorFeatureKey = 'game';

export const calculatorFeatureSelector = createFeatureSelector<Frame>(calculatorFeatureKey);

export interface Roll {
  first: number;
  second: number
}

export interface Frame {
  // totalScore: number;
  frames: Roll[];
  // maxFrames: number;
  // maxRoll: number;
  // pins: number;
}

const initialState: Frame = {
  frames: []
};

export const calculatorReducer = createReducer(initialState,
  on(CalculatorAction.storeRoll, (state, roll) => ({...state, frames: [...state.frames, roll]}))
)
