import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'section', loadChildren: ()=> import("./section/section.module").then(mod => mod.SectionModule) },
  {path:'account', loadChildren: ()=> import("./account/account.module").then(mod => mod.AccountModule)},
  {path: 'verse', loadChildren: ()=> import("./verse/verse.module").then(mod => mod.VerseModule)},
  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
