import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionComponent } from './section.component';
import { FesorQuestionsComponent } from './fesor-questions/fesor-questions.component';
import { BiblequizzesQuestionsComponent } from './biblequizzes-questions/biblequizzes-questions.component';
import { RevisionQuestionsComponent } from './revision-questions/revision-questions.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SectionComponent },
      { path: 'fesor', canActivate:[AuthGuard],  component: FesorQuestionsComponent },
      {
        path: 'biblequizzes',
        canActivate:[AuthGuard],
        component: BiblequizzesQuestionsComponent,
      },
      { path: 'saved', component: RevisionQuestionsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionRoutingModule { }
