import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerseComponent } from './verse.component';
import { VerseRoutingModule } from './verse-routing.module';



@NgModule({
  declarations: [
    VerseComponent
  ],
  imports: [
    CommonModule,
    VerseRoutingModule
  ]
})
export class VerseModule { }
