import './FixSnackbar.css';

interface FixSnackbarProps {
  message: string | null;
}

export function FixSnackbar({ message }: FixSnackbarProps) {
  if (!message) return null;

  return (
    <div className="fix-snackbar" role="status" aria-live="polite">
      <p className="fix-snackbar__text">{message}</p>
    </div>
  );
}
