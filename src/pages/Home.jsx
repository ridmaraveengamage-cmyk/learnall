import { useState } from 'react';
import { Link, navigate } from '../router.jsx';
import { useStore, stats, courseProgress, nextLesson } from '../store.jsx';
import { COURSES, SUBJECTS, PATHS, getCourse } from '../data/courses.js';
import Icon from '../components/Icon.jsx';
import { CourseCard, Ring, Thumb } from '../components/Cards.jsx';

function useContinue() {
  const { progress } = useStore();
  const course = progress.last ? getCourse(progress.last.courseId) : null;
  if (!course) return null;
  const cp = courseProgress(progress, course);
  const next = nextLesson(progress, course);
  return { course, cp, next };
}

function SearchBox({ big }) {
  const [q, setQ] = useState('');
  return (
    <form
      role="search"
      className={'search' + (big ? ' search--big' : '')}
      onSubmit={(e) => {
        e.preventDefault();
        navigate('/explore' + (q.trim() ? '?q=' + encodeURIComponent(q.trim()) : ''));
      }}
    >
      <Icon name="search" size={20} />
      <label className="sr-only" htmlFor="home-search">Search courses</label>
      <input id="home-search" type="search" placeholder="Try “Python”, “fractions” or “interview”" value={q} onChange={(e) => setQ(e.target.value)} />
      <button type="submit" className="btn btn--primary">Search</button>
    </form>
  );
}

export default function Home() {
  const { theme } = useStore();
  return theme === 'pro' ? <ProHome /> : <BoldHome />;
}

/* ---------------- Bold ---------------- */

