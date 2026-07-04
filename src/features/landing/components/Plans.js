import { usePlans } from '../hooks/usePlans';

const formatPrice = (price) => {
    const numericPrice = Number(price);
    return Number.isFinite(numericPrice) ? `$${numericPrice.toFixed(0)}` : `$${price}`;
};

const getFeatureItems = (features = {}) => {
    return Object.entries(features).map(([key, value]) => ({
        key,
        label: key.replace(/_/g, ' '),
        value
    }));
};


const formatFeatureValue = (key, value) => {
    if (typeof value === 'boolean') {
        return value ? 'Included' : 'Not included';
    }

    if (typeof value === 'number') {
        return `${value}`;
    }

    return value;
};

export const Plans = () => {
    const { plans, loading, error } = usePlans();

    if (loading) {
        return (
            <section className="max-w-container-max mx-auto px-margin-desktop py-24 text-center" id="pricing">
                <p className="text-headline-md text-on-surface-variant animate-pulse">Loading plans...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="max-w-container-max mx-auto px-margin-desktop py-24 text-center text-error" id="pricing">
                <p className="text-headline-md">Something went wrong: {error}</p>
            </section>
        );
    }

    return (
        <section className="max-w-container-max mx-auto px-margin-desktop py-24" id="pricing">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-headline-lg font-headline-lg text-on-surface">Flexible Plans for Every Portfolio</h2>
                <p className="text-on-surface-variant font-body-lg max-w-2xl mx-auto">Scale your property management business with predictable pricing and premium support.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, index) => {
                    const featureItems = getFeatureItems(plan.features || {});
                    const isRecommended = index === 1;

                    return (
                        <div
                            key={plan.id}
                            className={`p-10 rounded-3xl border flex flex-col gap-8 transition-all hover:shadow-lg ${isRecommended
                                ? 'relative glass-card border-2 border-primary shadow-2xl scale-105 z-10 overflow-hidden'
                                : 'bg-surface-container-low border-outline-variant/30'}`}
                        >
                            {isRecommended && (
                                <div className="absolute top-0 right-0 bg-primary text-on-primary px-6 py-1 rounded-bl-2xl text-label-caps font-label-caps">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="space-y-2">
                                <h3 className="text-headline-md font-headline-md">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-headline-xl font-headline-xl">{  formatPrice(plan.price)}</span>
                                    <span className={`font-body-md ${isRecommended ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                                        /{plan.billing_cycle || 'mo'}
                                    </span>
                                </div>
                                <p className={`font-body-md ${isRecommended ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="space-y-4 flex-1">
                                {featureItems.map((feature) => {
                                    const isNotIncluded = feature.value === false;
                                    const iconName = isNotIncluded ? 'close' : 'check_circle';
                                    const iconColor = isNotIncluded 
                                        ? 'text-outline' 
                                        : (isRecommended ? 'text-secondary' : 'text-primary');

                                    return (
                                        <li
                                            key={feature.key}
                                            className={`flex items-center gap-3 ${isNotIncluded ? 'text-on-surface-variant opacity-60' : (isRecommended ? 'text-on-surface' : 'text-on-surface-variant')}`}
                                        >
                                            <span
                                                className={`material-symbols-outlined text-sm ${iconColor}`}
                                                data-icon={iconName}
                                                style={{ fontFeatureSettings: "'FILL' 1" }}
                                            >
                                                {iconName}
                                            </span>
                                            <span className="capitalize">
                                                {feature.label}: {
                                                    (
                                                        (feature.key === "max_properties" ||
                                                        feature.key === "max_units") &&
                                                        feature.value > 500
                                                    )
                                                        ? "Unlimited"
                                                        : formatFeatureValue(feature.key, feature.value)
                                                }
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>

                            <button
                                className={`w-full py-4 rounded-xl font-button transition-all ${isRecommended
                                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/30 hover:opacity-90'
                                    : 'border-2 border-primary text-primary hover:bg-primary/5'}`}
                            >
                                {isRecommended ? 'Start 14-Day Free Trial' : `Select ${plan.name}`}
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};