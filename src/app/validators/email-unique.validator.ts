import {AbstractControl} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";

export class EmailUniqueValidator {
  static createValidator(authService: AuthService) {
    return (control: AbstractControl) => {
      return authService.getAllEmail(control.value).pipe(
        map(isTaken => (isTaken ? {emailTaken: true} : null)),
        catchError(() => of(null))
      );
    };
  }
}
