import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
export interface ToastData {
  head: string;
  body: string;
  color: string;
  class: boolean;
}

@Injectable({
  providedIn: "root"
})
export class HelperService {
  private _eventLoading: Subject<boolean>;
  private _eventToast: Subject<ToastData>;

  constructor() {
    this._eventLoading = new Subject<boolean>();
    this._eventToast = new Subject<ToastData>();
  }
  showLoading() {
    this._eventLoading.next(true);
  }
  hideLoading() {
    this._eventLoading.next(false);
  }
  onLoading<T>(): Observable<boolean> {
    return this._eventLoading.asObservable();
  }
  showToast(headData: string, bodyData: string, colorData: string, classData: boolean) {
    this._eventToast.next({head: headData, body: bodyData, color: colorData, class: classData });
  }

  hideToast() {
    this._eventToast.next(null);
  }
  onToast<T>(): Observable<ToastData> {
    return this._eventToast.asObservable();
  }

}
