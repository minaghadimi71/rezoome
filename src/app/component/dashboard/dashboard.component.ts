import {Component} from "@angular/core";
import {QuizService} from "../../services/quiz.service";
import {PageData} from "../../shared/dynamic-paginator/dynamic-paginator";
import {HelperService} from "../../services/helper.service";
import {PaginationService} from "../../shared/dynamic-paginator/painationService";
import {Quiz} from "../add-quiz/add-quiz.component";
import * as _ from 'lodash';
@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  searchParam: string = '';
  quizs: Quiz[] = [];
  pageNumbers: number[] = [5, 10, 15];
  sortable: string = 'name';
  copyData: PageData;
  quiz: Quiz;
  constructor(public quizService: QuizService,
              public helperService: HelperService,
              public paginationService: PaginationService) {
  }

  getQuiz(event: PageData) {
    this.copyData = event;
    this.helperService.showLoading();
    this.quizService.getQuiz(event).subscribe(response => {
        this.paginationService.allPage.next(response.length);
        this.helperService.hideLoading();
        this.quizs = [];
        response.forEach(
          res => {
            this.quizs.push(res);
          }
        );
      },
      errorResponse => {
        this.helperService.hideLoading();
      });
  }
  deleteQuiz(id : string) {
    const quiz = _.find(this.quizs, (item) => item.id === id);
    this.quizService.deleteQuiz(id).subscribe(
      res => {
        const promise = new Promise(resolve => {
          let i = 0;
          this.quizs.forEach(itemPo => {
            if (itemPo.row > quiz.row) {
              itemPo.row = itemPo.row - 1;
              this.quizService.putQuiz(itemPo.id, itemPo).subscribe(
                respon => {
                  i++;
                  if (i === this.quizs.length) {
                    resolve(true);
                  }
                }
              );
            } else {
              i++;
              if (i === this.quizs.length) {
                resolve(true);
              }
            }
          });
        });
        promise.then(
          (respon) => {
            this.getQuiz(this.copyData);
            this.helperService.showToast('Succeed', 'Post deleted', 'succeed', false);
          }
        );
      }, errorResponse => {
        this.helperService.showToast('Error', errorResponse, 'error', false);
      }
    );

}
  changeSort() {
    this.getQuiz({page: 1 + '', perPage: 5 + '', sort: this.sortable});
  }
  dragEnd($event, quizItem) {
    this.quiz = quizItem;
  }

  dropItem($event, item) {
    if (this.quiz.row < item && this.quiz.row !== item - 1) {
      this.quizs.map(itemPost => {
        if (itemPost.row < item && itemPost.row > this.quiz.row) {
          itemPost.row = itemPost.row - 1;
        }
        if (itemPost.row === item && itemPost.id !== this.quiz.id) {
          itemPost.row = itemPost.row - 1;
        }
      });
      this.quiz.row = item;
    } else if (this.quiz.row < item && this.quiz.row === item - 1) {
      this.quiz.row = item;
      this.quizs.map(itemPost => {
        if (itemPost.row === item && itemPost.id !== this.quiz.id) {
          itemPost.row = itemPost.row - 1;
        }
      });
    } else if (this.quiz.row > item && this.quiz.row !== item + 1) {
      this.quizs.map(itemPost => {
        if (itemPost.row > item && itemPost.row < this.quiz.row) {
          itemPost.row = itemPost.row + 1;
        }
        if (itemPost.row === item && itemPost.id !== this.quiz.id) {
          itemPost.row = itemPost.row + 1;
        }
      });
      this.quiz.row = item;
    } else if (this.quiz.row > item && this.quiz.row === item + 1) {
      this.quiz.row = item;
      this.quizs.map(itemPost => {
        if (itemPost.row === item && itemPost.id !== this.quiz.id) {
          itemPost.row = itemPost.row + 1;
        }
      });
    }
    this.quizs.forEach(postItem => {
      this.quizService.putQuiz(postItem.id, postItem).subscribe(
        res => {
        }
      );
    });
  }

  calculateTop(post) {
    return (((post.row) * 55) + 177) + 'px';
  }

  calculateZ(post) {
    if (this.quiz && post.id === this.quiz.id) {
      return 999999;
    } else {
      return 9;
    }
  }

}
