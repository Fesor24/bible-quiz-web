import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionRoutingModule } from './section-routing.module';
import { SectionComponent } from './section.component';
import { FesorQuestionsComponent } from './fesor-questions/fesor-questions.component';
import { RevisionQuestionsComponent } from './revision-questions/revision-questions.component';
import { BiblequizzesQuestionsComponent } from './biblequizzes-questions/biblequizzes-questions.component';


@NgModule({
  declarations: [
    SectionComponent,
    FesorQuestionsComponent,
    RevisionQuestionsComponent,
    BiblequizzesQuestionsComponent
  ],
  imports: [
    CommonModule,
    SectionRoutingModule
  ]
})
export class SectionModule { }
