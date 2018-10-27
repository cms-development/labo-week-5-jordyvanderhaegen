import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiEndPointOauth = `${environment.drupalApi.url}${environment.drupalApi.endPoints.oauth.url}${environment.drupalApi.endPoints.oauth.type.token}`;
  
  constructor(private _httpClient: HttpClient) { }

  postLogin(username, password) {
    let formData = new FormData();
    let postData = {
      grant_type: 'password',
      client_id: 'f88f5145-c49d-42e7-a8bd-8d6caacb1ed5',
      client_secret: 'wickedman',
      username: username,
      password: password,
    }
    for(let key in postData) {
      formData.append(key, postData[key]);
    }
    return this._httpClient.post<any>(this._apiEndPointOauth, formData);
  }

  getToken(): string {
    return localStorage.getItem('access_token');
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
