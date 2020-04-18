import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appCustomNumberValidator]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: CustomNumberValidatorDirective, multi: true}
  ]
})
export class CustomNumberValidatorDirective implements Validator {
  // bara reactive khoob kar nemikonad estefade shode negah kon
  @Input() appNumber: number;
  validate(control: AbstractControl): ValidationErrors | null {
    /* validation rules */
    const remainder = control.value % this.appNumber;

    /* check validation rules */
    if (remainder === 0) {
      return null;
    } else {
      return { appCustomNumberValidator: true };
    }
  }

}
