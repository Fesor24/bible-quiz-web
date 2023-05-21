import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { InstructionsComponent } from './instructions/instructions.component';



@NgModule({
  declarations: [CardComponent, InstructionsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    InstructionsComponent
  ],
})
export class SharedModule { }
