import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlesDetailComponent } from './articles-detail/articles-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
const routes: Routes = [
  { path: '', redirectTo: '/article', pathMatch: 'full' },
  { path: 'article/create', component: ArticleCreateComponent },
  { path: 'article', component: ArticlesComponent},
  { path: 'article/edit/:id', component: ArticleEditComponent, canActivate: [AuthGuardGuard],},
  { path: 'article/:id', component: ArticlesDetailComponent},
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404'},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
