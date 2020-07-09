import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SliderComponent } from './slider/slider.component';



@NgModule({
  declarations: [SafeHtmlPipe, SliderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    SafeHtmlPipe,
    SliderComponent
  ]
})
export class SharedModule { }
