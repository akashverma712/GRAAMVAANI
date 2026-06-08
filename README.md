<div align="center">

<img src="https://github.com/akashverma712/GRAAMVAANI/raw/main/Screenshot%202025-12-18%20101438.png" alt="GRAAMVAANI" width="100%"/>

#  GRAAMVAANI

*ग्रामस्य स्वरः, भविष्यस्य आधारः — "The Voice of the Village, The Foundation of the Future"*

[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express_5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white)](https://clerk.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Twilio](https://img.shields.io/badge/Twilio-F22F46?style=flat-square&logo=twilio&logoColor=white)](https://twilio.com/)

A full-stack digital platform for rural India — delivering government notices, community forums, event calendars, and multilingual tools to village citizens through a mobile-friendly web app.

📂 **[View Demo & Docs on Drive](https://drive.google.com/file/d/1iLc-vgOKhGduP4fZd_ZRunUUe9FTVWyO/view?usp=sharing)**

</div>

---

## 📁 Project Structure

Three independent apps, one repo:

```
GRAAMVAANI/
├── frontend/          # React 19 + Vite 7 — user-facing PWA
│   └── src/
│       ├── components/    # Hero, Notices, CommunityForum, EventCalendar…
│       ├── pages/         # Login, Signup, Dashboard, VerifyEmail
│       └── routes/        # Layout, Home, ProtectedRoute
│
├── backend/           # Node.js + Express 5 — REST API
│   └── server.js      # Entry point — auth routes + static file serving
│
├── admin/             # React + Vite — admin panel (scaffolded)
│
└── README.md
```

---

##  Architecture

```
Browser / Mobile
      │
      ▼
React PWA  (Clerk · Router v7 · i18next · Framer Motion · Tailwind)
      │  Axios
      ▼
Express 5 API  (JWT · Bcrypt · Multer · express-validator)
      │         │
      │      Nodemailer (email OTP) + Twilio (SMS OTP)
      ▼
MongoDB  (Mongoose ODM)
```

---

##  Frontend

**Stack:** React 19 · Vite 7 · Tailwind CSS 4 · Clerk · React Router v7 · Framer Motion · i18next · Axios

### Routes

| Path | Component | Access | Description |
|---|---|---|---|
| `/` | Home | Public | Hero → Notices → LearningResources → Stories → AboutSection → Features |
| `/signup` | Signup | Public | Clerk `<SignUp>` — redirects to `/dashboard` |
| `/login` | Login | Public | Clerk `<SignIn>` |
| `/verify-email-address` | VerifyEmail | Public | Clerk email verification step |
| `/dashboard` | Dashboard | 🔒 Protected | User's full name, email, Clerk `<UserButton>` sign-out |
| `/notice` | NoticeDetail | 🔒 Protected | Filterable notice board (Health / Education / Agriculture); PDF download per notice |
| `/Forum` | CommunityForum | 🔒 Protected | Create & read posts; image + PDF/doc file attachments |
| `/Scheme` | EventCalendar | 🔒 Protected | Events filterable by category, date, search; Framer Motion animated |

> `ProtectedRoute` reads Clerk's `isSignedIn` + `isLoaded`; redirects unauthenticated users to `/login`.

### Key Components

| Component | What it does |
|---|---|
| `Hero` | Top landing section |
| `Notices` | Notice cards with category filter + PDF download |
| `LearningResources` | Educational resources on home page |
| `Stories` | Community/success stories |
| `AboutSection` | About the platform |
| `Features` | Platform features showcase |
| `CommunityForum` | Post creation (title, content, image, PDF); post feed |
| `EventCalendar` | Events: Gram Sabha · Health Camps · Farmer Workshops · Water Meetings |
| `LocalMap` | Local map integration (currently commented out) |
| `Navbar` + `Footer` | Shared layout via React Router `<Outlet>` |

### Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` + `react-dom` | ^19.1.0 | UI framework |
| `vite` | ^7.0.4 | Build tool & dev server |
| `tailwindcss` | ^4.1.11 | Utility-first CSS (via Vite plugin) |
| `@clerk/clerk-react` | ^5.36.0 | Auth — SignIn, SignUp, UserButton, useUser |
| `react-router-dom` | ^7.7.0 | Client-side routing |
| `framer-motion` | ^12.23.7 | Animations on notice cards, event list |
| `i18next` + `react-i18next` | ^25 / ^15 | Multilingual with browser language detection |
| `axios` | ^1.10.0 | API calls |
| `date-fns` | ^4.1.0 | Date formatting in EventCalendar |
| `react-icons` | ^5.5.0 | Icons (FaUserCircle, FaCalendarAlt, MdPostAdd…) |
| `formik` + `yup` | ^2 / ^1 | Form handling and validation |
| `react-otp-input` | ^3.1.1 | OTP input UI |
| `swiper` | ^11.2.10 | Touch slider / carousel |
| `browser-image-compression` | ^2.0.2 | Client-side image compression before upload |
| `react-toastify` | ^11.0.5 | Toast notifications |

### Setup

```bash
cd frontend
npm install
```

**`frontend/.env`**
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

```bash
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

---

##  Backend

**Stack:** Node.js (ESM) · Express 5 · MongoDB + Mongoose · JWT · Bcrypt · Nodemailer · Twilio · Multer

### API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/auth/*` | OTP authentication via email (Nodemailer) and phone (Twilio) |
| `GET` | `/uploads/*` | Static file serving — files uploaded via Multer |

### Dependencies

| Package | Version | Purpose |
|---|---|---|
| `express` | ^5.1.0 | HTTP server and routing |
| `mongoose` | ^8.16.4 | MongoDB ODM |
| `jsonwebtoken` | ^9.0.2 | JWT session tokens |
| `bcrypt` | ^6.0.0 | Password hashing |
| `nodemailer` | ^7.0.5 | Email OTP delivery |
| `twilio` | ^5.7.3 | SMS OTP delivery |
| `multer` | ^2.0.2 | Multipart file upload handling |
| `express-validator` | ^7.2.1 | Request input validation |
| `dotenv` | ^17.2.0 | Environment variable loading |
| `cors` | ^2.8.5 | Cross-origin request handling |
| `nodemon` | ^3.1.0 | Dev auto-restart |

### Setup

```bash
cd backend
npm install
```

**`backend/.env`**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Email OTP (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# SMS OTP (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
```

```bash
npm run dev    # nodemon — http://localhost:5000
npm start      # production
```

---

##  Admin Panel

React 19 + Vite 7 — currently scaffolded, active development in progress.

```bash
cd admin && npm install && npm run dev
```

---

##  Supported Languages

Handled via `i18next` + `react-i18next` with browser language auto-detection.

🇮🇳 Hindi · 🇬🇧 English · 🌏 Tamil · 🌏 Telugu

---

##  Getting Started (Full Stack)

```bash
# 1. Clone
git clone https://github.com/akashverma712/GRAAMVAANI.git
cd GRAAMVAANI

# 2. Backend → http://localhost:5000
cd backend && npm install && npm run dev

# 3. Frontend → http://localhost:5173  (new terminal)
cd frontend && npm install && npm run dev
```

---

## Contributing

```bash
git checkout -b feature/your-feature
git commit -m "Add: your change"
git push origin feature/your-feature
# → open a Pull Request against main
```

---



**GRAAMVAANI — where every village finds its voice.**

</div>
