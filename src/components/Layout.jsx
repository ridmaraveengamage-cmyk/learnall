import { useState } from 'react';
import { Link, navigate } from '../router.jsx';
import { useStore } from '../store.jsx';
import Icon from './Icon.jsx';

export function Logo({ light }) {
  return (
    <Link to="/" className={'logo' + (light ? ' logo--light' : '')}>
      <span className="logo__mark" aria-hidden="true">
        <span className="logo__dot" />
      </span>
      <span className="logo__word">LearnAll</span>
    </Link>
  );
}

function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

export function Avatar({ name, size = 40 }) {
  return (
    <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.36 }} aria-hidden="true">
      {initials(name) || '?'}
    </span>
  );
}

export function Header({ path }) {
  const { user } = useStore();
  const [q, setQ] = useState('');
  const onSearch = (e) => {
    e.preventDefault();
    navigate('/explore' + (q.trim() ? '?q=' + encodeURIComponent(q.trim()) : ''));
  };
  const active = (p) => (path === p || path.startsWith(p + '/') ? 'nav__link is-active' : 'nav__link');
  return (
    <header className="header">
      <nav className="header__inner" aria-label="Main">
        <Logo />
        <div className="nav">
          <Link to="/explore" className={active('/explore')}>Explore</Link>
          {user && <Link to="/dashboard" className={active('/dashboard')}>My learning</Link>}
          <Link to="/explore?paths=1" className="nav__link hide-sm">Paths</Link>
        </div>
        <div className="header__spacer" />
        <form className="header__search" role="search" onSubmit={onSearch}>
          <Icon name="search" size={18} />
          <label className="sr-only" htmlFor="hsearch">Search courses</label>
          <input id="hsearch" type="search" placeholder="Search courses" value={q} onChange={(e) => setQ(e.target.value)} />
        </form>
        {user ? (
          <Link to="/settings" className="header__user" aria-label="Account settings">
            <Avatar name={user.name} size={38} />
            <span className="hide-sm">{user.name.split(' ')[0]}</span>
          </Link>
        ) : (
          <>
            <Link to="/login" className="btn btn--ghost">Log in</Link>
            <Link to="/signup" className="btn btn--primary">Get started free</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export function TabBar({ path }) {
  const { user } = useStore();
  const items = [
    { to: '/', label: 'Home', icon: 'home', on: path === '/' },
    { to: '/explore', label: 'Explore', icon: 'compass', on: path.startsWith('/explore') },
    { to: user ? '/dashboard' : '/login', label: 'My learning', icon: 'book', on: path.startsWith('/dashboard') },
    { to: user ? '/settings' : '/login', label: 'Account', icon: 'user', on: path.startsWith('/settings') || path === '/login' },
  ];
  return (
    <nav className="tabbar" aria-label="App">
      {items.map((it) => (
        <Link key={it.label} to={it.to} className={'tabbar__item' + (it.on ? ' is-active' : '')} aria-current={it.on ? 'page' : undefined}>
          <Icon name={it.icon} size={22} />
          <span>{it.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Logo light />
          <p>Learning for everyone, in your language.</p>
        </div>
        <div className="footer__col">
          <span>Learn</span>
          <Link to="/explore">Catalog</Link>
          <Link to="/explore?paths=1">Learning paths</Link>
          <Link to="/dashboard">My learning</Link>
        </div>
        <div className="footer__col">
          <span>Account</span>
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Log in</Link>
          <Link to="/settings">Settings</Link>
        </div>
      </div>
    </footer>
  );
}
