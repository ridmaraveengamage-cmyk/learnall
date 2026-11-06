import { Link } from '../router.jsx';
import { useStore, courseProgress } from '../store.jsx';
import { allLessons, subjectName } from '../data/courses.js';
import Icon from './Icon.jsx';

export function Thumb({ color = 'blue', symbol, size = 'md' }) {
  return (
    <div className={`thumb thumb--${color} thumb--${size}`} aria-hidden="true">
      <span className="thumb__ring deco" />
      <span className="thumb__symbol">{symbol}</span>
    </div>
  );
}

export function ProgressBar({ pct, tone = 'blue', label }) {
  return (
    <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className={'bar__fill bar__fill--' + tone} style={{ width: pct + '%' }} />
    </div>
  );
}

export function Ring({ pct, size = 110, label, center }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox="0 0 110 110" role="img" aria-label={label}>
      <circle cx="55" cy="55" r={r} fill="none" className="ring__track" strokeWidth="12" />
      <circle
        cx="55"
        cy="55"
        r={r}
        fill="none"
        className="ring__fill"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={`${(Math.min(pct, 100) / 100) * c} ${c}`}
        transform="rotate(-90 55 55)"
      />
      <text x="55" y="62" textAnchor="middle" className="ring__text">
        {center ?? pct + '%'}
      </text>
    </svg>
  );
}

export function CourseCard({ course }) {
  const { progress } = useStore();
  const cp = courseProgress(progress, course);
  const lessons = allLessons(course).length;
  return (
    <Link to={'/course/' + course.id} className="course-card">
      <Thumb color={course.color} symbol={course.symbol} />
      <div className="course-card__body">
        <span className="eyebrow">{subjectName(course.subject)}</span>
        <span className="course-card__title">{course.title}</span>
        <span className="course-card__desc">{course.summary}</span>
        <div className="course-card__foot">
          <span>
            {course.level} · {lessons} lessons
          </span>
          {cp.done > 0 ? (
            <span className="course-card__pct">{cp.pct}% done</span>
          ) : (
            <span className="course-card__cert">
              <Icon name="award" size={14} /> Certificate
            </span>
          )}
        </div>
        {cp.done > 0 && <ProgressBar pct={cp.pct} label={`${course.title} progress`} />}
      </div>
    </Link>
  );
}

export function Empty({ icon = 'book', title, children }) {
  return (
    <div className="empty">
      <span className="empty__icon">
        <Icon name={icon} size={26} />
      </span>
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
}
