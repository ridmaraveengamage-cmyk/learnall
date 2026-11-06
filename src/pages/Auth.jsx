import { useState } from 'react';
import { Link, navigate } from '../router.jsx';
import { useStore } from '../store.jsx';
import { SUBJECTS } from '../data/courses.js';
import Icon from '../components/Icon.jsx';
import { Logo } from '../components/Layout.jsx';

function PasswordField({ id, value, onChange, autoComplete, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="field">
      <label htmlFor={id}>Password</label>
      <div className="input-wrap">
        <input id={id} type={show ? 'text' : 'password'} autoComplete={autoComplete} placeholder={placeholder} value={value} onChange={onChange} required minLength={8} />
        <button type="button" className="input-wrap__btn" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'}>
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
}

function AuthShell({ side, children, topRight }) {
  return (
    <div className="auth">
      <main className="auth__main">
        <div className="auth__top">
          <Logo />
          {topRight}
        </div>
        <div className="auth__form">{children}</div>
      </main>
      <aside className="auth__side">{side}</aside>
    </div>
  );
}

function SignupSide() {
  return (
    <>
      <span className="deco auth__ring" />
      <h2 className="auth__side-title">Start learning today. <span className="hl-yellow">It’s free.</span></h2>
      <p className="auth__side-lead">Save your progress, earn certificates and get lessons picked for you.</p>
      <ul className="auth__benefits">
        <li><span><Icon name="chart" size={20} /></span>Track progress on any device</li>
        <li><span><Icon name="award" size={20} /></span>Earn certificates and badges</li>
        <li><span><Icon name="globe" size={20} /></span>Courses for school, work and life</li>
      </ul>
    </>
  );
}

export function Signup() {
  const { signUp, updateUser } = useStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', password: '', agree: false });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [prefs, setPrefs] = useState({ role: 'Student', interests: ['technology', 'languages'], dailyGoal: 15 });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) return setError('Please enter your name.');
    if (form.password.length < 8) return setError('Your password needs at least 8 characters.');
    if (!form.agree) return setError('Please agree to the Terms and Privacy policy.');
    setBusy(true);
    const err = await signUp(form);
    setBusy(false);
    if (err) return setError(err);
    setStep(2);
  };

  const finish = () => {
    updateUser(prefs);
    navigate('/dashboard');
  };

  const toggleInterest = (id) =>
    setPrefs((p) => ({ ...p, interests: p.interests.includes(id) ? p.interests.filter((x) => x !== id) : [...p.interests, id] }));

  return (
    <AuthShell side={<SignupSide />} topRight={<span className="muted small">Have an account? <Link to="/login">Log in</Link></span>}>
      <div className="steps-mini" aria-label={`Step ${step} of 2`}>
        <span className="is-on" /><span className={step === 2 ? 'is-on' : ''} />
        <small>Step {step} of 2</small>
      </div>

      {step === 1 ? (
        <form onSubmit={submit} className="form" noValidate>
          <div>
            <h1 className="auth__title">Create your account</h1>
            <p className="muted">Free to join. No payment details needed.</p>
          </div>
          <label className="field">
            <span>Full name</span>
            <input type="text" autoComplete="name" placeholder="e.g. Nimal Perera" value={form.name} onChange={set('name')} required />
          </label>
          <label className="field">
            <span>Email or phone</span>
            <input type="text" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={set('email')} required />
          </label>
          <PasswordField id="su-pw" autoComplete="new-password" placeholder="At least 8 characters" value={form.password} onChange={set('password')} />
          <label className="check">
            <input type="checkbox" checked={form.agree} onChange={set('agree')} />
            <span>I agree to the Terms of use and Privacy policy.</span>
          </label>
          {error && <div className="form-error" role="alert">{error}</div>}
          <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={busy || !form.email.trim()}>
            {busy ? 'Creating…' : 'Create account →'}
          </button>
          <p className="muted small">Under 16? Ask a parent or guardian to help you sign up.</p>
        </form>
      ) : (
        <div className="form">
          <div>
            <h1 className="auth__title">Make it yours</h1>
            <p className="muted">We’ll suggest your first lessons. You can change this anytime.</p>
          </div>
          <fieldset className="fieldset">
            <legend>I am a…</legend>
            <div className="opt-grid">
              {['Student', 'Adult learner', 'Parent', 'Teacher'].map((r) => (
                <button key={r} type="button" aria-pressed={prefs.role === r} className={'opt' + (prefs.role === r ? ' is-on' : '')} onClick={() => setPrefs((p) => ({ ...p, role: r }))}>{r}</button>
              ))}
            </div>
          </fieldset>
          <fieldset className="fieldset">
            <legend>I want to learn… <span className="muted">(pick any)</span></legend>
            <div className="pill-row">
              {SUBJECTS.map((s) => (
                <button key={s.id} type="button" aria-pressed={prefs.interests.includes(s.id)} className={'pill' + (prefs.interests.includes(s.id) ? ' is-on' : '')} onClick={() => toggleInterest(s.id)}>{s.name}</button>
              ))}
            </div>
          </fieldset>
          <fieldset className="fieldset">
            <legend>Daily goal</legend>
            <div className="opt-grid opt-grid--4">
              {[5, 15, 30, 60].map((m) => (
                <button key={m} type="button" aria-pressed={prefs.dailyGoal === m} className={'opt' + (prefs.dailyGoal === m ? ' is-on' : '')} onClick={() => setPrefs((p) => ({ ...p, dailyGoal: m }))}>{m === 60 ? '1h' : m + 'm'}</button>
              ))}
            </div>
          </fieldset>
          <button type="button" className="btn btn--primary btn--lg btn--block" onClick={finish}>Start learning →</button>
        </div>
      )}
    </AuthShell>
  );
}

