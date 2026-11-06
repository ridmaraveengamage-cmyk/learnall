# LearnAll

All-in-one learning site (front end only for now). React 18 + Vite 5, plain JS (no TypeScript), no router library.

## Run

- `npm install` (first time), then `npm run dev` → http://localhost:5173
- `npm run build` to check for errors.

## Structure

- `src/App.jsx` — routes (hash-based, see `src/router.jsx`). First visit shows the look picker.
- `src/store.jsx` — React context: theme, accounts, progress. Saved to `localStorage` key `learnall:v1`. Guest progress moves into a new account on sign-up.
- `src/data/courses.js` — all courses, lessons (blocks: `{p}`, `{code}`, `{tip}`) and quiz questions. Add courses here.
- `src/pages/` — Home, Explore, Course, Lesson, Auth (Signup/Login), Dashboard, Settings, Certificate, ChooseLook, NotFound.
- `src/components/` — Layout (Header, TabBar, Footer, Logo), Cards, Quiz, Icon.
- `src/styles.css` — one stylesheet, two looks: `body.theme-bold` (Bold & playful) and `body.theme-pro` (Clean & professional). Elements with class `deco` are hidden in the pro look.

## Design rules

- Brand colours: blue `#0000FF`, yellow `#FFB206`. Main buttons are blue with white text.
- Bold look: Sora + Plus Jakarta Sans, large rounded corners, decorative yellow rings.
- Pro look: Inter, 8–12px corners, thin borders, minimal decoration.
- Must work at phone width (bottom tab bar under 768px).

## Not done yet

- No backend: accounts/progress are browser-only; password hashing is not real security.
- No real password-reset email, Google sign-in, or Sinhala/Tamil translations.
