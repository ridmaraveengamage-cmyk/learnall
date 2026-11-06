import { useEffect } from 'react';
import { Link, navigate } from '../router.jsx';
import { useStore, courseProgress, stats } from '../store.jsx';
import { getCourse, findLesson } from '../data/courses.js';
import Icon from '../components/Icon.jsx';
import { ProgressBar } from '../components/Cards.jsx';
import Quiz from '../components/Quiz.jsx';
import NotFound from './NotFound.jsx';

function Block({ b }) {
  if (b.code) return <pre className="code">{b.code}</pre>;
  if (b.tip) return <div className="tip"><strong>Tip:</strong> {b.tip}</div>;
  return <p>{b.p}</p>;
}

export default function Lesson({ courseId, lessonId }) {
  const course = getCourse(courseId);
  const found = course ? findLesson(course, lessonId) : null;
  const { progress, user, completeLesson, recordQuiz, visitLesson } = useStore();

  useEffect(() => {
    if (found) visitLesson(courseId, lessonId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, lessonId]);

  if (!course || !found) {
    return (
      <div className="app">
        <main className="main"><NotFound /></main>
      </div>
    );
  }

  const { lesson, prev, next, index, total, moduleIndex } = found;
  const cp = courseProgress(progress, course);
  const isDone = !!progress.completed[lesson.id];
  const s = stats(progress);

  const complete = () => {
    completeLesson(course.id, lesson.id, lesson.minutes);
    if (next) navigate(`/learn/${course.id}/${next.id}`);
    else navigate(`/certificate/${course.id}`);
  };

  return (
    <div className="app lesson-page">
      <header className="lesson-top">
        <Link to={'/course/' + course.id} className="icon-btn" aria-label="Back to course overview">
          <Icon name="chevronLeft" size={20} />
        </Link>
        <span className="lesson-top__title">{course.title}</span>
        <span className="header__spacer" />
        <div className="lesson-top__progress">
          <span>Lesson {index + 1} of {total}</span>
          <ProgressBar pct={cp.pct} label="Course progress" />
        </div>
        <span className="streak-pill" title="Learning streak">
          <Icon name="flame" size={16} /> {s.streak}
        </span>
      </header>

      <div className="lesson-layout">
        <nav className="lesson-nav" aria-label="Lessons in this course">
          {course.modules.map((m, mi) => (
            <div key={mi} className="lesson-nav__group">
              <span className="lesson-nav__module">Module {mi + 1} · {m.title}</span>
              {m.lessons.map((l) => {
                const done = !!progress.completed[l.id];
                const current = l.id === lesson.id;
                return (
                  <Link key={l.id} to={`/learn/${course.id}/${l.id}`} className={'lesson-nav__item' + (current ? ' is-current' : '')} aria-current={current ? 'page' : undefined}>
                    <span className={'lesson-dot' + (done ? ' is-done' : current ? ' is-next' : '')}>{done && <Icon name="check" size={12} strokeWidth={3.5} />}</span>
                    <span className="lesson-nav__text">{l.title}</span>
                    <span className="muted small">{l.minutes}m</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <main id="main" className="lesson-main">
          <div className="lesson-banner" aria-hidden="true">
            <span className="deco lesson-banner__ring" />
            <span className="lesson-banner__code">{course.symbol}</span>
          </div>
          <div className="lesson-head">
            <span className="eyebrow eyebrow--blue">Module {moduleIndex + 1} · Lesson {index + 1} · {lesson.minutes} min</span>
            <h1 className="lesson-title">{lesson.title}</h1>
          </div>

          <article className="lesson-body">
            {lesson.body.map((b, i) => <Block key={i} b={b} />)}
          </article>

          <Quiz key={lesson.id} lessonId={lesson.id} questions={lesson.quiz} onFinish={(pct) => recordQuiz(lesson.id, pct)} />

          {!user && (
            <div className="notice">
              <Icon name="user" size={18} />
              <span>You’re learning as a guest. <Link to="/signup">Create a free account</Link> to keep your progress and earn certificates.</span>
            </div>
          )}

          <div className="lesson-foot">
            {prev ? (
              <Link to={`/learn/${course.id}/${prev.id}`} className="link-strong">← {prev.title}</Link>
            ) : (
              <Link to={'/course/' + course.id} className="link-strong">← Course overview</Link>
            )}
            <button type="button" className="btn btn--primary btn--lg" onClick={complete}>
              {isDone ? (next ? 'Next lesson →' : 'Finish course →') : next ? 'Mark complete & continue →' : 'Complete course →'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
