import React from 'react';
import Link from 'next/link';

export default function AgencyCard({ agency }) {
  const {
    id,
    name,
    logo,
    verified,
    relation,
    badge,
    badgeType,
    hq,
    branches,
    agents_count,
    agents_avatars = [],
    rating,
    properties_count,
    partner_developers,
    phone,
    email
  } = agency;

  // Map badgeType to Tailwind style classes
  const getBadgeClass = (type) => {
    switch (type) {
      case 'elite':
        return 'bg-secondary/10 text-secondary';
      case 'exclusive':
        return 'bg-primary/10 text-primary';
      case 'high_growth':
        return 'bg-tertiary/10 text-tertiary';
      default:
        return 'bg-surface-variant text-on-surface-variant';
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 hover-lift border border-outline-variant/20 flex flex-col h-full bg-white/80 dark:bg-inverse-surface/80">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-white shadow-sm border border-outline-variant/30 flex items-center justify-center p-2">
            <img 
              className="w-full h-full object-contain" 
              alt={`${name} Logo`} 
              src={logo}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-headline-md text-headline-md text-on-surface">{name}</h3>
              {verified && (
                <span 
                  className="material-symbols-outlined text-primary text-[18px]" 
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              )}
            </div>
            <p className="text-label-caps text-on-surface-variant font-label-caps uppercase">{relation}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-label-caps font-label-caps ${getBadgeClass(badgeType)}`}>
          {badge}
        </div>
      </div>

      <div className="mb-6 flex-1 flex flex-col justify-between">
        <div className="space-y-4 mb-4">
          <div className="flex items-center gap-3 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px] text-outline">location_on</span>
            <span className="text-body-md">HQ: {hq} | Branches: {branches}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {agents_avatars.slice(0, 3).map((avatar, idx) => (
                <img 
                  key={idx}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover" 
                  alt="Agent avatar" 
                  src={avatar}
                />
              ))}
              {agents_count > 3 && (
                <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-on-surface">
                  +{agents_count - 3}
                </div>
              )}
            </div>
            <span className="text-body-md text-on-surface-variant">{agents_count} Registered Agents</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/20">
          <div>
            <div className="flex items-center gap-1 text-primary">
              <span 
                className="material-symbols-outlined text-[18px]" 
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="font-bold text-headline-md">{rating.toFixed(1)}</span>
            </div>
            <div className="text-label-caps text-on-surface-variant font-label-caps uppercase">Rating</div>
          </div>
          <div>
            <div className="font-bold text-headline-md text-on-surface">{properties_count}+</div>
            <div className="text-label-caps text-on-surface-variant font-label-caps uppercase">Properties</div>
          </div>
        </div>
      </div>

      <div className="text-label-caps text-on-surface-variant mb-6 px-3 py-2 bg-surface-container-low rounded-lg w-full font-label-caps">
        Partner of <span className="font-bold text-on-surface">{partner_developers}</span>
      </div>

      <div className="flex gap-2">
        <Link 
          href={`/agencies/${id}`}
          className="flex-1 bg-primary text-white py-3 rounded-lg font-button text-button hover:bg-primary-container text-center transition-all active:scale-95 shadow-md flex items-center justify-center"
        >
          View Portfolio & Team
        </Link>
        <div className="flex gap-1">
          {phone && (
            <a 
              href={`tel:${phone}`}
              className="w-12 h-12 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-variant/20 transition-all"
              title="Call Agency"
            >
              <span className="material-symbols-outlined">call</span>
            </a>
          )}
          {email && (
            <a 
              href={`mailto:${email}`}
              className="w-12 h-12 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-variant/20 transition-all"
              title="Email Agency"
            >
              <span className="material-symbols-outlined">mail</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
