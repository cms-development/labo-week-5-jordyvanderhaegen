import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ArticlesDetailComponent } from './articles-detail/articles-detail.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { ArticleCreateComponent } from './article-create/article-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ArticlesDetailComponent,
    LoginComponent,
    ArticleEditComponent,
    NotFoundComponent,
    ArticleCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
