import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { QuestionComponent } from './question/question.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input/text-input.component';
import { ScriptureComponent } from './scripture/scripture.component';
import { AccordionComponent } from './accordion/accordion.component';



@NgModule({
  declarations: [CardComponent, InstructionsComponent, QuestionComponent, TextInputComponent, ScriptureComponent, AccordionComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    CardComponent,
    InstructionsComponent,
    QuestionComponent,
    ReactiveFormsModule,
    TextInputComponent,
    ScriptureComponent,
    AccordionComponent
  ],
})
export class SharedModule { }
