import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {bowlingPageFeatureKey, bowlingPageReducer} from "./store/bowling-page.reducer";
import {BowlingPageComponent} from "./bowling-page.component";
import {PinComponent} from "./pin/pin.component";
import { ScoreBoardComponent } from './score-board/score-board.component';
import { FrameFormatPipe } from './pipe/frame-format.pipe';

@NgModule({
  declarations: [
    BowlingPageComponent,
    PinComponent,
    ScoreBoardComponent,
    FrameFormatPipe,
  ],
  exports: [
    BowlingPageComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(bowlingPageFeatureKey, bowlingPageReducer)
  ]
})
export class BowlingPageModule {
}
