import {Injectable} from '@angular/core';
import {Product} from '../component/wars/ware.component';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from "../models/enviroment";

@Injectable({
  providedIn: 'root',
})
export class WarsService {
  constructor(public http: HttpClient) {
  }

  addWares(ware: Product): Observable<{ [name: string]: string }> {
    return this.http.post<{ [name: string]: string }>
    (environment.url + 'ware.json',
      ware);
  }

  putWares(ware: Product) {
    return this.http.put(environment.url + 'ware/'
      + ware.fakeId + '.json',
      ware);
  }

  getWares(): Observable<Product[]> {
    return this.http.get<{ [key: string]: Product }>
    (environment.url + 'ware.json').pipe(
      map(
        data => {
          const wareData = [];
          for (const key in data) {
            wareData.push({...data[key], fakeId: key});
          }
          return wareData;
        }
      )
    );
  }
}
