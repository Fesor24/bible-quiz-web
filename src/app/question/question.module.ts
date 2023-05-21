import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    QuestionComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class QuestionModule { }
