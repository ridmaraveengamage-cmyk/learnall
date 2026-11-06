import { useState } from 'react';
import { Link } from '../router.jsx';
import { useStore, stats, courseProgress, nextLesson, formatMinutes, getCourse } from '../store.jsx';
import { COURSES } from '../data/courses.js';
import Icon from '../components/Icon.jsx';
import { ProgressBar, Ring, Thumb, Empty } from '../components/Cards.jsx';

export default function Dashboard() {
  const { user, progress } = useStore();
  const [tab, setTab] = useState('progress');
  const s = stats(progress);
  const goal = (user && user.dailyGoal) || 15;
  const goalPct = Math.min(100, Math.round((s.todayMinutes / goal) * 100));
  const maxWeek = Math.max(goal, ...s.week.map((d) => d.minutes));

  const withProgress = COURSES.map((c) => ({ c, cp: courseProgress(progress, c), next: nextLesson(progress, c) }));
  const inProgress = withProgress.filter((x) => x.cp.done > 0 && x.cp.done < x.cp.total);
  const completed = withProgress.filter((x) => x.cp.total > 0 && x.cp.done === x.cp.total);
  const saved = withProgress.filter((x) => progress.saved.includes(x.c.id));
  const lists = { progress: inProgress, completed, saved };
  const shown = lists[tab];

  const last = progress.last ? getCourse(progress.last.courseId) : null;
  const lastNext = last ? nextLesson(progress, last) : null;

  const recommended = COURSES.filter((c) => courseProgress(progress, c).done === 0 && (!user || !user.interests?.length || user.interests.includes(c.subject))).slice(0, 2);
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="wrap page dash">
      <div className="dash__head">
        <div>
          <span className="muted">{today}</span>
          <h1 className="page__title">{user ? `Welcome back, ${user.name.split(' ')[0]}` : 'My learning'}</h1>
        </div>
        {last && lastNext && (
          <Link to={`/learn/${last.id}/${lastNext.id}`} className="btn btn--primary">
            <Icon name="play" size={14} /> Resume {last.title}
          </Link>
        )}
      </div>

      {!user && (
        <div className="notice notice--wide">
          <Icon name="user" size={18} />
          <span>You’re learning as a guest. <Link to="/signup">Create a free account</Link> to keep this progress safe — it will move to your new account.</span>
        </div>
      )}

      <div className="stats">
        <div className="stat stat--yellow">
          <span className="stat__icon"><Icon name="flame" size={22} /></span>
          <span className="stat__num">{s.streak} {s.streak === 1 ? 'day' : 'days'}</span>
          <span className="stat__label">Learning streak</span>
        </div>
        <div className="stat stat--blue">
          <span className="stat__icon"><Icon name="clock" size={22} /></span>
          <span className="stat__num">{formatMinutes(s.weekMinutes)}</span>
          <span className="stat__label">Learned this week</span>
        </div>
        <div className="stat">
          <span className="stat__icon"><Icon name="check" size={22} strokeWidth={2.4} /></span>
          <span className="stat__num">{s.lessonsDone}</span>
          <span className="stat__label">Lessons completed</span>
        </div>
        <div className="stat">
          <span className="stat__icon stat__icon--y"><Icon name="award" size={22} /></span>
          <span className="stat__num">{s.avgQuiz != null ? s.avgQuiz + '%' : '—'}</span>
          <span className="stat__label">Average quiz score</span>
        </div>
      </div>

      <div className="dash__row">
        <section className="card dash__week" aria-labelledby="week-title">
          <div className="split">
            <h2 id="week-title" className="card__title">This week</h2>
            <span className="tag">Minutes per day</span>
          </div>
          <div className="chart" role="img" aria-label={'Minutes per day: ' + s.week.map((d) => `${d.label} ${d.minutes}`).join(', ')}>
            {s.week.map((d) => (
              <div key={d.key} className="chart__col">
                <span className="chart__val">{d.minutes || ''}</span>
                <div className={'chart__bar' + (d.isToday ? ' is-today' : d.minutes ? '' : ' is-empty')} style={{ height: Math.max(6, (d.minutes / maxWeek) * 100) + '%' }} />
                <span className={'chart__label' + (d.isToday ? ' is-today' : '')}>{d.isToday ? 'Today' : d.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card goal" aria-labelledby="goal-title">
          <span className="deco goal__ring" />
          <h2 id="goal-title" className="card__title">Daily goal</h2>
          <Ring pct={goalPct} size={140} label={`${s.todayMinutes} of ${goal} minutes today`} center={`${s.todayMinutes}/${goal}`} />
          <span className="goal__text">
            {s.todayMinutes >= goal ? 'Goal reached — great work!' : `${goal - s.todayMinutes} more minutes to reach today’s goal`}
          </span>
          <Link to={last && lastNext ? `/learn/${last.id}/${lastNext.id}` : '/learn/python/py-1'} className="btn btn--white">Do a quick lesson</Link>
        </section>
      </div>

      <div className="dash__row dash__row--wide">
        <section className="dash__courses" aria-labelledby="courses-title">
          <div className="split split--wrap">
            <h2 id="courses-title" className="card__title">My courses</h2>
            <div className="seg" role="tablist" aria-label="Filter courses">
              {[['progress', `In progress (${inProgress.length})`], ['completed', `Completed (${completed.length})`], ['saved', `Saved (${saved.length})`]].map(([k, label]) => (
                <button key={k} type="button" role="tab" aria-selected={tab === k} className={'seg__btn' + (tab === k ? ' is-on' : '')} onClick={() => setTab(k)}>{label}</button>
              ))}
            </div>
          </div>
          {shown.length ? (
            <div className="my-courses">
              {shown.map(({ c, cp, next }) => (
                <div key={c.id} className="my-course">
                  <Thumb color={c.color} symbol={c.symbol} size="sm" />
                  <div className="my-course__body">
                    <Link to={'/course/' + c.id} className="my-course__title">{c.title}</Link>
                    <ProgressBar pct={cp.pct} tone={cp.pct === 100 ? 'green' : 'blue'} label={c.title + ' progress'} />
                    <span className="muted small">{cp.done} of {cp.total} lessons · {cp.pct}%</span>
                  </div>
                  {cp.pct === 100 ? (
                    <Link to={'/certificate/' + c.id} className="btn btn--outline btn--sm">Certificate</Link>
                  ) : (
                    <Link to={next ? `/learn/${c.id}/${next.id}` : '/course/' + c.id} className="btn btn--primary btn--sm">{cp.done ? 'Continue' : 'Start'}</Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Empty icon={tab === 'saved' ? 'bookmark' : tab === 'completed' ? 'award' : 'book'} title={tab === 'saved' ? 'No saved courses yet' : tab === 'completed' ? 'No finished courses yet' : 'Nothing in progress'}>
              {tab === 'saved' ? 'Tap “Save for later” on any course page.' : 'Start a lesson and it will show up here.'}{' '}
              <Link to="/explore">Browse courses</Link>
            </Empty>
          )}
        </section>

        <aside className="dash__side">
          <section className="card" aria-labelledby="rec-title">
            <h2 id="rec-title" className="card__title card__title--sm">Recommended for you</h2>
            {recommended.length ? recommended.map((c) => (
              <Link key={c.id} to={'/course/' + c.id} className="rec">
                <Thumb color={c.color} symbol={c.symbol} size="xs" />
                <span><strong>{c.title}</strong><span className="muted small">{c.level}</span></span>
                <Icon name="chevronRight" size={16} />
              </Link>
            )) : <p className="muted">You’ve started everything in your interests. <Link to="/explore">Explore more</Link></p>}
          </section>
          <section className="card" aria-labelledby="cert-title">
            <h2 id="cert-title" className="card__title card__title--sm">Certificates</h2>
            {completed.length ? completed.map(({ c }) => (
              <Link key={c.id} to={'/certificate/' + c.id} className="rec">
                <span className="cert-icon"><Icon name="award" size={18} /></span>
                <span><strong>{c.title}</strong><span className="muted small">Ready to view and print</span></span>
                <Icon name="chevronRight" size={16} />
              </Link>
            )) : <p className="muted small">Finish every lesson in a course to earn its certificate.</p>}
          </section>
        </aside>
      </div>
    </div>
  );
}
