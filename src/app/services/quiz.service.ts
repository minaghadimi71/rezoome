import {Injectable} from "@angular/core";
import {catchError, map} from "rxjs/operators";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {environment} from "../models/enviroment";
import {PageData} from "../shared/dynamic-paginator/dynamic-paginator";
import {Quiz} from "../component/add-quiz/add-quiz.component";
import {throwError} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class QuizService {
  constructor(public http: HttpClient) {
  }
  getQuiz(param?: PageData) {
    let pageData = new HttpParams();
    if (param) {
      pageData = pageData.append('page', param.page);
      pageData = pageData.append('per_page', param.perPage);
      pageData = pageData.append('sortBy', param.sort);
    }
    return this.http.get
    (environment.url + 'questions.json', {
      params : pageData,
    }).pipe(
      map(response => {
          const responsive = [];
          for (const key in response) {
            responsive.push({...response[key], id: key});
            // responsive.push(response[key]);
          }
          return responsive;
        }
      ));
  }
  addQuiz(quiz: Quiz) {
    return this.http.post
    (environment.url + 'questions.json', quiz);

  }
  deleteQuiz(id: string) {
    return this.http.delete
    (environment.url + 'questions/' + id + '.json') .pipe(
      catchError(
        this.handelError
      ));
  }
  putQuiz(id: string, quiz: Quiz) {
    return this.http.put<any>
    (environment.url + 'questions/' + id + '.json',
      {
        name: quiz.name,
        surname: quiz.surname,
        address: {
          country: quiz.address.country,
          city: quiz.address.city,
        },
        gender: quiz.gender,
        question: quiz.question,
        number: quiz.number,
        row: quiz.row
      });
  }
  handelError(error: HttpErrorResponse) {
    return throwError(error.error.errors.message);
  }
}
