import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { QuestionComponent } from './question/question.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CardComponent, InstructionsComponent, QuestionComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CardComponent,
    InstructionsComponent
  ],
})
export class SharedModule { }
