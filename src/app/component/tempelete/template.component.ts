import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Route, Router} from '@angular/router';

export class UserData {
  inputSteps: number;
  number: number;
  userData: { email: string, pwd: string };
  remember: boolean;
  gender: string;
  members: number;
  massage: string;
}

@Component({
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit, AfterViewInit {
  inputNumberStep: number;
  genders = ['male', 'female'];
  states = [1, 2, 3, 4];
  user: UserData = {
    inputSteps: 6,
    number: 6,
    userData: {email: '', pwd: ''},
    remember: false,
    gender: '',
    members: 6,
    massage: ''
  };
  massage = '';
  isShow = false;
  @ViewChild('formTemplate', {static: false}) formTemplate: NgForm;

  constructor(public router: Router,
              public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if(localStorage.getItem('user-data')){
      this.user = JSON.parse(localStorage.getItem('user-data'));
      this.isShow = true;
    }
        }

  ngAfterViewInit(): void {
  }

  setValue() {
    this.formTemplate.setValue({
        inputSteps: 5,
        number: 5,
        userData: {email: 'mina@bugloos.nl', pwd: 'st0pl9ring'},
        remember: true,
        gender: 'male',
        members: 4,
        massage: 'number'
      }
    );
  }

  pathValue() {
    this.formTemplate.form.patchValue({
      userData: {email: 'minaghadimi@bugloos.nl', pwd: '5555555555'},
    });
  }

  // onSubmit(formTemplate) {
  //   console.log(formTemplate);
  // }
  onSubmit() {
    this.isShow = true;
    console.log(this.formTemplate);
    this.user.inputSteps = this.formTemplate.value.inputSteps;
    this.user.number = this.formTemplate.value.number;
    this.user.userData.email = this.formTemplate.value.userData.email;
    this.user.userData.pwd = this.formTemplate.value.userData.pwd;
    this.user.remember = this.formTemplate.value.remember;
    this.user.gender = this.formTemplate.value.gender;
    this.user.members = this.formTemplate.value.members;
    this.user.massage = this.formTemplate.value.massage;
    localStorage.setItem('user-data', JSON.stringify(this.user));
    this.formTemplate.reset();
  }

}
