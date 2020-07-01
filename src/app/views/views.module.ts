import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [HomeComponent, AboutComponent],
  imports: [
    SharedModule
  ]
})
export class ViewsModule { }
