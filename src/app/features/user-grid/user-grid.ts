import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { UserService } from '../../core/services/user-service';
import { IUser } from '../../core/models/user.model';
import { PopupService } from '../../core/services/popup-service';
import { Popup } from '../../shared/components/popup/popup';
import { IPopupConfig } from '../../core/models/popup.model';
import { UserForm } from '../../shared/components/user-form/user-form';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-user-grid',
  imports: [CommonModule, DxDataGridModule, Popup, UserForm, DxButtonModule],
  templateUrl: './user-grid.html',
  styleUrl: './user-grid.scss',
})
export class UserGrid implements OnDestroy {
  userService = inject(UserService);
  users: IUser[] = this.userService.getUsers();
  popupService = inject(PopupService);
  addButtonOptions: any;
  private fileUrlCache = new Map<File, string>();

  popupConfig: IPopupConfig = {
    title: 'Create User',
    hasButtons: false,
  };

  constructor() {
    this.addButtonOptions = {
      icon: 'add',
      text: 'Add User',
      onClick: () => this.openCustomPopup(), // Arrow function fixes `this`
    };

    this.onEditClicked = this.onEditClicked.bind(this);
    this.onDeleteClicked = this.onDeleteClicked.bind(this);
  }

  openCustomPopup() {
    console.log('clicked');
    this.popupService.openPopup();
  }

  onEditClicked(event: any) {
    const userToEdit: IUser = event.row.data;

    this.popupConfig = {
      title: 'Edit User',
      hasButtons: false,
    };

    // Use the service to send the user data
    this.userService.setSingleUserData(userToEdit);

    this.popupService.openPopup();
  }

  onDeleteClicked(event: any) {
    const userToDelete: IUser = event.row.data;

    // Find the user in the current users array by a unique identifier (e.g., nationalID)
    // and create a new array without that user.
    this.users = this.users.filter((user) => user.nationalID !== userToDelete.nationalID);
  }

  getImageSrc(profilePhoto: any): string | null {
    if (!profilePhoto) return null;

    // If it's already a string (URL or data URL), return as-is
    if (typeof profilePhoto === 'string') {
      return profilePhoto;
    }

    // If it's a File object, generate a data URL
    if (profilePhoto instanceof File) {
      // Create a local cache to avoid regenerating URL on every change detection
      if (!this.fileUrlCache.has(profilePhoto)) {
        const url = URL.createObjectURL(profilePhoto);
        this.fileUrlCache.set(profilePhoto, url);
        // Optional: Revoke later if needed (e.g., on destroy or replace)
      }
      return this.fileUrlCache.get(profilePhoto)!;
    }

    return null;
  }

  ngOnDestroy(): void {
    this.fileUrlCache.forEach((url) => URL.revokeObjectURL(url));
    this.fileUrlCache.clear();
  }
}
