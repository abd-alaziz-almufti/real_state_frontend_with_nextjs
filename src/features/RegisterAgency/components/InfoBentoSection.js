import React from 'react';

export default function InfoBentoSection() {
  return (
    <div className="w-full max-w-container-max grid grid-cols-1 md:grid-cols-3 gap-gutter">
      <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-xl flex items-start gap-4">
        <div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-on-secondary-container" data-icon="verified">verified</span>
        </div>
        <div>
          <h3 className="font-headline-md text-body-lg font-bold mb-1">Verify Identity</h3>
          <p className="font-body-md text-on-surface-variant text-sm">Automated brokerage verification ensures your team has instant access to verified listing databases.</p>
        </div>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-xl flex items-start gap-4">
        <div className="w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-primary" data-icon="security">security</span>
        </div>
        <div>
          <h3 className="font-headline-md text-body-lg font-bold mb-1">Role-Based Access</h3>
          <p className="font-body-md text-on-surface-variant text-sm">Control exactly what listings and data each agent can see with fine-grained permission layers.</p>
        </div>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-xl flex items-start gap-4">
        <div className="w-12 h-12 bg-tertiary-container/10 rounded-lg flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-tertiary" data-icon="insights">insights</span>
        </div>
        <div>
          <h3 className="font-headline-md text-body-lg font-bold mb-1">Live Analytics</h3>
          <p className="font-body-md text-on-surface-variant text-sm">Track your onboarding progress and property performance through your personal agency dashboard.</p>
        </div>
      </div>
    </div>
  );
}
