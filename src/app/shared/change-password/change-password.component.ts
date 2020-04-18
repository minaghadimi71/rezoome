import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  @Output() close = new EventEmitter<void>();
  @ViewChild('passwordForm', {static: false}) passwordForm: NgForm;

  constructor(private authService: AuthService,
              private helperService: HelperService) {
  }

  closeModal() {
    this.close.emit();
  }

  changePassword() {
    this.authService.changePassword(this.passwordForm.value.password).subscribe(
      (res) => {
        this.helperService.showToast('Succeed', 'password is changed', 'succeed', false);
        this.closeModal();
      },
      (errorMessage) => {
        this.closeModal();
        this.helperService.showToast('Error', 'password is not changed', 'error', false);

      }
    )
    ;
  }

}
