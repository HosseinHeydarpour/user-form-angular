import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private popupIsVisible = signal<boolean>(false);
  popIsVisibleReadOnly = this.popupIsVisible.asReadonly;

  openPopup() {
    console.log('open');
    this.popupIsVisible.set(true);
  }
  closePopup() {
    this.popupIsVisible.set(false);
  }
}
