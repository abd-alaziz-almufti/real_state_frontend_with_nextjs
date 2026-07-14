'use client';

export default function ConfirmationDialog({
  open,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isLoading = false,
  onConfirm,
  onCancel,
  variant = 'danger',
}) {
  if (!open) return null;

  const confirmColor = variant === 'danger' ? '#dc2626' : '#4f46e5';
  const confirmHoverColor = variant === 'danger' ? '#b91c1c' : '#4338ca';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="confirmation-dialog-title">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-slate-950/40 backdrop-blur-sm"
        onClick={isLoading ? undefined : onCancel}
        aria-label="Close confirmation dialog"
      />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" style={{ border: '1px solid #e2e8f0' }}>
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: variant === 'danger' ? '#fef2f2' : '#eef2ff' }}>
          <span className="material-symbols-outlined" style={{ color: confirmColor }}>{variant === 'danger' ? 'warning' : 'help'}</span>
        </div>
        <h2 id="confirmation-dialog-title" className="text-lg font-bold" style={{ color: '#0f172a' }}>{title}</h2>
        {description && <p className="mt-2 text-sm leading-6" style={{ color: '#64748b' }}>{description}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-xl px-4 py-2 text-sm font-semibold transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ color: '#475569', border: '1px solid #e2e8f0' }}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex min-w-24 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: confirmColor }}
            onMouseEnter={(event) => { event.currentTarget.style.background = confirmHoverColor; }}
            onMouseLeave={(event) => { event.currentTarget.style.background = confirmColor; }}
          >
            {isLoading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
