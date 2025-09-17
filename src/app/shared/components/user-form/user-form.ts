import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxTextBoxModule } from 'devextreme-angular';
import { DxValidatorModule } from 'devextreme-angular';

import { DxNumberBoxModule } from 'devextreme-angular';
import { DxDateBoxModule } from 'devextreme-angular';
import { UserService } from '../../../core/services/user-service';

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
  userService = inject(UserService);

  constructor() {
    this.userInfoForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl(null, [Validators.required, Validators.min(0)]),
      education: new FormControl('', Validators.required),
      nationalID: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      profilePhoto: new FormControl('', Validators.required),
    });

    effect(() => {
      const user = this.userService.singleUserData();

      if (user) {
        // If user data exists, patch the form
        console.log('User data received, patching form:', user);
        this.userInfoForm.patchValue(user);
      } else {
        // If user data is null, reset the form
        console.log('No user data, resetting form.');
        this.userInfoForm.reset();
      }
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
