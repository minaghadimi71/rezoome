import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import validate = WebAssembly.validate;
import {AuthService} from "../../services/auth.service";
import {Route, Router} from "@angular/router";
import {HelperService} from "../../services/helper.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public loginForm: FormGroup;
  constructor(public fb: FormBuilder,
              public authService: AuthService,
              public router: Router,
              private helperService: HelperService) {
  }
  ngOnInit(): void {
    this.setValueForm();
  }
  setValueForm(){
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.email, Validators.required]),
      password: this.fb.control('',[Validators.required] )
    })
  }
  getFeedBack(control, form){
    return form.get(control).invalid && (form.get(control).touched || form.get(control).dirty);
  }
  getInputErrors(control, form) {
    return form.get(control).errors;
  }

  login() {
    this.helperService.showLoading();
    this.authService.login(this.loginForm.get('email').value,
      this.loginForm.get('password').value).subscribe(response => {
       this.loginForm.reset();
       this.helperService.hideLoading();
        this.helperService.showToast('Succeed', 'login is succeed', 'succeed', true);
       this.router.navigate(['./dashboard']);
    },
      error => {
        this.helperService.hideLoading();
        this.helperService.showToast('Error', error, 'error', true);
      }
      )
  }

}
