import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { User } from '../../core/services/user';
import { IUser } from '../../core/models/user.model';

@Component({
  selector: 'app-user-grid',
  imports: [CommonModule, DxDataGridModule],
  templateUrl: './user-grid.html',
  styleUrl: './user-grid.scss',
})
export class UserGrid {
  userService = inject(User);
  users: IUser[] = this.userService.getUsers();
  constructor() {}

  openCustomPopup() {
    console.log('Hello World!');
  }
}
