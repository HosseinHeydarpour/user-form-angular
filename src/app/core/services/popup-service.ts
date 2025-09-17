import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private popupIsVisible = signal<boolean>(false);
  popIsVisibleReadOnly = this.popupIsVisible.asReadonly;

  openPop() {
    this.popupIsVisible.set(true);
  }
  closePopup() {
    this.popupIsVisible.set(false);
  }
}
