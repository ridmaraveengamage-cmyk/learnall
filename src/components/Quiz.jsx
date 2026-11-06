import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';

// One question at a time: pick an answer, check it, see feedback, move on.
export default function Quiz({ questions, onFinish, lessonId }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setI(0);
    setPicked(null);
    setChecked(false);
    setCorrectCount(0);
    setDone(false);
  }, [lessonId]);

  if (!questions || questions.length === 0) return null;
  const q = questions[i];
  const letters = ['A', 'B', 'C', 'D', 'E'];

  const check = () => {
    if (picked === null) return;
    setChecked(true);
    if (picked === q.answer) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    if (i + 1 < questions.length) {
      setI(i + 1);
      setPicked(null);
      setChecked(false);
    } else {
      setDone(true);
      onFinish && onFinish(Math.round((correctCount / questions.length) * 100));
    }
  };

  const restart = () => {
    setI(0);
    setPicked(null);
    setChecked(false);
    setCorrectCount(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <section className="quiz" aria-labelledby="quiz-title">
        <div className="quiz__head">
          <h2 id="quiz-title" className="quiz__title">
            <span className="quiz__badge"><Icon name="bolt" size={16} /></span>
            Quick check
          </h2>
        </div>
        <div className="quiz__result" role="status">
          <span className="quiz__score">{pct}%</span>
          <p>
            You got {correctCount} of {questions.length} right.{' '}
            {pct === 100 ? 'Perfect!' : pct >= 50 ? 'Nice work.' : 'Review the lesson and try again.'}
          </p>
          <button type="button" className="btn btn--outline" onClick={restart}>Try again</button>
        </div>
      </section>
    );
  }

  return (
    <section className="quiz" aria-labelledby="quiz-title">
      <div className="quiz__head">
        <h2 id="quiz-title" className="quiz__title">
          <span className="quiz__badge"><Icon name="bolt" size={16} /></span>
          Quick check
        </h2>
        <span className="quiz__count">
          Question {i + 1} of {questions.length}
        </span>
      </div>
      <p className="quiz__q">{q.q}</p>
      <div className="quiz__options" role="radiogroup" aria-label="Answer choices">
        {q.options.map((opt, idx) => {
          let state = '';
          if (checked && idx === q.answer) state = ' is-correct';
          else if (checked && idx === picked) state = ' is-wrong';
          else if (idx === picked) state = ' is-picked';
          return (
            <button
              key={idx}
              type="button"
              role="radio"
              aria-checked={idx === picked}
              className={'quiz__opt' + state}
              onClick={() => !checked && setPicked(idx)}
            >
              <span className="quiz__letter">{letters[idx]}</span>
              {opt}
            </button>
          );
        })}
      </div>
      {checked && (
        <div className={'quiz__feedback ' + (picked === q.answer ? 'is-correct' : 'is-wrong')} role="status">
          <strong>{picked === q.answer ? 'Correct!' : 'Not quite.'}</strong> {q.explain}
        </div>
      )}
      <div className="quiz__actions">
        {!checked ? (
          <button type="button" className="btn btn--primary" disabled={picked === null} onClick={check}>
            Check answer
          </button>
        ) : (
          <button type="button" className="btn btn--primary" onClick={next}>
            {i + 1 < questions.length ? 'Next question →' : 'See result'}
          </button>
        )}
      </div>
    </section>
  );
}
