import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { COURSES, getCourse, allLessons } from './data/courses.js';

// Everything is saved in this browser only (localStorage). There is no server yet.
const KEY = 'learnall:v1';
const GUEST = '__guest__';

const emptyProgress = () => ({ completed: {}, quiz: {}, saved: [], activity: {}, last: null });

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* storage blocked or corrupt: start fresh */
  }
  return { theme: null, users: {}, session: null, progress: {} };
}

function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    /* ignore: the app still works for this visit */
  }
}

// Local date (not UTC), so "today" matches the learner's own clock.
export const todayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

async function hash(text) {
  const data = new TextEncoder().encode('learnall:' + text);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, setState] = useState(load);
  useEffect(() => save(state), [state]);

  useEffect(() => {
    document.body.classList.toggle('theme-pro', state.theme === 'pro');
    document.body.classList.toggle('theme-bold', state.theme !== 'pro');
  }, [state.theme]);

  const userKey = state.session || GUEST;
  const user = state.session ? state.users[state.session] : null;
  const progress = state.progress[userKey] || emptyProgress();

  const updateProgress = useCallback(
    (fn) =>
      setState((s) => {
        const k = s.session || GUEST;
        const cur = s.progress[k] || emptyProgress();
        return { ...s, progress: { ...s.progress, [k]: fn(cur) } };
      }),
    []
  );

  const setTheme = useCallback((theme) => setState((s) => ({ ...s, theme })), []);

  const signUp = useCallback(async ({ name, email, password }) => {
    const id = email.trim().toLowerCase();
    let error = null;
    const passHash = await hash(password);
    setState((s) => {
      if (s.users[id]) {
        error = 'An account with this email or phone already exists. Try logging in.';
        return s;
      }
      const guest = s.progress[GUEST];
      const progressMap = { ...s.progress };
      // Keep anything the visitor did before signing up.
      progressMap[id] = guest || emptyProgress();
      delete progressMap[GUEST];
      return {
        ...s,
        users: { ...s.users, [id]: { name: name.trim(), email: id, passHash, role: 'Student', interests: [], dailyGoal: 15, joined: todayKey() } },
        session: id,
        progress: progressMap,
      };
    });
    return error;
  }, []);

  const logIn = useCallback(
    async ({ email, password }) => {
      const id = email.trim().toLowerCase();
      const u = state.users[id];
      if (!u || u.passHash !== (await hash(password))) return 'That email/phone and password don’t match.';
      setState((s) => ({ ...s, session: id }));
      return null;
    },
    [state.users]
  );

  const logOut = useCallback(() => setState((s) => ({ ...s, session: null })), []);

  const updateUser = useCallback(
    (patch) =>
      setState((s) => (s.session ? { ...s, users: { ...s.users, [s.session]: { ...s.users[s.session], ...patch } } } : s)),
    []
  );

  const completeLesson = useCallback(
    (courseId, lessonId, minutes) =>
      updateProgress((p) => {
        const day = todayKey();
        const already = !!p.completed[lessonId];
        return {
          ...p,
          completed: already ? p.completed : { ...p.completed, [lessonId]: day },
          activity: already ? p.activity : { ...p.activity, [day]: (p.activity[day] || 0) + minutes },
          last: { courseId, lessonId },
        };
      }),
    [updateProgress]
  );

  const recordQuiz = useCallback(
    (lessonId, pct) => updateProgress((p) => ({ ...p, quiz: { ...p.quiz, [lessonId]: Math.max(pct, p.quiz[lessonId] || 0) } })),
    [updateProgress]
  );

  const visitLesson = useCallback((courseId, lessonId) => updateProgress((p) => ({ ...p, last: { courseId, lessonId } })), [updateProgress]);

  const toggleSaved = useCallback(
    (courseId) =>
      updateProgress((p) => ({
        ...p,
        saved: p.saved.includes(courseId) ? p.saved.filter((c) => c !== courseId) : [...p.saved, courseId],
      })),
    [updateProgress]
  );

  const resetProgress = useCallback(() => updateProgress(() => emptyProgress()), [updateProgress]);

  const value = useMemo(
    () => ({
      theme: state.theme,
      user,
      progress,
      setTheme,
      signUp,
      logIn,
      logOut,
      updateUser,
      completeLesson,
      recordQuiz,
      visitLesson,
      toggleSaved,
      resetProgress,
    }),
    [state.theme, user, progress, setTheme, signUp, logIn, logOut, updateUser, completeLesson, recordQuiz, visitLesson, toggleSaved, resetProgress]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}

// ---- Derived numbers for dashboards ----

export function courseProgress(progress, course) {
  const lessons = allLessons(course);
  const done = lessons.filter((l) => progress.completed[l.id]).length;
  return { done, total: lessons.length, pct: lessons.length ? Math.round((done / lessons.length) * 100) : 0 };
}

export function nextLesson(progress, course) {
  return allLessons(course).find((l) => !progress.completed[l.id]) || null;
}

export function stats(progress) {
  const days = Object.keys(progress.activity);
  // Streak: consecutive days with learning, ending today or yesterday.
  let streak = 0;
  const d = new Date();
  if (!progress.activity[todayKey(d)]) d.setDate(d.getDate() - 1);
  while (progress.activity[todayKey(d)]) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  const week = [];
  const start = new Date();
  const dow = (start.getDay() + 6) % 7; // Monday = 0
  start.setDate(start.getDate() - dow);
  for (let i = 0; i < 7; i++) {
    const x = new Date(start);
    x.setDate(start.getDate() + i);
    const k = todayKey(x);
    week.push({ key: k, label: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i], minutes: progress.activity[k] || 0, isToday: k === todayKey() });
  }
  const weekMinutes = week.reduce((a, b) => a + b.minutes, 0);
  const scores = Object.values(progress.quiz);
  const avgQuiz = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
  const completedCourses = COURSES.filter((c) => {
    const cp = courseProgress(progress, c);
    return cp.total > 0 && cp.done === cp.total;
  });
  return {
    streak,
    week,
    weekMinutes,
    todayMinutes: progress.activity[todayKey()] || 0,
    lessonsDone: Object.keys(progress.completed).length,
    avgQuiz,
    completedCourses,
    activeDays: days.length,
  };
}

export function formatMinutes(m) {
  if (m < 60) return m + 'm';
  return Math.floor(m / 60) + 'h ' + (m % 60) + 'm';
}

export { getCourse };
