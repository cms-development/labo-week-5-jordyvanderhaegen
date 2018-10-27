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
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this._authService.getToken()}`
      }
    });
    return next.handle(req).pipe(
      tap(
        event => event instanceof HttpResponse ? console.log('succeeded') : console.log('idk'),
        err => {
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 404:
                return this._router.navigate(['404']);
              case 403:
                return this._router.navigate(['login']);
            }
          }
        }
      )
    )


  }
}
