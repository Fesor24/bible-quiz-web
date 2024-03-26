import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionRoutingModule } from './section-routing.module';
import { SectionComponent } from './section.component';
import { AuthorQuestionsComponent } from './author-questions/author-questions.component';
import { RevisionQuestionsComponent } from './revision-questions/revision-questions.component';
import { BiblequizzesQuestionsComponent } from './biblequizzes-questions/biblequizzes-questions.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ObjectiveQuestionsComponent } from './objective-questions/objective-questions.component';

@NgModule({
  declarations: [
    SectionComponent,
    AuthorQuestionsComponent,
    RevisionQuestionsComponent,
    BiblequizzesQuestionsComponent,
    ObjectiveQuestionsComponent,
  ],
  imports: [CommonModule, SectionRoutingModule, CoreModule, SharedModule],
})
export class SectionModule {}
