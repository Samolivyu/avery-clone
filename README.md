# AEA Staff Portal — Authentication & Time Logger

This wwas a staff authentication and time-logging portal inspired by the [AEA Limited website](https://www.aealimited.com/) and was a full-stack React + MongoDB + Express application. It has been refactored to a frontend-only architecture with mock authentication, removing all backend dependencies since my db trial expired. 

---

## Current Architecture

| Layer | Technology | Notes |
|---|---|---|
| Framework | React 18 + Vite | Component-based UI, hot module reload |
| Styling | Tailwind CSS | Utility-first, optimized bundle |
| State | Redux Toolkit | Auth slice, user slice |
| Routing | React Router v6 | Hash-based, protected routes |
| Auth | `mockAuth` utility | localStorage persistence, no backend |
| Build | Vite | Zero-config, single `npm run dev` |

---

## Features

- **Email & PIN Authentication** — Sign up, log in with email/password, or use a PIN for quick access. All handled by `mockAuth` with standardised `{ success, error?, user? }` return objects.
- **Time Tracking** — Clock in/out with real-time second-interval updates. Break management with `breakStart`/`breakEnd` state. Active log retrieval via `mockAuth.getActiveLog()`.
- **Product Catalogue** — Filterable product grid with randomised image assignments from `/images/Prod1.jpeg`–`Prod8.jpeg`. Search input and category select wired to component state.
- **Protected Routes** — `handleRoute()` redirects unauthenticated users with toast notification before allowing access to protected views.
- **Accessible UI** — ARIA attributes and keyboard focus management on Navbar, accordions, and modals. Shared `createModal(title, content)` utility for reusable dialogs.
- **Static HTML Demo** — A self-contained `index.html` + `index.css` + `script.js` deliverable with zero build dependencies, deployable to any static host.

---

## What Changed.

### Backend Removed 
MOngoDB trial expired so I got rid of these:
- `server/` directory (Express app, routes, middleware)
- MongoDB/Mongoose dependency and all schemas
- `bcryptjs`, `jsonwebtoken`, `cors`, `helmet`, `morgan` packages
- `.env` file with `MONGODB_URI` and `JWT_SECRET`
- `npm run server`, `npm run db:connect`, `npm run db:init` scripts

### Authentication Refactored
Real API calls replaced by `mockAuth`.
Data is stored in `localStorage`. No API calls, no tokens from a server.

### Redux Auth Integration 
`Login`, `Pin`, and `SignUp` page components dispatch `loginSuccess` to the Redux auth slice on successful `mockAuth` calls. The slice is purely synchronous.

### Static HTML Deliverable 
Good old static `index.html` / `index.css` / `script.js` alongside the React app for hash-based routing, DOM manipulation & live server opening. 
---

## Project Structure

```
folder/
├── index.html              # Static HTML deliverable (no build needed)
├── index.css               # Cleaned stylesheet (42% smaller — CHANGE-006)
├── script.js               # Vanilla JS router + interactions
├── src/
│   ├── components/
│   │   ├── LoginForm.jsx
│   │   ├── SignUp.jsx
│   │   ├── PinEntryForm.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Pin.jsx
│   │   ├── SignUp.jsx
│   │   ├── Products.jsx
│   │   ├── TimeLogger.jsx
│   │   └── Contact.jsx
│   ├── store/
│   │   └── slices/
│   │       ├── authSlice.js
│   │       └── user.js
│   └── utils/
│       └── mockAuth.js
├── public/
│   └── images/             
├── package.json
└── README.md
```

---

## Installation & Development

### Prerequisites
- Node.js ≥ 16
- npm or yarn

### Setup

```bash
git clone https://github.com/avery-website-clone.git
cd avery-website-clone
npm install
npm run dev        
```

### Build

```bash
npm run build       
npm run preview    
```

### Static HTML (no build)

```bash
open index.html
```

---

## `mockAuth` — Data Model

All data lives in `localStorage` under predictable keys.

**User record:**
```js
{
  email: String,
  firstName: String,
  lastName: String,
  pin: String,          // stored as plain string (demo only)
  role: 'staff' | 'admin' | 'manager',
  isActive: Boolean,
  token: String         // mock token, not a real JWT
}
```

**Time log record:**
```js
{
  userId: String,
  date: String,
  clockIn: Date,
  clockOut: Date | null,
  breakStart: Date | null,
  breakEnd: Date | null,
  status: 'clocked-in' | 'on-break' | 'clocked-out'
}
```

## Deployment
Try it out here: https://avery-demo.netlify.app

### Static Host (recommended)

The `index.html` file and the Vite `dist/` output are both deployable to any static host with no server configuration.

**Netlify:**
```bash
npm run build

```
---

## Security Note

My use of `mockAuth` uses `localStorage` was because the mongodb trial expired.

---

## License

MIT License — see `LICENSE` for details.

## Acknowledgements

- Shoutout to  [AEA Limited](https://www.aealimited.com/) for the OG inspo!
