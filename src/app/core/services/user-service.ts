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

  resetSingleUser() {
    this.singleUserData.set(null);
  }

  updateUserData(originalNationalID: number, data: IUser) {
    const user = this.usersData().find((u) => u.nationalID === originalNationalID);
    if (user) {
      Object.assign(user, data);
    }
  }

  deleteUser(data: IUser) {
    this.usersData.set(this.usersData().filter((user) => user.nationalID !== data.nationalID));
  }
}
