import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OAuth } from '../models/oauth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiEndPointOauth = `${environment.drupalApi.url}${environment.drupalApi.endPoints.oauth.url}${environment.drupalApi.endPoints.oauth.type.token}`;
  private _clientId = `${environment.client_id}`
  private _clientSecret = `${environment.client_secret}`
  constructor(private _httpClient: HttpClient) { }

  postLogin(username, password) {
    let postData = {
      grant_type: 'password',
      client_id: this._clientId,
      client_secret: this._clientSecret,
      username: username,
      password: password,
    }
    let formData = this.setAsFormData(postData);
    return this._httpClient.post<OAuth>(this._apiEndPointOauth, formData);
  }

  postRefreshToken(): Observable<OAuth> {
    let postData = {
      grant_type: 'refresh_token',
      client_id: this._clientId,
      client_secret: this._clientSecret,
      refresh_token: this.getRefreshToken()
    }
    let formData = this.setAsFormData(postData)
    return this._httpClient.post<OAuth>(this._apiEndPointOauth, formData);
  }

  deleteAllTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refersh_token');
  }

  setAsFormData(postData: object): FormData {
    let formData = new FormData();
    for(let key in postData) {
      formData.append(key, postData[key])
    }
    return formData;
  }

  setAllTokens(oauth: OAuth): void {
    this.deleteAllTokens();
    localStorage.setItem('access_token', oauth.access_token);
    localStorage.setItem('refresh_token', oauth.refresh_token);
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh_token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
