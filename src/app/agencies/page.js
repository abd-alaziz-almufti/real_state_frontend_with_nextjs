'use client';

import React, { useState, useEffect } from 'react';
import { useAgenciesList, AgencyCard } from '@/features/agencies';
import Pagination from '@/components/Pagination';

export default function AgenciesPage() {
  const { agencies, meta, loading, error, params, changePage, updateFilters } = useAgenciesList({
    page: 1,
    search: '',
    serviceArea: 'Service Area',
    size: 'Agency Size',
    type: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [serviceArea, setServiceArea] = useState('Service Area');
  const [agencySize, setAgencySize] = useState('Agency Size');
  const [activeType, setActiveType] = useState('');

  // Synchronize initial param values if any
  useEffect(() => {
    setSearchQuery(params.search || '');
    setServiceArea(params.serviceArea || 'Service Area');
    setAgencySize(params.size || 'Agency Size');
    setActiveType(params.type || '');
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    updateFilters({
      search: searchQuery,
      serviceArea,
      size: agencySize,
      type: activeType
    });
  };

  const handleTypeClick = (type) => {
    const newType = activeType === type ? '' : type; // toggle
    setActiveType(newType);
    updateFilters({
      search: searchQuery,
      serviceArea,
      size: agencySize,
      type: newType
    });
  };

  const handleDropdownChange = (name, value) => {
    if (name === 'serviceArea') {
      setServiceArea(value);
      updateFilters({
        search: searchQuery,
        serviceArea: value,
        size: agencySize,
        type: activeType
      });
    } else if (name === 'size') {
      setAgencySize(value);
      updateFilters({
        search: searchQuery,
        serviceArea,
        size: value,
        type: activeType
      });
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Hero & Search Section */}
      <section className="relative pt-24 pb-16 px-margin-desktop max-w-container-max mx-auto">
        <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-headline-xl text-headline-xl mb-6 text-on-surface tracking-tight">
            Our Trusted Real Estate Network
          </h1>
          <p className="text-body-lg text-on-surface-variant mb-10">
            Connecting elite agencies with premium developer partnerships and enterprise-grade operational excellence.
          </p>

          {/* Glassmorphic Search Bar */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="glass-panel p-2 rounded-xl shadow-lg border border-outline-variant/20 flex flex-col md:flex-row items-center gap-2"
          >
            <div className="flex-1 flex items-center px-4 w-full">
              <span className="material-symbols-outlined text-primary mr-3">search</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-body-md py-4 text-on-surface placeholder:text-outline" 
                placeholder="Find by Name, Region, or Partner Developer" 
              />
            </div>
            
            <div className="h-8 w-px bg-outline-variant hidden md:block"></div>
            
            <div className="flex flex-wrap gap-2 p-2 w-full md:w-auto justify-end">
              <select 
                value={serviceArea}
                onChange={(e) => handleDropdownChange('serviceArea', e.target.value)}
                className="bg-surface-container-lowest border-none rounded-lg text-label-caps focus:ring-primary h-12 px-4 min-w-[140px] text-on-surface font-label-caps cursor-pointer shadow-sm"
              >
                <option value="Service Area">Service Area</option>
                <option value="North">North</option>
                <option value="Downtown">Downtown</option>
                <option value="Coastal">Coastal</option>
              </select>
              
              <select 
                value={agencySize}
                onChange={(e) => handleDropdownChange('size', e.target.value)}
                className="bg-surface-container-lowest border-none rounded-lg text-label-caps focus:ring-primary h-12 px-4 min-w-[140px] text-on-surface font-label-caps cursor-pointer shadow-sm"
              >
                <option value="Agency Size">Agency Size</option>
                <option value="Boutique">Boutique</option>
                <option value="Enterprise">Enterprise</option>
              </select>
              
              <button 
                type="submit"
                className="bg-primary text-white px-8 py-3 rounded-lg font-button text-button hover:bg-primary-container transition-all active:scale-95 shadow-md w-full sm:w-auto"
              >
                Search Network
              </button>
            </div>
          </form>

          {/* Secondary Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 items-center">
            <span className="text-label-caps font-label-caps text-on-surface-variant mr-2 uppercase">Partnership Types:</span>
            
            <button 
              type="button"
              onClick={() => handleTypeClick('Exclusive')}
              className={`px-4 py-1.5 rounded-full border text-label-caps font-label-caps transition-all ${
                activeType === 'Exclusive' 
                  ? 'bg-primary text-white border-primary' 
                  : 'border-outline-variant text-on-surface-variant hover:bg-primary/5 hover:border-primary'
              }`}
            >
              Exclusive
            </button>
            
            <button 
              type="button"
              onClick={() => handleTypeClick('Independent')}
              className={`px-4 py-1.5 rounded-full border text-label-caps font-label-caps transition-all ${
                activeType === 'Independent' 
                  ? 'bg-primary text-white border-primary' 
                  : 'border-outline-variant text-on-surface-variant hover:bg-primary/5 hover:border-primary'
              }`}
            >
              Independent
            </button>
            
            <button 
              type="button"
              onClick={() => handleTypeClick('Elite Developer Alliance')}
              className={`px-4 py-1.5 rounded-full border text-label-caps font-label-caps transition-all ${
                activeType === 'Elite Developer Alliance' 
                  ? 'bg-primary text-white border-primary' 
                  : 'border-outline-variant text-on-surface-variant hover:bg-primary/5 hover:border-primary'
              }`}
            >
              Elite Developer Alliance
            </button>
          </div>
        </div>
      </section>

      {/* Network Stats Banner */}
      <section className="px-margin-desktop max-w-container-max mx-auto mb-20">
        <div className="glass-panel rounded-2xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-outline-variant/30 p-10 shadow-sm border border-outline-variant/20 bg-white/40">
          <div className="px-6 py-4 md:py-0 text-center">
            <div className="text-headline-lg font-headline-lg text-primary mb-1">45</div>
            <div className="text-label-caps text-on-surface-variant uppercase tracking-widest font-label-caps">Total Agencies</div>
          </div>
          <div className="px-6 py-4 md:py-0 text-center">
            <div className="text-headline-lg font-headline-lg text-primary mb-1">600+</div>
            <div className="text-label-caps text-on-surface-variant uppercase tracking-widest font-label-caps">Certified Agents</div>
          </div>
          <div className="px-6 py-4 md:py-0 text-center">
            <div className="text-headline-lg font-headline-lg text-primary mb-1">12</div>
            <div className="text-label-caps text-on-surface-variant uppercase tracking-widest font-label-caps">Developer Partnerships</div>
          </div>
          <div className="px-6 py-4 md:py-0 text-center">
            <div className="text-headline-lg font-headline-lg text-primary mb-1">2,500+</div>
            <div className="text-label-caps text-on-surface-variant uppercase tracking-widest font-label-caps">Active Properties</div>
          </div>
        </div>
      </section>

      {/* Agency Grid Directory */}
      <section className="px-margin-desktop max-w-container-max mx-auto pb-24">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Verified Partner Directory</h2>
            <p className="text-on-surface-variant text-body-md mt-1">
              {loading 
                ? 'Loading agency data...' 
                : `Showing ${meta?.total || 0} active real estate firms`
              }
            </p>
          </div>
          <div className="flex gap-2">
            <button className="material-symbols-outlined p-2 border border-outline-variant rounded-lg text-primary bg-primary/5 hover:bg-surface-variant/20 transition-all">
              grid_view
            </button>
            <button className="material-symbols-outlined p-2 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-variant/20 transition-all">
              format_list_bulleted
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center min-h-[30vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col justify-center items-center min-h-[30vh] text-center">
            <span className="material-symbols-outlined text-[48px] text-error mb-4">error</span>
            <h3 className="text-headline-md text-error mb-2">Failed to load agencies</h3>
            <p className="text-on-surface-variant">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && agencies.length === 0 && (
          <div className="flex flex-col justify-center items-center min-h-[30vh] text-center bg-white rounded-3xl border border-outline-variant/30 p-8 shadow-sm">
            <span className="material-symbols-outlined text-[48px] text-outline mb-4">search_off</span>
            <h3 className="text-headline-md text-on-surface mb-2">No agencies found</h3>
            <p className="text-on-surface-variant">Try resetting your filters or adjusting your search term.</p>
          </div>
        )}

        {/* Agencies Grid */}
        {!loading && !error && agencies.length > 0 && (
          <>
            <div className="masonry-grid">
              {agencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
            {/* Pagination */}
            <Pagination meta={meta} onPageChange={changePage} />
          </>
        )}
      </section>
    </div>
  );
}
