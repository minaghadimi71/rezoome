import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  allPage = new BehaviorSubject<number>(0);
}
