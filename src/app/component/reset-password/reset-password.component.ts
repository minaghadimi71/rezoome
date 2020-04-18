import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  @ViewChild('resetPassword', {static: false}) resetPassword: NgForm;
  constructor(public authService: AuthService,
              private route: Router,
              private helperService: HelperService) {
  }
  resetPass() {
    this.authService.resetPassword(this.resetPassword.value.email).subscribe(
      res => {
        this.helperService.showToast('Succeed', 'email is send', 'succeed', true);
        this.route.navigate(['./login']);
      },
      error => {
        this.helperService.showToast('Error', 'email is not send', 'error', true);
      }
    );
  }
  backToAuth() {
    this.route.navigate(['./auth']);
  }
}
