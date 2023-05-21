import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './shared/question/question.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'section', loadChildren: ()=> import("./section/section.module").then(mod => mod.SectionModule) },
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
