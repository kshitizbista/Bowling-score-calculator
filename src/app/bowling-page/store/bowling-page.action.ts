import {createAction, props} from '@ngrx/store';
import {Roll} from './bowling-page.reducer';

export const storeRoll = createAction('[Bowling Page] Store Roll', props<{ roll: Roll }>());
export const resetGame = createAction('[Bowling Page] Reset Game');

