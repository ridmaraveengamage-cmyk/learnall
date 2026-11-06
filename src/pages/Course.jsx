import { useState } from 'react';
import { Link } from '../router.jsx';
import { useStore, courseProgress, nextLesson } from '../store.jsx';
import { getCourse, allLessons, courseMinutes, subjectName, PATHS, COURSES } from '../data/courses.js';
import Icon from '../components/Icon.jsx';
import { ProgressBar } from '../components/Cards.jsx';
import NotFound from './NotFound.jsx';

export default function Course({ id }) {
  const course = getCourse(id);
  const { progress, toggleSaved } = useStore();
  const curIdx = course ? course.modules.findIndex((m) => m.lessons.some((l) => !progress.completed[l.id])) : 0;
  const [open, setOpen] = useState(() => ({ [curIdx === -1 ? 0 : curIdx]: true }));
  if (!course) return <NotFound />;

  const cp = courseProgress(progress, course);
  const next = nextLesson(progress, course);
  const saved = progress.saved.includes(course.id);
  const lessons = allLessons(course);
  const quizCount = lessons.reduce((a, l) => a + l.quiz.length, 0);
  const path = PATHS.find((p) => p.courses.includes(course.id));
  const nextInPath = path ? COURSES.find((c) => c.id === path.courses[path.courses.indexOf(course.id) + 1]) : null;

  const startHref = next ? `/learn/${course.id}/${next.id}` : `/certificate/${course.id}`;
  const startLabel = cp.done === 0 ? 'Start course' : next ? `Continue · ${next.title}` : 'View certificate';

  return (
    <>
      <section className="course-hero">
        <div className="wrap course-hero__inner">
          <div className="course-hero__text">
            <nav aria-label="Breadcrumb" className="crumbs">
              <Link to="/">Home</Link><span aria-hidden="true">/</span>
              <Link to={'/explore?cat=' + course.subject}>{subjectName(course.subject)}</Link><span aria-hidden="true">/</span>
              <span>{course.title}</span>
            </nav>
            <h1 className="course-hero__title">{course.title}</h1>
            <p className="hero__lead">{course.summary}</p>
            <div className="meta-row">
              <span><Icon name="chart" size={16} />{course.level}</span>
              <span><Icon name="book" size={16} />{lessons.length} lessons</span>
              <span><Icon name="clock" size={16} />About {Math.round(courseMinutes(course) / 6) / 10} hours</span>
              <span><Icon name="bolt" size={16} />{quizCount} quiz questions</span>
              <span className="meta-row__cert"><Icon name="award" size={16} />Certificate</span>
            </div>
          </div>
          <aside className="enroll-card">
            <div className="enroll-card__video">
              <span className="deco enroll-card__ring" />
              <span className="enroll-card__symbol">{course.symbol}</span>
            </div>
            <div className="enroll-card__body">
              <div className="split"><strong>Your progress</strong><span className="muted">{cp.done} / {cp.total} lessons</span></div>
              <ProgressBar pct={cp.pct} label="Course progress" />
              <Link to={startHref} className="btn btn--primary btn--block btn--lg">{startLabel}</Link>
              <button type="button" className="btn btn--outline btn--block" onClick={() => toggleSaved(course.id)} aria-pressed={saved}>
                <Icon name="bookmark" size={18} /> {saved ? 'Saved' : 'Save for later'}
              </button>
            </div>
          </aside>
        </div>
      </section>

      <div className="wrap course-body">
        <div className="course-body__main">
          <section className="card">
            <h2 className="card__title">What you'll learn</h2>
            <ul className="outcomes">
              {course.outcomes.map((o) => (
                <li key={o}><span className="tick"><Icon name="check" size={14} strokeWidth={3.2} /></span>{o}</li>
              ))}
            </ul>
          </section>

          <section>
            <div className="split split--baseline">
              <h2 className="card__title">Course content</h2>
              <span className="muted">{course.modules.length} modules · {lessons.length} lessons</span>
            </div>
            <div className="modules">
              {course.modules.map((m, mi) => {
                const done = m.lessons.filter((l) => progress.completed[l.id]).length;
                const isOpen = !!open[mi];
                const status = done === m.lessons.length ? 'Done' : done > 0 || mi === curIdx ? 'In progress' : '';
                return (
                  <div key={mi} className={'module' + (mi === curIdx ? ' is-current' : '')}>
                    <button type="button" className="module__head" aria-expanded={isOpen} onClick={() => setOpen((o) => ({ ...o, [mi]: !isOpen }))}>
                      <span className="module__num">{String(mi + 1).padStart(2, '0')}</span>
                      <span className="module__title">{m.title}<small>{m.lessons.length} lessons</small></span>
                      {status && <span className={'status status--' + (status === 'Done' ? 'done' : 'now')}>{status}</span>}
                      <Icon name="chevronDown" size={18} className={'module__chev' + (isOpen ? ' is-open' : '')} />
                    </button>
                    {isOpen && (
                      <ul className="module__lessons">
                        {m.lessons.map((l) => {
                          const isDone = !!progress.completed[l.id];
                          const isNext = next && next.id === l.id;
                          return (
                            <li key={l.id}>
                              <Link to={`/learn/${course.id}/${l.id}`} className={'lesson-row' + (isNext ? ' is-next' : '')}>
                                <span className={'lesson-dot' + (isDone ? ' is-done' : isNext ? ' is-next' : '')}>{isDone && <Icon name="check" size={12} strokeWidth={3.5} />}</span>
                                <span className="lesson-row__title">{l.title}</span>
                                {progress.quiz[l.id] != null && <span className="muted small">Quiz {progress.quiz[l.id]}%</span>}
                                <span className="muted small">{l.minutes} min</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="course-body__side">
          <section className="card">
            <h2 className="card__title card__title--sm">This course includes</h2>
            <ul className="includes">
              <li><Icon name="book" size={18} />{lessons.length} short lessons</li>
              <li><Icon name="bolt" size={18} />{quizCount} quiz questions</li>
              <li><Icon name="chart" size={18} />Progress tracking</li>
              <li><Icon name="award" size={18} />Certificate of completion</li>
            </ul>
          </section>
          {nextInPath && (
            <Link to={'/course/' + nextInPath.id} className="card card--accent">
              <span className="eyebrow">Next in this path</span>
              <strong>{nextInPath.title}</strong>
              <span className="link-strong">View course →</span>
            </Link>
          )}
        </aside>
      </div>
    </>
  );
}