function BoldHome() {
  const { user, progress } = useStore();
  const s = stats(progress);
  const cont = useContinue();
  const lastQuiz = Object.values(progress.quiz).slice(-1)[0];

  return (
    <>
      <section className="wrap hero">
        <div className="hero__text">
          <span className="pill-badge"><b>NEW</b> Lessons in English, සිංහල and தமிழ் coming soon</span>
          <h1 className="hero__title">
            {user ? <>Welcome back, <span className="hl-blue">{user.name.split(' ')[0]}.</span><br /></> : <>Learn <span className="hl-blue">anything.</span><br /></>}
            Grow <span className="hl-yellow">every day.</span>
          </h1>
          <p className="hero__lead">Short lessons, quick quizzes and real progress — from school maths to coding, languages and money skills.</p>
          <SearchBox big />
          <div className="chips">
            <Link to="/course/python" className="chip">Python basics</Link>
            <Link to="/course/everyday-english" className="chip">Spoken English</Link>
            <Link to="/course/ol-maths" className="chip">O/L Maths</Link>
            <Link to="/course/budgeting" className="chip">Budgeting</Link>
          </div>
        </div>

        <div className="bento">
          <div className="bento__main">
            <span className="deco bento__ring" />
            <span className="bento__label">{cont ? 'Continue learning' : 'Start here'}</span>
            <span className="bento__title">{cont ? cont.course.title : 'Python for Beginners'}</span>
            <Ring pct={cont ? cont.cp.pct : 0} label={`${cont ? cont.cp.pct : 0} percent complete`} />
            <span className="bento__sub">
              {cont ? (cont.next ? `Next: ${cont.next.title}` : 'Course complete!') : '12 lessons · Beginner'}
            </span>
            <span style={{ flex: 1 }} />
            <Link
              to={cont ? (cont.next ? `/learn/${cont.course.id}/${cont.next.id}` : `/certificate/${cont.course.id}`) : '/learn/python/py-1'}
              className="btn btn--white"
            >
              {cont ? (cont.next ? 'Resume →' : 'View certificate') : 'Start lesson 1 →'}
            </Link>
          </div>
          <div className="bento__yellow">
            <Icon name="flame" size={30} />
            <span className="bento__big">{s.streak} {s.streak === 1 ? 'day' : 'days'}</span>
            <span className="bento__cap">Learning streak</span>
          </div>
          <div className="bento__white">
            <span className="bento__cap muted">Last quiz</span>
            <span className="bento__big">{lastQuiz != null ? lastQuiz + '%' : '—'}</span>
            <span className="bento__cap muted">{s.lessonsDone} lessons done</span>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section__head">
          <div>
            <span className="eyebrow eyebrow--blue">Explore</span>
            <h2 className="section__title">Pick what you<br />want to learn</h2>
          </div>
          <Link to="/explore" className="btn btn--outline">All subjects →</Link>
        </div>
        <div className="subjects">
          {SUBJECTS.map((sub, i) => {
            const count = COURSES.filter((c) => c.subject === sub.id).length;
            const cls = i === 2 ? ' subject--feature' : i === 1 ? ' subject--yellow' : '';
            const ordered = sub.id === 'technology' ? -2 : sub.id === 'languages' ? -1 : 0;
            return (
              <Link key={sub.id} to={'/explore?cat=' + sub.id} className={'subject' + cls} style={{ order: ordered }}>
                <span className="deco subject__shape" />
                <span className="subject__icon"><Icon name={sub.icon} size={24} /></span>
                <span className="subject__name">{sub.name}</span>
                <span className="subject__desc">{count ? `${count} course${count > 1 ? 's' : ''} · ${sub.desc}` : 'Coming soon'}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="wrap section">
        <div className="section__head">
          <div>
            <span className="eyebrow eyebrow--blue">Learning paths</span>
            <h2 className="section__title">Go from zero to confident</h2>
          </div>
        </div>
        <div className="grid-3">
          {PATHS.map((p) => (
            <Link key={p.id} to={'/course/' + p.courses[0]} className="path-card">
              <Thumb color={p.color} symbol={p.symbol} size="lg" />
              <div className="path-card__body">
                <span className="eyebrow">{p.level} · {p.courses.length} courses</span>
                <span className="path-card__title">{p.title}</span>
                <span className="muted">{p.desc}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="band band--blue">
          <span className="deco band__ring" />
          <h2 className="band__title">Small steps.<br />Big progress.</h2>
          <div className="steps">
            {[
              ['Pick a subject', 'Choose one course or a full path that fits your goal.'],
              ['Learn in minutes', 'Read and practise in 5–10 minute lessons.'],
              ['Check yourself', 'Quick quizzes show exactly what to review next.'],
              ['Earn certificates', 'Finish a course and show off your new skill.'],
            ].map(([t, d], i) => (
              <div key={t} className="step">
                <span className="step__num">{i + 1}</span>
                <span className="step__title">{t}</span>
                <span className="step__desc">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!user && (
        <section className="wrap section section--last">
          <div className="band band--yellow">
            <div>
              <h2 className="band__title band__title--ink">Your first lesson is waiting.</h2>
              <p>Free to start. Learn on your phone or computer.</p>
            </div>
            <Link to="/signup" className="btn btn--primary btn--lg">Create free account →</Link>
          </div>
        </section>
      )}
    </>
  );
}

/* ---------------- Professional ---------------- */

function ProHome() {
  const { user } = useStore();
  const cont = useContinue();
  const [cat, setCat] = useState('popular');
  const cats = [{ id: 'popular', name: 'Popular' }, ...SUBJECTS.filter((s) => COURSES.some((c) => c.subject === s.id))];
  const list = cat === 'popular' ? COURSES.slice(0, 4) : COURSES.filter((c) => c.subject === cat);
  const featured = cont ? cont.course : getCourse('python');
  const next = cont ? cont.next : featured.modules[0].lessons[0];

  return (
    <>
      <section className="pro-hero">
        <div className="wrap pro-hero__inner">
          <div className="pro-hero__text">
            <span className="eyebrow eyebrow--bar">Online learning for everyone</span>
            <h1 className="pro-hero__title">{user ? `Welcome back, ${user.name.split(' ')[0]}.` : 'Build skills that move your life forward.'}</h1>
            <p className="hero__lead">Structured courses in school subjects, technology, languages and career skills. Learn at your own pace and earn certificates.</p>
            <div className="row-gap">
              {user ? (
                <Link to="/dashboard" className="btn btn--primary btn--lg">Go to my learning</Link>
              ) : (
                <Link to="/signup" className="btn btn--primary btn--lg">Join for free</Link>
              )}
              <Link to="/explore" className="btn btn--outline btn--lg">Browse courses</Link>
            </div>
            <ul className="checks">
              <li><Icon name="check" size={16} strokeWidth={2.6} />Self-paced</li>
              <li><Icon name="check" size={16} strokeWidth={2.6} />Shareable certificates</li>
              <li><Icon name="check" size={16} strokeWidth={2.6} />Progress tracking</li>
            </ul>
          </div>
          <div className="player-card">
            <div className="player-card__video">
              <span className="player-card__tag">{cont ? 'Continue' : 'Featured course'}</span>
              <Link to={next ? `/learn/${featured.id}/${next.id}` : `/course/${featured.id}`} className="play-btn" aria-label={'Open ' + featured.title}>
                <Icon name="play" size={22} />
              </Link>
            </div>
            <div className="player-card__meta">
              <strong>{featured.title}</strong>
              <span className="muted">{next ? next.title + ' · ' + next.minutes + ' min' : 'Completed'}</span>
            </div>
            <div className="player-card__list">
              {featured.modules[0].lessons.slice(0, 3).map((l) => (
                <Link key={l.id} to={`/learn/${featured.id}/${l.id}`} className="player-card__row">
                  <Icon name="play" size={14} />
                  <span>{l.title}</span>
                  <span className="muted">{l.minutes} min</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section__head">
          <div>
            <h2 className="section__title section__title--pro">Explore courses</h2>
            <p className="muted">Start with a single course or follow a full path.</p>
          </div>
          <Link to="/explore" className="link-strong">View full catalog →</Link>
        </div>
        <div className="tabs" role="tablist" aria-label="Course categories">
          {cats.map((c) => (
            <button key={c.id} type="button" role="tab" aria-selected={cat === c.id} className={'tab' + (cat === c.id ? ' is-active' : '')} onClick={() => setCat(c.id)}>
              {c.name}
            </button>
          ))}
        </div>
        <div className="grid-cards">
          {list.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>

      <section className="wrap section">
        <div className="features">
          {[
            ['clock', 'Short, focused lessons', 'Most lessons take 5–10 minutes, so you can learn between classes or on the bus.'],
            ['chart', 'Progress you can measure', 'Quizzes after every lesson and a dashboard that shows what to review next.'],
            ['globe', 'Built for Sri Lanka', 'Local exam prep and courses planned in English, Sinhala and Tamil.'],
            ['award', 'Shareable certificates', 'Finish a course to earn a certificate you can add to your CV.'],
          ].map(([icon, t, d]) => (
            <div key={t} className="feature">
              <Icon name={icon} size={28} strokeWidth={1.8} />
              <strong>{t}</strong>
              <span className="muted">{d}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap section pro-paths">
        <div className="pro-paths__intro">
          <span className="eyebrow eyebrow--bar">Learning paths</span>
          <h2 className="section__title section__title--pro">A clear plan from beginner to job-ready.</h2>
          <p className="muted">Each path is a set of courses in the right order, with a certificate for each.</p>
        </div>
        <div className="list-box">
          {PATHS.map((p, i) => (
            <Link key={p.id} to={'/course/' + p.courses[0]} className="list-row">
              <span className={'num-badge num-badge--' + p.color}>{String(i + 1).padStart(2, '0')}</span>
              <span className="list-row__text">
                <strong>{p.title}</strong>
                <span className="muted">{p.desc}</span>
              </span>
              <span className="tag">{p.level}</span>
            </Link>
          ))}
        </div>
      </section>

      {!user && (
        <section className="pro-cta">
          <div className="wrap pro-cta__inner">
            <div>
              <h2>Start learning today.</h2>
              <p>Create a free account and take your first lesson in minutes.</p>
            </div>
            <Link to="/signup" className="btn btn--primary btn--lg">Join for free</Link>
          </div>
        </section>
      )}
    </>
  );
}
