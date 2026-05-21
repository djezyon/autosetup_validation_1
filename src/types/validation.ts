export type Severity = 'error' | 'warning' | 'info';

export type ErrorStatus = 'open' | 'resolved' | 'unchanged';

export interface ValidationIssue {
  id: string;
  technical: string;
  part?: string;
  severity: Severity;
  category: string;
}

export interface HumanizedIssue extends ValidationIssue {
  title: string;
  summary: string;
  whyItMatters: string;
  howToFix: string;
  blocking: boolean;
  docUrl: string;
  status: ErrorStatus;
}

export interface ValidationRun {
  id: string;
  label: string;
  at: string;
  issues: ValidationIssue[];
}

export interface ValidationSummary {
  errors: number;
  warnings: number;
  blocking: number;
  resolvedSinceLastRun: number;
  newSinceLastRun: number;
}
