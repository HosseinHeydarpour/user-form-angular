import { Injectable, signal } from '@angular/core';
import { users } from '../dev-data/mock-users';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class User {
  // Mock data coming from dev-data folder
  private usersData = signal<IUser[]>(users);

  // Read OP
  getUsers() {
    return this.usersData();
  }
}
