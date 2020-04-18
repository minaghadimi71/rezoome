import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {take} from "rxjs/operators";
import {Router} from "@angular/router";
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-lock-page',
  templateUrl: './lock-page.component.html',
  styleUrls: ['./lock-page.component.scss']
})
export class LockPageComponent implements OnDestroy {
  password: string;
  email: string;
  @ViewChild('loginFinishedForm', {static: false}) loginFinishedForm: NgForm;
  @Output() closeLogin = new EventEmitter();
  @Output() closeLogOut = new EventEmitter();
  copyEmail: string;
  logOut() {
    this.closeLogOut.emit();
    this.router.navigate(['/login']);
  }
  logIn() {
    this.helperService.showLoading();
    this.password = this.loginFinishedForm.value.password;
    this.authService.login(this.copyEmail, this.password).subscribe(respon => {
      this.helperService.hideLoading();
      this.closeLogin.emit();
    }, (errorMessage) => {
      this.helperService.hideLoading();
    });
  }
  constructor(private authService: AuthService,
              private helperService: HelperService,
              private router: Router) {
    new Promise((resolve, reject) => {
      this.authService.user.pipe(take(1)).subscribe(user => {
        if (!!user) {
          this.email = user.email;
          resolve(this.email);
        }
      });
    }).then((response) => {
      this.copyEmail = this.email;
    });
  }
  ngOnDestroy(): void {
  }
}
