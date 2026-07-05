'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useAgency } from '@/features/agencies';

export default function AgencyDetailPage({ params }) {
  const unwrappedParams = use(params);
  const agencyId = unwrappedParams.id;

  const { agency, loading, error } = useAgency(agencyId);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !agency) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-center">
        <div>
          <span className="material-symbols-outlined text-[48px] text-error mb-4">error</span>
          <h2 className="text-headline-lg text-error mb-2">Agency Not Found</h2>
          <p className="text-on-surface-variant mb-6">{error || 'The requested agency does not exist.'}</p>
          <Link href="/agencies" className="bg-primary text-white px-6 py-2 rounded-lg font-button text-button hover:bg-primary-container">
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative w-full h-[600px] overflow-hidden">
        <img 
          className="w-full h-full object-cover" 
          alt="Luxury Metropolitan Skyline" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4TToAC1seyH4JgA38Ci0MuUernBTR6lTVNH_lPXmbvaVpKCQJAgsC2FSOFMGWH_DrKHQl35F7KPlqUb1VsUPXymqTP5Q77bYQoy3p4GTeBDb9CUgBfox7LeblTgPcKF_61Ke-6qXJDn-la5VCTNfo8ciZ2Sm3-A7vd7FQUsAsWKtYYXYig8aLXQvvEp3nZRcpUEAiUjw7AZl92i-YgzfKFT0ezh2vs8eTKgyahg04Xy-J7R3bEcwDAeVz7SzyVjL4C6yemHtMUw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-background/60 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center px-margin-mobile md:px-0">
          <div className="glass-panel w-full max-w-4xl p-8 md:p-12 rounded-xl flex flex-col md:flex-row items-center gap-10 border border-white/40 shadow-2xl">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white p-2">
                <img 
                  className="w-full h-full object-contain" 
                  alt={`${agency.name} logo`} 
                  src={agency.logo}
                />
              </div>
              {agency.verified && (
                <div className="absolute bottom-1 right-1 bg-primary text-white p-1 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
                <h1 className="font-headline-xl text-headline-xl text-on-background tracking-tight">{agency.name}</h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-caps font-label-caps self-center md:self-auto uppercase">
                  {agency.badge}
                </span>
              </div>
              <p className="text-on-surface-variant font-body-md mb-8 max-w-lg">
                {agency.relation} - Dedicated to providing premium real estate solutions in {agency.hq}.
              </p>
              
              <div className="grid grid-cols-3 gap-4 border-t border-outline-variant/30 pt-8">
                <div>
                  <p className="text-primary font-bold text-headline-md">{agency.rating.toFixed(1)}/5</p>
                  <p className="text-outline font-label-caps text-label-caps uppercase">RATING</p>
                </div>
                <div>
                  <p className="text-primary font-bold text-headline-md">{agency.properties_count}+</p>
                  <p className="text-outline font-label-caps text-label-caps uppercase">MANAGED UNITS</p>
                </div>
                <div>
                  <p className="text-primary font-bold text-headline-md">{agency.years_active}</p>
                  <p className="text-outline font-label-caps text-label-caps uppercase">YEARS ACTIVE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* About Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">ABOUT OUR FIRM</span>
            <h2 className="font-headline-lg text-headline-lg text-on-background">{agency.aboutTitle || 'Curating Exceptional Living Experiences'}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              {agency.aboutDescription}
            </p>
            <p className="font-body-md text-body-md text-outline">
              {agency.aboutSubDescription}
            </p>
            <div className="pt-4 flex gap-4">
              <a 
                href={`tel:${agency.phone}`}
                className="px-6 py-4 bg-on-background text-white font-button rounded-lg hover:bg-on-background/90 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                Call Agency
              </a>
              <a 
                href={`mailto:${agency.email}`}
                className="px-6 py-4 border border-outline text-on-surface font-button rounded-lg hover:bg-surface transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">mail</span>
                Send Email
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 h-[400px]">
            <div className="rounded-xl overflow-hidden shadow-sm">
              <img 
                className="w-full h-full object-cover" 
                alt="Luxury Penthouse Dining Area" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-NsArWMalswOJdcpCgHjrPIHVCVmpPqYd4d9wzidk5qEU2A9qxlOM4akwdM0Ek55vx8ZA6OcOv3CTejk6WFIaeFjjwW42q9b65GmkmJLa-tRLiEnGPSFQu-p8WiT7F-VnbBcaqx5I1ROMXwjONbGz1P7Sj0bUGhRCQHAiO6dq2CE4viqrfrwSbCZ3zTuy2_pSc41mbxA9pxkFM6XfuS4qCgbsJyxNszRwcaHnzGPj5SDAc9jf0asdJRy1Zmq6TCgPh7Lq6d3_1A"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm mt-8">
              <img 
                className="w-full h-full object-cover" 
                alt="Architectural High-Rise Model" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy5Fh8LfF94nTMmdsCiNRSAjYPSoyLRUMN_F5aMx7_PdKMWLxh9tB55eTUKSDOHQj2-KmB2zmrNL-pBYgMWDcNp6ZC35yb-Usq7frYEsogPqjrcxZNgwdbkYA3_jHcAU0-t77XpQfMBYceFVNZ9SAcQVFsPm0943cjKoPa-717GKFAEd0Xni33PssRK-WJErm8NdKHmWB_8Qpbp2_FHxS5qxXapn99ewjbXZD3oQr-_dM_J7yzTNZLpj2TUyBN5cIdnJ5YCezfwQ"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Current Inventory Section */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <span className="font-label-caps text-label-caps text-primary uppercase">PORTFOLIO</span>
              <h2 className="font-headline-lg text-headline-lg text-on-background">Current Inventory</h2>
            </div>
            <div className="flex gap-2">
              <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-white transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-white transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {agency.inventory && agency.inventory.map((property) => (
              <div 
                key={property.id} 
                className="bg-white rounded-xl overflow-hidden hover-lift border border-outline-variant/20 shadow-sm"
              >
                <div className="relative h-64">
                  <img 
                    className="w-full h-full object-cover" 
                    alt={`Property ${property.title}`} 
                    src={property.image}
                  />
                  <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded text-label-caps font-label-caps">
                    {property.status}
                  </div>
                  <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline-md text-headline-md text-on-background">{property.title}</h3>
                    <span className="text-primary font-headline-md text-headline-md">{property.price}</span>
                  </div>
                  <p className="text-outline text-body-md">{property.address}</p>
                  
                  <div className="flex items-center gap-6 py-2 border-y border-outline-variant/20">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-outline">bed</span>
                      <span className="font-label-caps text-label-caps uppercase">{property.beds} BEDS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-outline">bathtub</span>
                      <span className="font-label-caps text-label-caps uppercase">{property.baths} BATHS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-outline">square_foot</span>
                      <span className="font-label-caps text-label-caps uppercase">{property.sqft} SQFT</span>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/units`} 
                    className="w-full py-4 bg-primary text-white font-button rounded-lg hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-colors flex items-center justify-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contrast Section (Expertise) */}
      <section className="py-24 bg-[#0f172a] text-white">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2">
              <span className="font-label-caps text-label-caps text-secondary-fixed mb-4 inline-block uppercase">OUR EXPERTISE</span>
              <h2 className="font-headline-xl text-headline-xl mb-6">Unrivaled Market Command</h2>
              <p className="text-outline-variant font-body-lg max-w-md text-outline">
                We focus exclusively on high-yield urban assets, ensuring our clients receive maximum value and tenants enjoy superior living standards.
              </p>
            </div>
            
            <div className="bg-white/5 p-8 rounded-xl border border-white/10">
              <span className="material-symbols-outlined text-secondary-fixed text-4xl mb-4 text-secondary-fixed">analytics</span>
              <h4 className="font-headline-md text-headline-md mb-2">Smart Valuation</h4>
              <p className="text-outline-variant text-body-md text-outline">
                Data-driven appraisal models that capture the true worth of unique architectural properties.
              </p>
            </div>
            
            <div className="bg-white/5 p-8 rounded-xl border border-white/10">
              <span className="material-symbols-outlined text-secondary-fixed text-4xl mb-4 text-secondary-fixed">support_agent</span>
              <h4 className="font-headline-md text-headline-md mb-2">24/7 Concierge</h4>
              <p className="text-outline-variant text-body-md text-outline">
                Dedicated support teams for every property under our management umbrella.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
