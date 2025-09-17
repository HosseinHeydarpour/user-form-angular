import { Injectable } from '@angular/core';
import { users } from '../dev-data/mock-users';

@Injectable({
  providedIn: 'root',
})
export class User {
  // Mock data coming from dev-data folder
  Users = users;
}
