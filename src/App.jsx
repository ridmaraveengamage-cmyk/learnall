import { useRoute, match } from './router.jsx';
import { useStore } from './store.jsx';
import { Header, TabBar, Footer } from './components/Layout.jsx';
import ChooseLook from './pages/ChooseLook.jsx';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import Course from './pages/Course.jsx';
import Lesson from './pages/Lesson.jsx';
import { Signup, Login } from './pages/Auth.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Settings from './pages/Settings.jsx';
import Certificate from './pages/Certificate.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const { path, query } = useRoute();
  const { theme } = useStore();

  // First visit: ask which look the learner wants.
  if (!theme || path === '/choose') return <ChooseLook />;

  // Full-screen pages (no header/footer).
  if (path === '/signup') return <Signup />;
  if (path === '/login') return <Login />;
  let m;
  if ((m = match('/learn/:courseId/:lessonId', path))) return <Lesson courseId={m.courseId} lessonId={m.lessonId} />;
  if ((m = match('/certificate/:courseId', path))) return <Certificate courseId={m.courseId} />;

  let page;
  if (path === '/') page = <Home />;
  else if (path === '/explore') page = <Explore query={query} />;
  else if (path === '/dashboard') page = <Dashboard />;
  else if (path === '/settings') page = <Settings />;
  else if ((m = match('/course/:id', path))) page = <Course id={m.id} />;
  else page = <NotFound />;

  return (
    <div className="app">
      <a href="#main" className="skip-link" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>
        Skip to content
      </a>
      <Header path={path} />
      <main id="main" tabIndex={-1} className="main">
        {page}
      </main>
      <Footer />
      <TabBar path={path} />
    </div>
  );
}
