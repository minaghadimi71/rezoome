import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {BsModalService} from "ngx-bootstrap";
import {ModalComponent} from "../../shared/modale/modal.component";
import {FormCandeactivateComponent} from "../../services/form-candeactivate-guard.service";
import {QuizService} from "../../services/quiz.service";

export class Quiz {
  name: string;
  surname: string;
  address: {
    country: string,
    city: string,
  };
  gender: string
  question: string
  responses: string[]
  number: number;
  id?: string;
  row?: number;
}

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit, FormCandeactivateComponent {
  @ViewChild('ngFormQuiz', {static: false}) ngFormQuiz: NgForm;
  addQuizForm: FormGroup;
  disable: boolean = false;
  color = 'green';
  forbiddenName = ['mina', 'asal'];
  genders = ['men', 'women'];
  rowNumber: number;

  constructor(public router: Router,
              public fb: FormBuilder,
              public modalService: BsModalService,
              public quizService: QuizService) {
    this.setFormData();
  }

  ngOnInit() {
    this.quizService.getQuiz().subscribe(
      res => {
        this.rowNumber = res.length;
      }
    )
  }

  haveError(control: string, form: FormGroup, i?: number) {
    if (i >= 0) {
      return (form.get(control) as FormArray).controls[i].invalid &&
        ((form.get(control) as FormArray).controls[i].dirty ||
          (form.get(control) as FormArray).controls[i].touched);
    }
    return form.get(control).invalid && (form.get(control).dirty || form.get(control).touched);
  }

  errorMessage(control: string, form: FormGroup, i?: number) {
    if (i >= 0) {
      return (form.get(control) as FormArray).controls[i].errors;
    }
    return form.get(control).errors;
  }

  forbiddenQuestion(name: FormControl): Observable<any> | Promise<any> {
    const promise = new Promise<any>((resole, reject) => {
      setTimeout(() => {
          if (name.value === 'what time is it?') {
            resole({forbiddenQuestion: true});
          }
          resole(null);
        }
        , 5000);
    });
    return promise;
  }

  setFormData() {
    this.addQuizForm = this.fb.group({
        name: ['', [Validators.required, this.forbidden.bind(this)]],
        surname: ['', Validators.required, this.forbiddenSurname],
        address: this.fb.group({
          country: ['', Validators.required],
          city: ['', Validators.required],
        }),
        gender: [],
        question: ['', Validators.required, this.forbiddenQuestion],
        responses: this.fb.array([]),
        number: ['', Validators.required],
        row: ['']

      }
    )
  }

  forbidden(name: FormControl): { [name: string]: boolean } {
    if (this.forbiddenName.indexOf(name.value) !== -1) {
      return {forbiddenName: true};
    } else {
      return null;
    }
  }

  forbiddenSurname(name: FormControl): Observable<any> | Promise<any> {
    const promise = new Promise<any>((resole, reject) => {
      setTimeout(() => {
          if (name.value === 'ghadimi') {
            resole({forbiddenSurname: true});
          }
          resole(null);
        }
        , 5000);
    });
    return promise;

  }

  addResponse() {
    if ((this.addQuizForm.get('responses') as FormArray).length <= 6) {
      const response = this.fb.control('', Validators.required);
      (this.addQuizForm.get('responses') as FormArray).push(response);
      if ((this.addQuizForm.get('responses') as FormArray).length === 6) {
        this.disable = true;
      }
      return;
    }
    return;
  }

  get responses() {
    return this.addQuizForm.get('responses') as FormArray;
  }

  removeResponse(i) {
    this.disable = false;
    this.responses.controls.splice(i, 1);
    this.responses.value.splice(i, 1);
  }

  onSubmitted() {
    this.addQuizForm.patchValue({
        row : this.rowNumber
    })
    this.quizService.addQuiz(this.addQuizForm.value).subscribe(
      res => {
        this.router.navigate(['./dashboard'])
      }
    )
  }

  canDeactivate() {
    if (this.addQuizForm.dirty && !this.ngFormQuiz.submitted) {
      const subject = new Subject<boolean>();
      const modal = this.modalService.show(ModalComponent);
      modal.content.title = 'CanDeactivate modal';
      modal.content.message = 'are you sure?';
      modal.content.yesButton = 'Yes';
      modal.content.noButton = 'No';
      modal.content.subject = subject;
      return subject.asObservable();
    }
    return true;
  }

}

