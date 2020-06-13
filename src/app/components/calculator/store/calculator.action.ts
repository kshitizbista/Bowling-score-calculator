import {createAction, props} from "@ngrx/store";
import {Roll} from "./calculator.reducer";

export const storeRoll = createAction('[10 Pin Bowling] Store Roll', props<{ roll: Roll }>());

