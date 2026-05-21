import type { HumanizedIssue } from '../types/validation';
import './ErrorCard.css';

interface ErrorCardProps {
  issue: HumanizedIssue;
  expanded: boolean;
  onToggle: () => void;
  onMarkResolved: () => void;
}

export function ErrorCard({
  issue,
  expanded,
  onToggle,
  onMarkResolved,
}: ErrorCardProps) {
  return (
    <article
      className={`error-card error-card--${issue.status} error-card--${issue.severity}`}
    >
      <button
        type="button"
        className="error-card__header"
        onClick={onToggle}
        aria-expanded={expanded}
      >
        <span className={`error-card__badge error-card__badge--${issue.severity}`}>
          {issue.severity}
        </span>
        <div className="error-card__titles">
          <h3>{issue.title}</h3>
          {issue.part && <p className="error-card__part">{issue.part}</p>}
        </div>
        <span className="error-card__chevron" aria-hidden>
          {expanded ? '▾' : '▸'}
        </span>
      </button>

      {expanded && (
        <div className="error-card__body">
          <dl className="error-card__fields">
            <div>
              <dt>What&apos;s wrong</dt>
              <dd>{issue.summary}</dd>
            </div>
            <div>
              <dt>Why it matters</dt>
              <dd>{issue.whyItMatters}</dd>
            </div>
            <div>
              <dt>How to fix</dt>
              <dd>{issue.howToFix}</dd>
            </div>
          </dl>

          <details className="error-card__technical">
            <summary>Technical message</summary>
            <code>{issue.technical}</code>
          </details>

          <div className="error-card__actions">
            <a href={issue.docUrl} target="_blank" rel="noreferrer">
              Open guide
            </a>
            <button type="button" onClick={onMarkResolved}>
              {issue.status === 'resolved' ? 'Mark as open' : 'Mark resolved'}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
