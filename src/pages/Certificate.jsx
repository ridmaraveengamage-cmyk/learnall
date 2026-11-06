import { Link } from '../router.jsx';
import { useStore, courseProgress, nextLesson } from '../store.jsx';
import { getCourse } from '../data/courses.js';
import Icon from '../components/Icon.jsx';
import NotFound from './NotFound.jsx';

export default function Certificate({ courseId }) {
  const course = getCourse(courseId);
  const { user, progress } = useStore();
  if (!course) return <NotFound />;
  const cp = courseProgress(progress, course);
  const finished = cp.done === cp.total;
  const next = nextLesson(progress, course);
  const dates = Object.entries(progress.completed).filter(([id]) => course.modules.some((m) => m.lessons.some((l) => l.id === id))).map(([, d]) => d).sort();
  const date = dates.length ? new Date(dates[dates.length - 1] + 'T00:00:00').toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  return (
    <div className="cert-page">
      <div className="cert-page__bar no-print">
        <Link to="/dashboard" className="btn btn--ghost"><Icon name="chevronLeft" size={18} /> My learning</Link>
        {finished && user && <button type="button" className="btn btn--primary" onClick={() => window.print()}><Icon name="printer" size={18} /> Print or save as PDF</button>}
      </div>

      {!finished ? (
        <div className="cert-locked">
          <span className="big-icon"><Icon name="lock" size={32} /></span>
          <h1 className="auth__title">Certificate locked</h1>
          <p className="muted">Finish all {cp.total} lessons in {course.title} to unlock it. You’ve done {cp.done} so far.</p>
          {next && <Link to={`/learn/${course.id}/${next.id}`} className="btn btn--primary btn--lg">Continue: {next.title}</Link>}
        </div>
      ) : !user ? (
        <div className="cert-locked">
          <span className="big-icon"><Icon name="award" size={32} /></span>
          <h1 className="auth__title">You finished {course.title}!</h1>
          <p className="muted">Create a free account to put your name on the certificate. Your progress moves with you.</p>
          <Link to="/signup" className="btn btn--primary btn--lg">Create account</Link>
        </div>
      ) : (
        <div className="cert">
          <span className="deco cert__ring" />
          <div className="cert__logo">
            <span className="logo__mark" aria-hidden="true"><span className="logo__dot" /></span>
            <span>LearnAll</span>
          </div>
          <span className="cert__kicker">Certificate of completion</span>
          <span className="cert__presented">This certifies that</span>
          <span className="cert__name">{user.name}</span>
          <span className="cert__presented">has successfully completed</span>
          <span className="cert__course">{course.title}</span>
          <span className="cert__meta">{cp.total} lessons · {course.level}</span>
          <div className="cert__foot">
            <span><strong>{date}</strong><small>Date</small></span>
            <span className="cert__seal" aria-hidden="true"><Icon name="award" size={30} /></span>
            <span><strong>LA-{course.id.toUpperCase()}-{(user.email.length * 7919).toString(36).toUpperCase()}</strong><small>Certificate ID</small></span>
          </div>
        </div>
      )}
    </div>
  );
}
