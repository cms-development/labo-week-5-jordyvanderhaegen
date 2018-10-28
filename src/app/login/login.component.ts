import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private _router: Router) { }
  username: String;
  password: String;
  ngOnInit() {
  }

  postLogin() {
    console.log(this.username);
    this.authService.postLogin(this.username,this.password).subscribe(data => {
      this.authService.setAllTokens(data);
      console.log(data);
      this._router.navigate(['article']);
    }, err => console.log(err));
  }

  postLogout(): void {
    localStorage.removeItem('access_token');
    this._router.navigate(['article']);
  }

}
