import { useState } from 'react';
import { Link, navigate } from '../router.jsx';
import { useStore } from '../store.jsx';
import { SUBJECTS } from '../data/courses.js';
import Icon from '../components/Icon.jsx';
import { Avatar } from '../components/Layout.jsx';

export default function Settings() {
  const { user, theme, setTheme, logOut, updateUser, resetProgress } = useStore();
  const [confirmReset, setConfirmReset] = useState(false);
  const [name, setName] = useState(user ? user.name : '');
  const [savedMsg, setSavedMsg] = useState('');

  const saveName = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    updateUser({ name: name.trim() });
    setSavedMsg('Saved');
    setTimeout(() => setSavedMsg(''), 1500);
  };

  return (
    <div className="wrap page settings">
      <h1 className="page__title">Settings</h1>

      {user ? (
        <section className="card settings__profile">
          <Avatar name={user.name} size={56} />
          <form className="settings__name" onSubmit={saveName}>
            <label className="field">
              <span>Display name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <button type="submit" className="btn btn--outline">{savedMsg || 'Save'}</button>
          </form>
          <span className="muted small">Signed in as {user.email}</span>
        </section>
      ) : (
        <section className="card">
          <h2 className="card__title card__title--sm">You’re not logged in</h2>
          <p className="muted">Log in or create an account to save your progress and earn certificates.</p>
          <div className="row-gap">
            <Link to="/login" className="btn btn--outline">Log in</Link>
            <Link to="/signup" className="btn btn--primary">Create account</Link>
          </div>
        </section>
      )}

      <section className="card">
        <h2 className="card__title card__title--sm">Site look</h2>
        <p className="muted">Changes apply right away. Your lessons and progress stay the same.</p>
        <div className="look-options" role="radiogroup" aria-label="Site look">
          {[
            ['bold', 'Bold & playful', 'Bright colours, big type and fun shapes.'],
            ['pro', 'Clean & professional', 'Calm colours and a simple layout.'],
          ].map(([id, t, d]) => (
            <button key={id} type="button" role="radio" aria-checked={theme === id} className={'look-option' + (theme === id ? ' is-on' : '')} onClick={() => setTheme(id)}>
              <span className={'look-option__swatch look-option__swatch--' + id} aria-hidden="true" />
              <span><strong>{t}</strong><span className="muted small">{d}</span></span>
              <span className="look-card__dot">{theme === id && <Icon name="check" size={14} strokeWidth={3.5} />}</span>
            </button>
          ))}
        </div>
      </section>

      {user && (
        <section className="card">
          <h2 className="card__title card__title--sm">Learning preferences</h2>
          <div className="field">
            <span>Daily goal</span>
            <div className="opt-grid opt-grid--4">
              {[5, 15, 30, 60].map((m) => (
                <button key={m} type="button" aria-pressed={user.dailyGoal === m} className={'opt' + (user.dailyGoal === m ? ' is-on' : '')} onClick={() => updateUser({ dailyGoal: m })}>{m === 60 ? '1 hour' : m + ' min'}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <span>Interests</span>
            <div className="pill-row">
              {SUBJECTS.map((s) => {
                const on = (user.interests || []).includes(s.id);
                return (
                  <button key={s.id} type="button" aria-pressed={on} className={'pill' + (on ? ' is-on' : '')} onClick={() => updateUser({ interests: on ? user.interests.filter((x) => x !== s.id) : [...(user.interests || []), s.id] })}>{s.name}</button>
                );
              })}
            </div>
          </div>
          <label className="field">
            <span>Language</span>
            <select disabled defaultValue="en">
              <option value="en">English</option>
            </select>
            <span className="muted small">Sinhala and Tamil are planned for a later version.</span>
          </label>
        </section>
      )}

      <section className="card">
        <h2 className="card__title card__title--sm">Your data</h2>
        <p className="muted">Progress is saved in this browser only. Clearing your browser data will remove it.</p>
        {!confirmReset ? (
          <button type="button" className="btn btn--outline" onClick={() => setConfirmReset(true)}>Reset my progress</button>
        ) : (
          <div className="confirm" role="alertdialog" aria-label="Confirm reset">
            <span>This clears all completed lessons, quiz scores and saved courses. Continue?</span>
            <div className="row-gap">
              <button type="button" className="btn btn--danger" onClick={() => { resetProgress(); setConfirmReset(false); }}>Yes, reset</button>
              <button type="button" className="btn btn--ghost" onClick={() => setConfirmReset(false)}>Cancel</button>
            </div>
          </div>
        )}
      </section>

      {user && (
        <button type="button" className="btn btn--ghost settings__logout" onClick={() => { logOut(); navigate('/'); }}>
          <Icon name="logout" size={18} /> Log out
        </button>
      )}
    </div>
  );
}
