import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxTextBoxModule } from 'devextreme-angular';

@Component({
  selector: 'app-user-form',
  imports: [DxTextBoxModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {
  userInfoForm!: FormGroup;

  constructor() {
    this.userInfoForm = new FormGroup({
      firstName: new FormControl<string>('', {
        validators: Validators.required,
      }),
      lastName: new FormControl<string>('', {
        validators: Validators.required,
      }),
      age: new FormControl<number>(0, {
        validators: Validators.required,
      }),
      education: new FormControl<string>('', {
        validators: Validators.required,
      }),
      nationalID: new FormControl<string>('', {
        validators: Validators.required,
      }),
      birthDate: new FormControl<string>('', {
        validators: Validators.required,
      }),
    });
  }
}
