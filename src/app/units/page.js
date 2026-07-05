"use client";
import React, { useState, useEffect } from 'react';
import {
    useUnitsList,
    UnitsFilterBar,
    UnitsAdvancedFilter,
    UnitExploreCard
} from '@/features/units';
import Pagination from '@/components/Pagination';

export default function UnitsPage() {
    const [filters, setFilters] = useState({
        search: '',
        type: 'All',
        min_price: '',
        max_price: '',
        bedrooms: 'Any',
        sort: 'newest_to_oldest',
        amenities: []
    });

    const { units, meta, loading, error, changePage, updateFilters } = useUnitsList({ page: 1, ...filters });
    const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

    // Apply filters whenever they change
    useEffect(() => {
        updateFilters(filters);
    }, [filters, updateFilters]);

    // Close advanced filter when clicking outside (on desktop) or pressing Esc
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsAdvancedFilterOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleApplyAdvancedFilters = (advancedFilters) => {
        setFilters(prev => ({ ...prev, ...advancedFilters }));
        setIsAdvancedFilterOpen(false);
    };

    return (
        <div className="min-h-screen bg-background relative">
            {/* Overlay for Sidebar */}
            {isAdvancedFilterOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
                    onClick={() => setIsAdvancedFilterOpen(false)}
                ></div>
            )}
            <UnitsFilterBar 
                filters={filters} 
                onFilterChange={handleFilterChange} 
                onOpenAdvancedFilter={() => setIsAdvancedFilterOpen(true)} 
            />
            <div className="max-w-container-max mx-auto px-margin-desktop py-12 flex gap-gutter relative z-0">
                <div className="flex-1 w-full">
                    {/* Header */}
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="font-headline-lg text-headline-lg text-on-surface">Explore Properties</h1>
                            <p className="text-on-surface-variant text-body-md mt-1">
                                {loading
                                    ? "Loading available properties..."
                                    : `Showing ${meta?.total || 0} available properties`
                                }
                            </p>
                        </div>
                        <div className="hidden sm:block">
                            {!loading && meta && (
                                <span className="text-label-caps font-label-caps text-outline uppercase tracking-widest">
                                    Page {meta.current_page} of {meta.last_page}
                                </span>
                            )}
                        </div>
                    </div>
                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center min-h-[40vh]">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    )}
                    {/* Error State */}
                    {error && !loading && (
                        <div className="flex flex-col justify-center items-center min-h-[40vh] text-center">
                            <span className="material-symbols-outlined text-[48px] text-error mb-4">error</span>
                            <h3 className="text-headline-md text-error mb-2">Failed to load properties</h3>
                            <p className="text-on-surface-variant">{error}</p>
                        </div>
                    )}
                    {/* Empty State */}
                    {!loading && !error && units.length === 0 && (
                        <div className="flex flex-col justify-center items-center min-h-[40vh] text-center bg-white rounded-3xl border border-outline-variant/30 p-8">
                            <span className="material-symbols-outlined text-[48px] text-outline mb-4">search_off</span>
                            <h3 className="text-headline-md text-on-surface mb-2">No properties found</h3>
                            <p className="text-on-surface-variant">Try adjusting your filters or search terms.</p>
                        </div>
                    )}
                    {/* Properties Grid */}
                    {!loading && !error && units.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
                                {units.map((unit) => (
                                    <UnitExploreCard key={unit.id} unit={unit} />
                                ))}
                            </div>
                            {/* Pagination Component */}
                            <Pagination meta={meta} onPageChange={changePage} />
                        </>
                    )}
                </div>
            </div>
            <UnitsAdvancedFilter
                isOpen={isAdvancedFilterOpen}
                onClose={() => setIsAdvancedFilterOpen(false)}
                filters={filters}
                onApplyFilters={handleApplyAdvancedFilters}
            />
        </div>
    );
}
