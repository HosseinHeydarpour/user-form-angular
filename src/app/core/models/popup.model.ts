export interface IPopupButton {
  title: string; // Text to display on the button
  action?: () => void; // Optional callback when button is clicked
}

export interface IPopupConfig {
  title: string; // Popup title
  buttons: IPopupButton[]; // Array of buttons
  hasButtons: boolean;
}
