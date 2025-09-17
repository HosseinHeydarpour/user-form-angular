import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { PopupService } from '../../../core/services/popup-service';

@Component({
  selector: 'app-popup',
  imports: [CommonModule],
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
})
export class Popup {
  popupService = inject(PopupService);

  get isVisible() {
    return this.popupService.popIsVisibleReadOnly();
  }

  closePopup() {
    this.popupService.closePopup();
  }

  onBackdropClicked() {
    this.popupService.closePopup();
  }
}