export function Login() {
  const { logIn } = useStore();
  const [view, setView] = useState('login');
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    const err = await logIn(form);
    setBusy(false);
    if (err) return setError(err);
    navigate('/dashboard');
  };

  const side = (
    <>
      <span className="deco auth__ring auth__ring--top" />
      <h2 className="auth__side-title">Your progress is <span className="hl-yellow">waiting.</span></h2>
      <p className="auth__side-lead">Keep your streak alive. Even five minutes a day adds up.</p>
    </>
  );

  return (
    <AuthShell side={side} topRight={<span className="muted small">New here? <Link to="/signup">Create account</Link></span>}>
      {view === 'login' && (
        <form onSubmit={submit} className="form">
          <div>
            <h1 className="auth__title">Welcome back</h1>
            <p className="muted">Log in to pick up where you left off.</p>
          </div>
          <label className="field">
            <span>Email or phone</span>
            <input type="text" autoComplete="username" placeholder="you@example.com" value={form.email} onChange={set('email')} required />
          </label>
          <PasswordField id="li-pw" autoComplete="current-password" placeholder="Your password" value={form.password} onChange={set('password')} />
          <button type="button" className="link-btn align-end" onClick={() => setView('forgot')}>Forgot password?</button>
          {error && <div className="form-error" role="alert">{error}</div>}
          <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={busy}>{busy ? 'Logging in…' : 'Log in →'}</button>
        </form>
      )}
      {view === 'forgot' && (
        <form className="form" onSubmit={(e) => { e.preventDefault(); setView('sent'); }}>
          <button type="button" className="btn btn--ghost align-start" onClick={() => setView('login')}><Icon name="chevronLeft" size={18} /> Back to log in</button>
          <div>
            <h1 className="auth__title">Forgot your password?</h1>
            <p className="muted">Enter your email or phone and we’ll send you a reset link.</p>
          </div>
          <label className="field">
            <span>Email or phone</span>
            <input type="text" autoComplete="username" placeholder="you@example.com" required />
          </label>
          <button type="submit" className="btn btn--primary btn--lg btn--block">Send reset link</button>
          <p className="muted small">This demo has no email server yet, so no message is actually sent.</p>
        </form>
      )}
      {view === 'sent' && (
        <div className="form form--center" role="status">
          <span className="big-icon"><Icon name="check" size={34} strokeWidth={2.6} /></span>
          <h1 className="auth__title">Check your inbox</h1>
          <p className="muted">If an account exists for that address, we’ve sent a reset link. It may take a minute to arrive.</p>
          <button type="button" className="btn btn--primary btn--lg" onClick={() => setView('login')}>Back to log in</button>
        </div>
      )}
    </AuthShell>
  );
}
