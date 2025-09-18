import { Component, effect, inject, ElementRef, ViewChild } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxTextBoxModule } from 'devextreme-angular';
import { DxValidatorModule } from 'devextreme-angular';

import { DxNumberBoxModule } from 'devextreme-angular';
import { DxDateBoxModule } from 'devextreme-angular';
import { UserService } from '../../../core/services/user-service';
import { DxFileUploaderModule } from 'devextreme-angular';
import { PopupService } from '../../../core/services/popup-service';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-user-form',
  imports: [
    DxTextBoxModule,
    ReactiveFormsModule,
    DxValidatorModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxFileUploaderModule,
    DxButtonModule,
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {
  userInfoForm!: FormGroup;
  userService = inject(UserService);
  imagePreview: string | ArrayBuffer | null = null;
  popupService = inject(PopupService);
  mode: 'create' | 'edit' = 'create';
  userNationalId!: number;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.userInfoForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl(null, [Validators.required, Validators.min(0)]),
      education: new FormControl('', Validators.required),
      nationalID: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required),
      profilePhoto: new FormControl<File | null>(null, Validators.required),
    });

    effect(() => {
      let user = this.userService.singleUserData();
      const popupVisible = this.popupService.popIsVisibleReadOnly();

      if (!popupVisible) {
        this.resetFormAndFileInput();
        return;
      }

      if (user) {
        // If user data exists, patch the form
        this.userInfoForm.patchValue(user);
        this.userNationalId = user.nationalID;
        if (typeof user.profilePhoto === 'string') {
          this.imagePreview = user.profilePhoto;
        } else if (user.profilePhoto instanceof File) {
          // It's a File → generate object URL
          this.imagePreview = URL.createObjectURL(user.profilePhoto);
        } else {
          this.imagePreview = null;
        }

        this.mode = 'edit';
      } else {
        // If user data is null, reset the form
        console.log('No user data, resetting form.');
        this.userInfoForm.reset();
        this.mode = 'create';
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.userInfoForm.patchValue({
        profilePhoto: file,
      });
      this.userInfoForm.get('profilePhoto')?.updateValueAndValidity();

      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
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

  resetFormAndFileInput(): void {
    // Reset the form
    this.userInfoForm.reset();

    // Clear image preview
    this.imagePreview = null;

    // Clear file input element
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }

    // Ensure profilePhoto control is explicitly cleared (defensive programming)
    this.userInfoForm.get('profilePhoto')?.setValue(null);

    this.userNationalId = 0;

    this.userService.resetSingleUser();
  }

  onFormSubmission() {
    if (this.userInfoForm.valid && this.mode === 'create') {
      const rawValue = this.userInfoForm.getRawValue();

      // Format birthdate to YYYY-MM-DD
      const formattedBirthDate = rawValue.birthdate
        ? new Date(rawValue.birthdate).toISOString().split('T')[0]
        : null;

      const payload = {
        ...rawValue,
        birthdate: formattedBirthDate,
      };
      this.userService.addUserData(payload);

      this.resetFormAndFileInput();

      this.popupService.closePopup();
    } else if (this.userInfoForm.valid && this.mode === 'edit') {
      const rawValue = this.userInfoForm.getRawValue();

      // Format birthdate to YYYY-MM-DD
      const formattedBirthDate = rawValue.birthdate
        ? new Date(rawValue.birthdate).toISOString().split('T')[0]
        : null;

      const payload = {
        ...rawValue,
        birthdate: formattedBirthDate,
      };
      this.userService.updateUserData(this.userNationalId, payload);

      this.resetFormAndFileInput();

      this.popupService.closePopup();
    }
  }

  onCancel() {
    this.resetFormAndFileInput();
    this.popupService.closePopup();
  }
}
