import { useState } from 'react';
import { useStore } from '../store.jsx';
import { navigate } from '../router.jsx';
import Icon from '../components/Icon.jsx';

export default function ChooseLook() {
  const { theme, setTheme } = useStore();
  const [look, setLook] = useState(theme || 'bold');

  const go = () => {
    setTheme(look);
    navigate('/');
  };

  return (
    <div className="choose">
      <div className="choose__top">
        <span className="logo logo--static">
          <span className="logo__mark" aria-hidden="true"><span className="logo__dot" /></span>
          <span className="logo__word">LearnAll</span>
        </span>
      </div>
      <div className="choose__intro">
        <span className="eyebrow eyebrow--blue">Welcome</span>
        <h1>How would you like LearnAll to look?</h1>
        <p>Pick the style you enjoy most. Same lessons, same features. You can switch anytime in Settings.</p>
      </div>

      <div className="choose__cards" role="radiogroup" aria-label="Site look">
        <button type="button" role="radio" aria-checked={look === 'bold'} className={'look-card' + (look === 'bold' ? ' is-on' : '')} onClick={() => setLook('bold')}>
          <div className="look-prev look-prev--bold" aria-hidden="true">
            <div className="lp-nav"><span className="lp-sq" /><span className="lp-line" /><span className="lp-btn" /></div>
            <span className="lp-head">Learn <b>anything.</b><br />Grow <i>every day.</i></span>
            <div className="lp-tiles"><span className="lp-t1"><span className="lp-ring" /></span><span className="lp-t2" /><span className="lp-t3" /></div>
          </div>
          <div className="look-card__text">
            <span>
              <strong className="look-card__title look-card__title--bold">Bold &amp; playful</strong>
              <span className="look-card__desc">Bright colours, big type and fun shapes. Great for students and young learners.</span>
            </span>
            <span className="look-card__dot">{look === 'bold' && <Icon name="check" size={16} strokeWidth={3.5} />}</span>
          </div>
        </button>

        <button type="button" role="radio" aria-checked={look === 'pro'} className={'look-card' + (look === 'pro' ? ' is-on' : '')} onClick={() => setLook('pro')}>
          <div className="look-prev look-prev--pro" aria-hidden="true">
            <div className="lpp-nav"><span className="lpp-sq" /><span className="lpp-line" /><span style={{ flex: 1 }} /><span className="lpp-btn" /></div>
            <div className="lpp-body">
              <div className="lpp-left">
                <span className="lpp-accent" />
                <span className="lpp-head">Build skills that move your life forward.</span>
                <span className="lpp-l1" /><span className="lpp-l2" />
                <span className="lpp-btns"><span className="lpp-b1" /><span className="lpp-b2" /></span>
              </div>
              <div className="lpp-card"><span className="lpp-video" /><span className="lpp-l3" /></div>
            </div>
          </div>
          <div className="look-card__text">
            <span>
              <strong className="look-card__title">Clean &amp; professional</strong>
              <span className="look-card__desc">Calm colours, simple layout and less on screen. Great for working adults and focused study.</span>
            </span>
            <span className="look-card__dot">{look === 'pro' && <Icon name="check" size={16} strokeWidth={3.5} />}</span>
          </div>
        </button>
      </div>

      <div className="choose__go">
        <button type="button" className="btn btn--primary btn--lg btn--pill" onClick={go}>
          Continue with {look === 'bold' ? 'Bold' : 'Professional'} →
        </button>
        <span>Not sure? Start with Bold — you can change it later.</span>
      </div>
    </div>
  );
}
