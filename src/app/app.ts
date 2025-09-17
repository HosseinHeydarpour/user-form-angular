import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserGrid } from './features/user-grid/user-grid';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserGrid],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('user-form');
}
