import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionComponent } from './section.component';
import { FesorQuestionsComponent } from './fesor-questions/fesor-questions.component';
import { BiblequizzesQuestionsComponent } from './biblequizzes-questions/biblequizzes-questions.component';
import { RevisionQuestionsComponent } from './revision-questions/revision-questions.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SectionComponent },
      { path: 'fesor', component: FesorQuestionsComponent },
      {
        path: 'biblequizzes',
        component: BiblequizzesQuestionsComponent,
      },
      { path: 'revision', component: RevisionQuestionsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionRoutingModule { }
