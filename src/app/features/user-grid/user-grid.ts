import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { User } from '../../core/services/user';
import { IUser } from '../../core/models/user.model';
import { PopupService } from '../../core/services/popup-service';
import { Popup } from '../../shared/components/popup/popup';
import { IPopupConfig } from '../../core/models/popup.model';
import { UserForm } from '../../shared/components/user-form/user-form';

@Component({
  selector: 'app-user-grid',
  imports: [CommonModule, DxDataGridModule, Popup, UserForm],
  templateUrl: './user-grid.html',
  styleUrl: './user-grid.scss',
})
export class UserGrid {
  userService = inject(User);
  users: IUser[] = this.userService.getUsers();
  popupService = inject(PopupService);
  addButtonOptions: any;

  popupConfig: IPopupConfig = {
    title: 'Confirm Delete',
    buttons: [
      {
        title: 'Delete',
        action: () => this.popupService.closePopup(),
        type: 'success',
        stylingMode: 'contained',
      },
      {
        title: 'Cancel',
        action: () => this.popupService.closePopup(),
        type: 'danger',
        stylingMode: 'outlined',
      },
    ],
    hasButtons: true,
  };

  constructor() {
    this.addButtonOptions = {
      icon: 'add',
      text: 'Add User',
      onClick: () => this.openCustomPopup(), // Arrow function fixes `this`
    };
  }

  openCustomPopup() {
    console.log('clicked');
    this.popupService.openPopup();
  }
}
