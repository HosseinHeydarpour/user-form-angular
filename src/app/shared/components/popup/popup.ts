import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { PopupService } from '../../../core/services/popup-service';
import { IPopupConfig } from '../../../core/models/popup.model';
import { DxButtonModule } from 'devextreme-angular';
@Component({
  selector: 'app-popup',
  imports: [CommonModule, DxButtonModule],
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
})
export class Popup {
  popupConfig = input.required<IPopupConfig>();

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
