import { useCallback, useMemo, useState } from 'react';
import { ROXY_VALIDATION_ISSUES } from '../data/roxyErrors';
import { humanizeIssues } from '../lib/humanize';
import type { ErrorStatus, ValidationSummary } from '../types/validation';

/** Match Figma "4 found" — 8 of 12 sample issues start resolved. */
const INITIAL_RESOLVED: string[] = [
  'face-front',
  'hat',
  'hair',
  'face-center',
  'face-top',
  'neck',
  'left-upper-arm',
  'right-upper-arm',
];

export function useValidationRun() {
  const [runCount, setRunCount] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [lastRunAt, setLastRunAt] = useState<Date>(() => new Date());
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(
    () => new Set(INITIAL_RESOLVED),
  );
  const [previousResolvedCount, setPreviousResolvedCount] = useState(0);
  const [diffMessage, setDiffMessage] = useState<string | null>(null);

  const statusById = useMemo(() => {
    const map: Record<string, ErrorStatus> = {};
    for (const issue of ROXY_VALIDATION_ISSUES) {
      map[issue.id] = resolvedIds.has(issue.id) ? 'resolved' : 'open';
    }
    return map;
  }, [resolvedIds]);

  const issues = useMemo(
    () => humanizeIssues(ROXY_VALIDATION_ISSUES, statusById),
    [statusById],
  );

  const summary: ValidationSummary = useMemo(() => {
    const open = issues.filter((i) => i.status === 'open');
    return {
      errors: open.filter((i) => i.severity === 'error').length,
      warnings: open.filter((i) => i.severity === 'warning').length,
      blocking: open.filter((i) => i.blocking).length,
      resolvedSinceLastRun: previousResolvedCount,
      newSinceLastRun: 0,
    };
  }, [issues, previousResolvedCount]);

  const rerun = useCallback(() => {
    setIsRunning(true);
    setDiffMessage(null);

    window.setTimeout(() => {
      const openIds = ROXY_VALIDATION_ISSUES.map((i) => i.id).filter(
        (id) => !resolvedIds.has(id),
      );
      const nextResolved =
        openIds.length > 0
          ? openIds[Math.floor(Math.random() * openIds.length)]
          : null;

      let resolvedDelta = 0;
      if (nextResolved) {
        setResolvedIds((prev) => {
          const next = new Set(prev);
          next.add(nextResolved);
          resolvedDelta = 1;
          return next;
        });
      }

      const stillOpen = ROXY_VALIDATION_ISSUES.length - resolvedIds.size - resolvedDelta;
      setPreviousResolvedCount(resolvedDelta);
      setRunCount((c) => c + 1);
      setLastRunAt(new Date());
      setIsRunning(false);

      if (resolvedDelta > 0) {
        setDiffMessage(`1 issue resolved · ${stillOpen} warnings remaining`);
      } else {
        setDiffMessage(`No changes · ${stillOpen} warnings still open`);
      }
    }, 900);
  }, [resolvedIds]);

  const toggleResolved = useCallback((id: string) => {
    setResolvedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setDiffMessage(null);
  }, []);

  const reset = useCallback(() => {
    setResolvedIds(new Set());
    setRunCount(1);
    setPreviousResolvedCount(0);
    setDiffMessage(null);
    setLastRunAt(new Date());
  }, []);

  return {
    issues,
    summary,
    runCount,
    isRunning,
    lastRunAt,
    diffMessage,
    rerun,
    toggleResolved,
    reset,
  };
}

export type ValidationRunState = ReturnType<typeof useValidationRun>;
