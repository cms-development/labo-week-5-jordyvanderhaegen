import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article';
import { User } from '../models/user';
import { catchError, map, tap } from 'rxjs/operators';
import { DrupalJson } from '../models/drupalJson';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private _httpClient: HttpClient) { }
  private _apiEndPointArticles = `${environment.drupalApi.url}${environment.drupalApi.endPoints.node.url}${environment.drupalApi.endPoints.node.type.article}`;

  getArticles(): Observable<DrupalJson> {
    return this._httpClient.get<DrupalJson>(this._apiEndPointArticles)
      .pipe(
        tap(recipes => console.log('fetched drupal json')),
      );
  }

  getArticle(id: string): Observable<DrupalJson> {
    return this._httpClient.get<DrupalJson>(`${this._apiEndPointArticles}/${id}`)
      .pipe(
        tap(recipes => console.log('fetched drupal json')),
      );
  }

  patchArticle(id: string, body: DrupalJson): Observable<DrupalJson> {
    return this._httpClient.patch<DrupalJson>(`${this._apiEndPointArticles}/${id}`, body)
    .pipe(
      tap(recipes => console.log('fetched updated json'))
    )
  }

  postArticle(body: DrupalJson): Observable<DrupalJson> {
    return this._httpClient.post<DrupalJson>(`${this._apiEndPointArticles}`, body)
    .pipe(
      tap(article => console.log('Succesfully created article'))
    )
  }

  deleteArticle(id: string): Observable<DrupalJson> {
    return this._httpClient.delete<any>(`${this._apiEndPointArticles}/${id}`)
    .pipe(
      tap(e => console.log('Succesfully removed resource'))
    )
  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  createArticleFormGroup(title?: string, body?: string): FormGroup {
    return new FormGroup({
      title: new FormControl(title? title: '', [Validators.required, Validators.minLength(4)]),
      body: new FormControl(body? body: '', [Validators.required, Validators.minLength(10)]),
    });
  }
}
