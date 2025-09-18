# DevExtreme Angular CRUD Sample UI

![Angular](https://img.shields.io/badge/Angular-20.0.0-red?logo=angular)
![DevExtreme](https://img.shields.io/badge/DevExtreme-UI_Components-blue)
![Signals](https://img.shields.io/badge/Angular_Signals-Reactive_State-orange)

This is a sample Angular 20 application developed as part of a **coding challenge for the ODCC interview**. It demonstrates full **CRUD (Create, Read, Update, Delete)** functionality for managing users, built using **DevExtreme UI Components** for a polished, enterprise-grade interface. The app leverages **Angular Signals** for fine-grained, reactive state management — ensuring optimal performance and minimal boilerplate while keeping the UI in sync with data changes.

Designed with clean architecture and modern Angular practices, this project showcases not only technical proficiency with Angular and DevExtreme, but also an understanding of scalable component design, state reactivity, and user experience.

---

## ✨ Features

- ✅ **Create** new users with form validation
- ✅ **Read** / View user list in a responsive data grid
- ✅ **Update** existing user details
- 🚀 Built with **Angular 20** and modern **Signals API** for granular reactivity
- 💄 Styled with **DevExtreme Angular Components** (DataGrid, Form Inputs, Button, etc.)
- 🔄 Real-time UI updates using Signals — no manual change detection or complex RxJS chains

---

## 🛠️ Tech Stack

- **Framework**: Angular 20
- **UI Toolkit**: DevExtreme for Angular
- **State Management**: Angular Signals (built-in reactivity)
- **Package Manager**: npm / yarn / pnpm (your choice)
- **Build Tool**: Angular CLI

---

## 📦 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- [npm](https://www.npmjs.com/) (or yarn / pnpm)
- Angular CLI: `npm install -g @angular/cli`

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/devextreme-angular-crud.git
cd devextreme-angular-crud
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the Development Server

```bash
ng serve
```

Open your browser and navigate to `http://localhost:4200/`. The app will automatically reload if you change any source files.

---

## 🏗️ Build for Production

To build the project for production deployment:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

---

## 🧪 Running Tests

Run unit tests:

```bash
ng test
```

Run end-to-end tests:

```bash
ng e2e
```

---

## 📁 Project Structure

```
src/
└── app/
    ├── core/
    │   └── dev-data/
    │       └── mock-users.ts          # Mock user data
    │
    ├── guards/                        # Route guards (if any)
    ├── interceptors/                  # HTTP interceptors (if any)
    ├── models/
    │   ├── popup.model.ts             # Popup configuration model
    │   └── user.model.ts              # User interface & type
    │
    ├── services/
    │   ├── popup-service.ts           # Handles popup logic
    │   └── user-service.ts            # CRUD logic + Signal state
    │
    ├── features/
    │   └── user-grid/
    │       ├── user-grid.html         # Template
    │       ├── user-grid.scss         # Styles
    │       └── user-grid.ts           # Component class
    │
    ├── shared/
    │   └── components/
    │       ├── popup/
    │       │   ├── popup.html
    │       │   ├── popup.scss
    │       │   └── popup.ts
    │       └── user-form/
    │           ├── user-form.html
    │           ├── user-form.scss
    │           └── user-form.ts
    │
    ├── directives/
    ├── pipes/
    ├── styles/
    │   ├── _grid.scss                 # Shared grid styles
    │   └── _icon.scss                 # Icon utilities
    │
    ├── app.config.ts                   # Angular app config
    └── app.html                        # Root template
```

---

## 💡 Key Concepts

### Angular Signals

This project uses Angular’s new **Signals** system to manage component state reactively. Changes to user data automatically trigger UI updates without `async` pipes or `ChangeDetectorRef`.

Example:

```ts
users = signal<User[]>([]);
// ...
this.users.update((list) => [...list, newUser]);
```

### DevExtreme Components

- `dx-data-grid` — displays and manages user records
- `dx-text-box` — for creating/editing user data
- `dx-number-box` — for creating/editing user numerical data
- `dx-date-box` — for creating/editing user birthdate
- `dx-button` — action buttons with built-in styling

## 📬 Contact

Hossein Heydarpour — hosseinheydarpour1@gmail.com

Project Link: [https://github.com/HosseinHeydarpour/user-form-angular](https://github.com/HosseinHeydarpour/user-form-angular)

---

> 💡 **Tip**: Use `ng serve --open` to automatically open the app in your default browser after starting the dev server.

Happy Coding! 🎉
