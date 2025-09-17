import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxTextBoxModule } from 'devextreme-angular';
import { DxValidatorModule } from 'devextreme-angular';

import { DxNumberBoxModule } from 'devextreme-angular';
import { DxDateBoxModule } from 'devextreme-angular';

@Component({
  selector: 'app-user-form',
  imports: [
    DxTextBoxModule,
    ReactiveFormsModule,
    DxValidatorModule,
    DxNumberBoxModule,
    DxDateBoxModule,
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {
  userInfoForm!: FormGroup;

  constructor() {
    this.userInfoForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl(null, [Validators.required, Validators.min(0)]),
      education: new FormControl('', Validators.required),
      nationalID: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
    });
  }

  markAsTouched(controlName: string) {
    this.userInfoForm.get(controlName)?.markAsTouched();
  }

  getError(controlName: string): string | null {
    const control = this.userInfoForm.get(controlName);
    if (!control || !control.touched || control.valid) return null;

    if (control.errors?.['required']) return `${controlName} is required`;
    if (control.errors?.['min'])
      return `${controlName} must be greater than ${control.errors['min'].min}`;
    return null;
  }

  onFormSubmission() {}
}
