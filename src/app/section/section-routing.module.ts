import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionComponent } from './section.component';
import { AuthorQuestionsComponent } from './author-questions/author-questions.component';
import { BiblequizzesQuestionsComponent } from './biblequizzes-questions/biblequizzes-questions.component';
import { RevisionQuestionsComponent } from './revision-questions/revision-questions.component';
import { authGuard } from '../core/guards/auth.guard';
import { ObjectiveQuestionsComponent } from './objective-questions/objective-questions.component';

const routes: Routes = [
  { path: '', component: SectionComponent },
  {
    path: 'author',
    // canActivate: [authGuard],
    component: AuthorQuestionsComponent,
  },
  {
    path: 'biblequizzes',
    // canActivate: [authGuard],
    component: BiblequizzesQuestionsComponent,
  },
  {path: 'objectives', component: ObjectiveQuestionsComponent},
  { path: 'saved', component: RevisionQuestionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectionRoutingModule {}
