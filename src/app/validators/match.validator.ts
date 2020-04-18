import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appPassValidator]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: PassValidatorDirective, multi: true}
  ]
})
export class PassValidatorDirective implements Validator {
  @Input() password: string;
  validate(control: AbstractControl): ValidationErrors | null {
    if ((control.value && !control.value.length ) ||
      control.value === this.password) {
      return null;
    } else {
      return { appPassValidator: true };
    }
  }

}
