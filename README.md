# LearnAll

An all-in-one learning site with two looks (Bold & playful, Clean & professional),
short lessons, quizzes, progress tracking and certificates.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## What works

- First visit asks which look you want; change it later in Settings.
- Sign up / log in (accounts are stored in this browser only).
- Explore and search 7 courses; filter by subject.
- Lessons with content, a quiz per lesson, "Mark complete & continue".
- Dashboard: streak, minutes this week, daily goal, course progress, saved courses.
- Certificate page you can print or save as PDF once a course is finished.
- Works on phones (bottom tab bar) and desktops.

## Not done yet

- No server: data lives in the browser's localStorage. Clearing browser data removes it.
- Passwords are hashed in the browser, but this is not real security. Add a backend
  (e.g. Supabase, Firebase or your own API) before real users sign up.
- No real password-reset email, Google sign-in, or Sinhala/Tamil translations.

## Where things are

- `src/data/courses.js` — all courses, lessons and quiz questions. Add courses here.
- `src/store.jsx` — accounts, progress and saving.
- `src/pages/` — one file per screen.
- `src/styles.css` — both looks (`body.theme-bold` and `body.theme-pro`).
