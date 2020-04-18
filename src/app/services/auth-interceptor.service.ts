import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {exhaustMap, take} from "rxjs/operators";
import {Injectable} from "@angular/core";
@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private authService: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  return this.authService.user.pipe(take(1), exhaustMap(userData => {
    if(!userData) {
      return next.handle(req);
    }
    const modifiedRequest = req.clone({
      params: new HttpParams().set('auth', userData.token)
    });
    return next.handle(modifiedRequest);
    })
  )
  }

}
