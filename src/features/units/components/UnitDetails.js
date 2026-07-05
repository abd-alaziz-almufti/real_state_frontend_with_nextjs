import React, { useState } from 'react';
import { UnitsApi } from '../api';

export default function UnitDetails({ unit }) {
    const [ratingValue, setRatingValue] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    if (!unit) return null;

    const property = unit.property || {};
    const address = property.address || "Address not available";
    const title = property.name ? `${property.name} - ${unit.unit_number}` : `Unit ${unit.unit_number}`;
    const description = property.description || "No description available for this unit.";

    // In a real app we'd map features dynamically from unit.features
    const featuresList = unit.features?.length > 0 ? unit.features : [
        { icon: "not_interested", label: "No Features" },
    ];

    const handleRateSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
            await UnitsApi.rate(unit.id, { rating: ratingValue, review: reviewText });
            setSubmitSuccess(true);
            setReviewText('');
        } catch (err) {
            setSubmitError(err.response?.data?.message || err.message || 'Failed to submit rating');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="lg:col-span-8 space-y-12">
            {/* Header Info */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                        <h2 className="text-[32px] md:text-[48px] font-bold text-on-surface leading-tight tracking-tight mb-2">
                            {title}
                        </h2>
                        <div className="flex items-center gap-4 text-on-surface-variant flex-wrap mb-2">
                            <p className="text-[16px] md:text-[18px] flex items-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">location_on</span>
                                {address}
                            </p>
                            {unit.average_rating && (
                                <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                                    <span className="material-symbols-outlined text-[18px]">star</span>
                                    {unit.average_rating} ({unit.reviews_count} reviews)
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">share</span>
                        </button>
                        <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">favorite_border</span>
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-outline-variant/30">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-outline">bed</span>
                        <span className="text-[16px] text-on-surface font-semibold">{unit.bedrooms} Beds</span>
                    </div>
                    <div className="w-px h-6 bg-outline-variant/50 hidden sm:block"></div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-outline">shower</span>
                        <span className="text-[16px] text-on-surface font-semibold">{unit.bathrooms} Baths</span>
                    </div>
                    <div className="w-px h-6 bg-outline-variant/50 hidden sm:block"></div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-outline">square_foot</span>
                        <span className="text-[16px] text-on-surface font-semibold">{unit.sqft} sqft</span>
                    </div>
                    <div className="w-px h-6 bg-outline-variant/50 hidden sm:block"></div>
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${unit.status_color || 'bg-primary'}`}>
                            {unit.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div>
                <h3 className="text-[24px] font-semibold text-on-surface mb-4">About this property</h3>
                <p className="text-[16px] text-on-surface-variant leading-relaxed mb-4">
                    {description}
                </p>
            </div>

            {/* Unit Features */}
            <div>
                <h3 className="text-[24px] font-semibold text-on-surface mb-6">Unit Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {featuresList.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-outline text-[24px]">
                                {feature.icon || "check_circle"}
                            </span>
                            <span className="text-[16px] text-on-surface">
                                {feature.name || feature.label} 
                                {feature.value && feature.value !== 'true' ? ` : ${feature.value}` : ''}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rating Section */}
            <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/50">
                <h3 className="text-[24px] font-semibold text-on-surface mb-4">Rate this Unit</h3>
                <form onSubmit={handleRateSubmit} className="space-y-4">
                    {submitSuccess && (
                        <div className="bg-green-100 text-green-800 p-3 rounded-lg text-sm">
                            Thank you! Your rating has been submitted.
                        </div>
                    )}
                    {submitError && (
                        <div className="bg-red-100 text-red-800 p-3 rounded-lg text-sm">
                            {submitError}
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-sm font-medium text-on-surface-variant mb-2">Rating</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setRatingValue(star)}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >
                                    <span className={`material-symbols-outlined text-3xl ${ratingValue >= star ? 'text-yellow-400 fill-current' : 'text-outline-variant'}`} style={ratingValue >= star ? { fontVariationSettings: "'FILL' 1" } : {}}>
                                        star
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="review" className="block text-sm font-medium text-on-surface-variant mb-2">Review (Optional)</label>
                        <textarea
                            id="review"
                            rows="3"
                            className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3 focus:ring-primary focus:border-primary text-body-md"
                            placeholder="Share your experience..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-primary text-white rounded-xl font-button hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Rating'}
                    </button>
                </form>
            </div>
        </div>
    );
}
