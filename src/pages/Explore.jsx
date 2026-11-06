import { useEffect, useState } from 'react';
import { Link, navigate } from '../router.jsx';
import { COURSES, SUBJECTS, PATHS, allLessons } from '../data/courses.js';
import { CourseCard, Empty, Thumb } from '../components/Cards.jsx';
import Icon from '../components/Icon.jsx';

export default function Explore({ query }) {
  const [q, setQ] = useState(query.get('q') || '');
  const cat = query.get('cat') || 'all';
  const showPaths = query.get('paths') === '1';

  useEffect(() => setQ(query.get('q') || ''), [query]);

  const term = q.trim().toLowerCase();
  const list = COURSES.filter((c) => {
    if (cat !== 'all' && c.subject !== cat) return false;
    if (!term) return true;
    const hay = [c.title, c.summary, ...c.outcomes, ...allLessons(c).map((l) => l.title)].join(' ').toLowerCase();
    return hay.includes(term);
  });

  const setCat = (id) => {
    const p = new URLSearchParams();
    if (id !== 'all') p.set('cat', id);
    if (q.trim()) p.set('q', q.trim());
    navigate('/explore' + (p.toString() ? '?' + p : ''));
  };

  return (
    <div className="wrap page">
      <div className="page__head">
        <h1 className="page__title">{showPaths ? 'Learning paths' : 'Explore courses'}</h1>
        <p className="muted">{COURSES.length} courses across {SUBJECTS.filter((s) => COURSES.some((c) => c.subject === s.id)).length} subjects, with more on the way.</p>
      </div>

      {showPaths && (
        <div className="grid-3 section">
          {PATHS.map((p) => (
            <div key={p.id} className="path-card path-card--static">
              <Thumb color={p.color} symbol={p.symbol} size="lg" />
              <div className="path-card__body">
                <span className="eyebrow">{p.level}</span>
                <span className="path-card__title">{p.title}</span>
                <span className="muted">{p.desc}</span>
                <ol className="path-steps">
                  {p.courses.map((id) => {
                    const c = COURSES.find((x) => x.id === id);
                    return (
                      <li key={id}>
                        <Link to={'/course/' + id}>{c.title}</Link>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          ))}
        </div>
      )}

      <form className="search search--wide" role="search" onSubmit={(e) => { e.preventDefault(); setCat(cat); }}>
        <Icon name="search" size={20} />
        <label className="sr-only" htmlFor="explore-search">Search courses</label>
        <input id="explore-search" type="search" placeholder="Search courses and lessons" value={q} onChange={(e) => setQ(e.target.value)} />
        {q && <button type="button" className="btn btn--ghost" onClick={() => { setQ(''); navigate('/explore' + (cat !== 'all' ? '?cat=' + cat : '')); }}>Clear</button>}
      </form>

      <div className="filter-chips" role="tablist" aria-label="Subjects">
        {[{ id: 'all', name: 'All' }, ...SUBJECTS].map((s) => (
          <button key={s.id} type="button" role="tab" aria-selected={cat === s.id} className={'fchip' + (cat === s.id ? ' is-on' : '')} onClick={() => setCat(s.id)}>
            {s.name}
          </button>
        ))}
      </div>

      {list.length ? (
        <div className="grid-cards">
          {list.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      ) : (
        <Empty icon="search" title={cat !== 'all' && !term ? 'Courses coming soon' : 'No courses found'}>
          {cat !== 'all' && !term ? 'We’re still building courses for this subject.' : 'Try a different word, or browse all subjects.'}{' '}
          <button type="button" className="link-btn" onClick={() => { setQ(''); navigate('/explore'); }}>Show all courses</button>
        </Empty>
      )}
    </div>
  );
}
