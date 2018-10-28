import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService, private _router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.setAuthHeader(req);
    return next.handle(req).pipe(
      tap(
        event => event instanceof HttpResponse ? console.log('succeeded') : console.log('idk'),
        err => {
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 404:
                return this._router.navigate(['404']);
              case 401:
                return this.handleUnAuthorizedError(req, next);
              case 403:
                return this.handleUnAuthorizedError(req, next);
            }
          }
        })
    )
  }
  setAuthHeader(req: HttpRequest<any>) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${this._authService.getToken()}`
      }
    });

  }
  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    this._authService.postRefreshToken().subscribe(data => {
      this._authService.setAllTokens(data);
      return next.handle(this.setAuthHeader(req)).subscribe(data => console.log(data));
    }, err => {
      this._authService.deleteAllTokens();
      return this._router.navigate(['login']);
    })
  }
}
