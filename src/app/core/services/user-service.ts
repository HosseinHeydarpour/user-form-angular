import { Injectable, signal } from '@angular/core';
import { users } from '../dev-data/mock-users';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Mock data coming from dev-data folder
  private usersData = signal<IUser[]>(users);
  singleUserData = signal<IUser | null>(null);

  // Read OP
  getUsers() {
    return this.usersData();
  }

  setSingleUserData(data: IUser) {
    this.singleUserData.set(data);
  }

  addUserData(data: IUser) {
    this.usersData().push(data);
  }
}
