import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'show-errors',
  template: `
    <span *ngIf='shouldShowErrors()' class='validation-errors help-block' >
     {{getError()}}
    </span>
  `,
})
export class ShowErrorsComponent {

  private static readonly errorMessages = {
    'required': (params) => '##FIELD## can\'t be blank',
    'validDuplicate': (params) => '##FIELD## cannot be duplicated',
    'validateEmpty': (params) => '##FIELD## cannot have empty values',
    'validateBackGroundCount': (params) => 'Only 3 ##FIELD##  allowed',
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field], this.control));
  }
  getError(): string {
    let errors = Object.keys(this.control.errors)
     .map(field => this.getMessage(field, this.control.errors[field], this.control));
    return errors[0];
 }
  private getMessage(type: string, params: any, control: any) {
    let fname = this.getControlName(control);
    fname = (fname == 'is_recurring_enabled' ? 'donation_type' : fname);
    fname = fname.replace('_', ' ');
    fname = fname.replace(' ids', ' ');
    fname = fname.replace(' id', '').toLowerCase();
    fname = fname.replace(/\b\w/g, l => l.toUpperCase());
    const msg = ShowErrorsComponent.errorMessages[type](params);
    return msg.replace('##FIELD##', fname);
  }
  getControlName(c: AbstractControl): string | null {
      const formGroup = c.parent.controls;
      return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }
}
