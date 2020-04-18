import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {EmailUniqueValidator} from "../../validators/email-unique.validator";
import {MustMatch} from "../../validators/must-match.validator";
import {delay, exhaustMap, map, mergeMap, switchMap, take} from "rxjs/operators";
import {interval, merge, of} from "rxjs";

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(public fb: FormBuilder,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.setValueForm();
  }

  setValueForm() {
    this.registerForm = this.fb.group({
      email: this.fb.control('',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [EmailUniqueValidator.createValidator(this.authService)],
          updateOn: 'blur'
        },
      ),
      confirmEmail: this.fb.control('', [Validators.email, Validators.required]),
      password: this.fb.control('', [Validators.required]),
      confirmPassword: this.fb.control('', [Validators.required]),

    }, {
      validators: [MustMatch('email', 'confirmEmail'),
      MustMatch('password', 'confirmPassword')],
    })
  }

  getFeedBack(control, form) {
    return form.get(control).invalid && (form.get(control).touched || form.get(control).dirty);
  }

  getInputErrors(control, form) {
    return form.get(control).errors;
  }

  register() {
    this.authService.register(this.registerForm.get('email').value,
      this.registerForm.get('password').value).pipe(
      mergeMap(
        (event) => {
         return this.authService.postEmail(this.registerForm.get('email').value).pipe(
           map(response => {
             return response + '' +event;
           })
          )
        })
  ).subscribe(
    res => {
      this.registerForm.reset();
    },
      error => {
      console.log('error');
      }
    )
  }
}
