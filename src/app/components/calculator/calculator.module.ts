import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalculatorComponent} from './calculator.component';
import {StoreModule} from "@ngrx/store";
import {calculatorFeatureKey, calculatorReducer} from "./store/calculator.reducer";

@NgModule({
  declarations: [
    CalculatorComponent
  ],
  exports: [
    CalculatorComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(calculatorFeatureKey, calculatorReducer)
  ]
})
export class CalculatorModule {
}
