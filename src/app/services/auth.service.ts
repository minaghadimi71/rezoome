import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {environment} from "../models/enviroment";
import {catchError, map, tap} from "rxjs/operators";
import {User} from "../models/user";
import {Router} from "@angular/router";
export interface AuthData {
  kind: string,
  localId: string,
  email: string,
  displayName: string,
  idToken: string,
  registered?: boolean,
  refreshToken: string,
  expiresIn: string,
}
@Injectable({
  providedIn: "root"
})
export class AuthService {
  public urlParam = new HttpParams();
  public user = new BehaviorSubject<User>(null);
  constructor(public http: HttpClient,
              public route: Router) {
    this.urlParam = this.urlParam.append('key', 'AIzaSyAhJpgSBVqLlcLfBm9Y7nhVq02Go3G5EN8');
  }
  login(emailInput: string, passwordInput: string): Observable<AuthData> {
    return this.http.post<AuthData>(environment.apiUrl + 'signInWithPassword?' + this.urlParam, {
      email: emailInput,
      password: passwordInput,
      returnSecureToken: true
    }).pipe(catchError(this.handelError),
      tap(
        response => {
          this.handelAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
        }
      )
    );
  }
  register(emailInput: string, passwordInput: string): Observable<AuthData> {
    return this.http.post<AuthData>(environment.apiUrl + 'signUp?' + this.urlParam, {
      email: emailInput,
      password: passwordInput,
      returnSecureToken: true
    }).pipe(catchError(this.handelError),
      tap(
        response => {
          this.handelAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
        }
      )
    );
  }
  handelAuthentication(email: string, localId: string, response: string, expiresIn: number) {
    const expireDate = new Date(new Date().getTime() + expiresIn * 1000)
    const userData = new User(email, +localId, response, expireDate);
    this.user.next(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    this.handelAutoLogout(expiresIn * 1000);
  }
  handelAutoLogout(expiresIn: number) {
    setInterval(() => {
      this.logOut();
      this.route.navigate(['/login']);
    }, expiresIn)
  }
  logOut() {
    this.user.next(null);
    localStorage.clear();
  }
  handelAutoLogIn() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _expireDate: string,
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const user = new User(
      userData.email,
      +userData.id,
      userData._token,
      new Date(userData._expireDate));
    if (user.token) {
      this.user.next(user);
      const expireTime = new Date(userData._expireDate).getTime() - new Date().getTime();
      this.handelAutoLogout(expireTime);
    }
  }

  handelError(error: HttpErrorResponse) {
    let errorMessage = 'undefined error';
    if (!error.error || !error.error.error) {
      return throwError(errorMessage);
    }
    switch (error.error.error.message) {
      case 'EMAIL_NOT_FOUND' :
        errorMessage = 'email or password is not valid';
        break;
      case 'EMAIL_EXISTS' :
        errorMessage = 'email is exist';
        break;
      case 'INVALID_PASSWORD' :
        errorMessage = 'password is incorrect';
        break;
    }
    return throwError(errorMessage);
  }

  changePassword(newPass) {
    let token: string;
    token = JSON.parse(localStorage.getItem('userData'))._token;
    return this.http.post<AuthData>(environment.apiUrl + 'update?' + this.urlParam,
      {
        idToken: token,
        password: newPass,
        returnSecureToken: true,
      }).pipe(tap(res => {
        this.handelAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
      }
    ));
  }

  resetPassword(email: string) {
    return this.http.post(environment.apiUrl + 'sendOobCode?' + this.urlParam,
      {
        requestType: 'PASSWORD_RESET',
        email: email,
      });

  }

  getAllEmail(emailInput: string) {
    return this.http.get(environment.url + 'email.json').pipe(
      map((response) => {
          for (const key in response) {
           if (response[key].email === emailInput) {
             return true;
           }
          }
          return false;
        }
      )
    );
  }
  postEmail(email: string): Observable<{[name: string]: string}> {
    return this.http.post<{[key: string]: string}>(environment.url + 'email.json', {email});
  }

}
