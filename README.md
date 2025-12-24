# BlogDash - RPG-Themed React Application

> A capstone project demonstrating all 7 sections of React Intermediate concepts with an animated RPG theme.

## 📜 Project Overview

BlogDash is a multi-page blog dashboard built with React that implements all concepts from Lab 4: Intermediate React. The application features a pixel-art RPG aesthetic with animated effects, quest-themed posts, and a complete authentication flow.

## ⚔️ Features Implemented

### Section 1: The useEffect Hook
- **MouseTracker Component** (`src/components/MouseTracker.jsx`)
  - Adds `mousemove` event listener on mount
  - Logs coordinates to console
  - **Cleanup function** removes listener on unmount (prevents memory leak)
  - Creates magical cursor trail effect

### Section 2: The useRef Hook
- **UncontrolledLogin Component** (`src/components/UncontrolledLogin.jsx`)
  - Uses `useRef` to create `usernameRef`
  - Attaches ref to input element
  - `handleSubmit` alerts value from `usernameRef.current.value`
- **Login Page Focus** (Bonus - `src/pages/LoginPage.jsx`)
  - Uses `useRef` for username input
  - Uses `useEffect` with `[]` to focus on mount

### Section 3: Data Fetching Strategies
- **PostFetcher Component** (`src/components/PostFetcher.jsx`)
  - Three state variables: `data`, `loading`, `error`
  - Full try/catch/finally state flow
  - Conditional rendering for each state
- **useFetch Custom Hook** (`src/hooks/useFetch.js`)
  - Reusable data fetching with loading/error states
  - Manual HTTP error checking (fetch doesn't auto-throw on 404)

### Section 4: Architecting Forms
- **ControlledSignup Component** (`src/components/ControlledSignup.jsx`)
  - Single state object: `{ email: '', password: '', heroClass: '' }`
  - `value` prop tied to state
  - `name` attribute matching state keys
  - Single `handleChange` function using `event.target.name/value`
  - `onSubmit` logs formData to console

### Section 5: React Router v6
- **Basic Setup** (`src/main.jsx`)
  - `createBrowserRouter` and `RouterProvider`
  - Routes for `/`, `/dashboard`, `/dashboard/post/:postId`, `/dashboard/about`
- **Nested Routes** (`src/components/Layout.jsx`)
  - Root layout with navigation bar
  - `<Outlet />` component for nested routes
- **Dynamic Routes** (`src/pages/PostDetail.jsx`)
  - `useParams` hook to read `postId` from URL
- **Navigation** (`src/pages/About.jsx`)
  - `useNavigate` hook for programmatic navigation
  - `<Link>` components for declarative navigation
- **Protected Routes** (`src/routes/ProtectedRoute.jsx`)
  - Consumes `AuthContext`
  - Returns `<Navigate to="/" />` if not authenticated

### Section 6: The Context API
- **AuthContext** (`src/context/AuthContext.jsx`)
  - Provides `isAuthenticated`, `user`, `login`, `logout`
  - Wraps entire application in `AuthProvider`
- **ThemeContext** (`src/context/ThemeContext.jsx`)
  - Light/dark theme switcher
  - `useContext` hook to consume theme

### Section 7: Custom Hooks
- **useLocalStorage** (`src/hooks/useLocalStorage.js`)
  - Syncs state with localStorage
  - Lazy initialization from localStorage
  - Returns `[storedValue, setValue]` like useState
  - Used for persistent quest count
- **useFetch** (`src/hooks/useFetch.js`)
  - Manages data, loading, error states
  - Used throughout dashboard

## 🗂️ Project Structure

```
blogdash/
├── index.html                 # Entry HTML file
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies
├── src/
│   ├── main.jsx               # Router setup (Section 5.1)
│   ├── assets/
│   │   ├── day-bg.png         # Light theme background
│   │   └── night-bg.png       # Dark theme background
│   ├── components/
│   │   ├── Layout.jsx         # Dashboard layout with Outlet (Section 5.2)
│   │   ├── MouseTracker.jsx   # useEffect cleanup demo (Section 1.3)
│   │   ├── UncontrolledLogin.jsx  # useRef demo (Section 2.1)
│   │   ├── ControlledSignup.jsx   # Controlled forms (Section 4.1)
│   │   └── PostFetcher.jsx    # Data fetching demo (Section 3.2)
│   ├── context/
│   │   ├── AuthContext.jsx    # Authentication context (Section 6.2)
│   │   └── ThemeContext.jsx   # Theme context (Section 6.2)
│   ├── hooks/
│   │   ├── useLocalStorage.js # Custom localStorage hook (Section 7.2)
│   │   └── useFetch.js        # Custom fetch hook (Capstone)
│   ├── pages/
│   │   ├── LoginPage.jsx      # Login with useRef focus (Bonus)
│   │   ├── Dashboard.jsx      # Post list with useFetch
│   │   ├── PostDetail.jsx     # Dynamic route with useParams (Section 5.2)
│   │   └── About.jsx          # About page with useNavigate (Section 5.1)
│   ├── routes/
│   │   └── ProtectedRoute.jsx # Auth guard component (Section 5.3)
│   └── styles/
│       ├── index.css          # Base styles
│       ├── variables.css      # CSS custom properties
│       ├── animations.css     # Keyframe animations
│       ├── components.css     # Reusable component styles
│       └── pages.css          # Page-specific styles
```

## 🎮 RPG Theme Features

- **Pixel Art Backgrounds**: Day/night scenes with parallax effect
- **Animated Cursor Trail**: Magical particle effect following mouse
- **Quest Cards**: Posts displayed as quests with rarity levels
- **Character Stats**: User level, XP, and gold display
- **Animated Transitions**: Fade, scale, and shimmer effects
- **Fantasy Typography**: Cinzel and MedievalSharp fonts
- **Rarity System**: Legendary, Epic, Rare, Common post classifications

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd blogdash

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Usage

1. **Login**: Enter any hero name on the login page
2. **Quest Board**: Browse available quests (blog posts)
3. **Quest Details**: Click any quest to view full details
4. **Lore Page**: View project documentation and features
5. **Theme Toggle**: Switch between day/night themes
6. **Logout**: Return to login page

## 📚 API Reference

The application uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for mock data:
- Posts list: `https://jsonplaceholder.typicode.com/posts`
- Single post: `https://jsonplaceholder.typicode.com/posts/{id}`
- Comments: `https://jsonplaceholder.typicode.com/posts/{id}/comments`

## 🎓 Course Information

**Lab 4: Intermediate React**  
MSc. Tran Vinh Khiem

This capstone project demonstrates mastery of all seven sections of the Intermediate React module.

## 📝 License

Educational project for React coursework.
