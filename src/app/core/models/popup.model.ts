export interface IPopupButton {
  title: string; // Text to display on the button
  action?: () => void; // Optional callback when button is clicked
  type: 'default' | 'success' | 'danger' | 'normal' | 'back';
  stylingMode: 'contained' | 'outlined' | 'text';
}

export interface IPopupConfig {
  title: string; // Popup title
  buttons?: IPopupButton[]; // Array of buttons
  hasButtons: boolean;
}
