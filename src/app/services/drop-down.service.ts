import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DragItems} from "../component/shopping/shopping.component";
import {environment} from "../models/enviroment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DropDownService {

  constructor(public http: HttpClient) {
  }

  saveDragItems(dragItems: DragItems[]): Observable<{[name: string]: string}> {
    return this.http.put<{[name: string]: string}>
    (environment.url + 'drags.json', dragItems);
  }

  getDragItems(): Observable<any> {
    return this.http.get<any>
    (environment.url + 'drags.json').pipe(
      map(response => {
          const responsive = [];
          for (const key in response) {
            responsive.push({...response[key]});
          }
          return responsive;
        }
      ));
  }
  postItems(items) {
      return this.http.post<any>
      (environment.url + 'drags.json', items);
    }
}
