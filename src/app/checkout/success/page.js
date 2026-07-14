'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/axios';

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const type = searchParams.get('type') || 'subscription';

    const [count, setCount] = useState(8);
    const [isVerifying, setIsVerifying] = useState(true);

    // Verify session with the backend on page load
    useEffect(() => {
        if (!sessionId) {
            setIsVerifying(false);
            return;
        }

        const verifySession = async () => {
            try {
                let response;
                if (type === 'payment') {
                    // Endpoint for rent payments
                    response = await api.post('checkout/verify-payment-session', { session_id: sessionId });
                } else {
                    // Endpoint for leases and subscriptions
                    response = await api.post('checkout/verify-session', { session_id: sessionId });
                }

                if (response?.success) {
                    console.log("Session verified successfully");
                    alert("Session verified successfully");
                } else {
                    console.error("Session verification failed", response?.message);
                }
            } catch (error) {
                console.error("Error verifying session", error);
            } finally {
                setIsVerifying(false);
            }
        };

        verifySession();
    }, [sessionId, type]);

    const getPageContent = () => {
        if (type === 'payment') {
            return {
                title: 'Payment Successful!',
                description: 'Your rent payment has been processed successfully.',
                redirectUrl: '/tenant/payments',
                redirectText: 'Go to My Payments',
                steps: [
                    { icon: 'receipt_long', text: 'Receipt sent to your email' },
                    { icon: 'check_circle', text: 'Your balance has been updated' },
                ]
            };
        }
        if (type === 'lease') {
            return {
                title: 'Application Successful!',
                description: 'Your lease application and initial payment were successful.',
                redirectUrl: '/tenant/dashboard',
                redirectText: 'Go to Dashboard',
                steps: [
                    { icon: 'description', text: 'Lease application submitted' },
                    { icon: 'hourglass_empty', text: 'Awaiting landlord approval' },
                ]
            };
        }
        return {
            title: 'Subscription Active!',
            description: 'Your subscription is now active. Welcome aboard!\nYou now have full access to your plan features.',
            redirectUrl: 'http://real-estate-system.test/admin/dashboard',
            redirectText: 'Go to Admin Dashboard',
            steps: [
                { icon: 'mail', text: 'Confirmation email sent to your inbox' },
                { icon: 'dashboard', text: 'Your dashboard is now fully unlocked' },
                { icon: 'support_agent', text: 'Our team is available 24/7 for support' },
            ]
        };
    };

    const content = getPageContent();

    // Countdown auto-redirect to dashboard (wait until verifying is done)
    useEffect(() => {
        if (isVerifying || count <= 0) return;
        const timer = setTimeout(() => setCount((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [count, isVerifying]);

    useEffect(() => {
        if (count === 0) {
            window.location.href = content.redirectUrl;
        }
    }, [count, content.redirectUrl]);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0fdfa 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
        }}>
            <div style={{
                background: '#fff',
                borderRadius: 24,
                padding: '3rem 2.5rem',
                maxWidth: 520,
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(16,185,129,0.12)',
                border: '1px solid #d1fae5',
            }}>
                {/* Animated success icon */}
                <div style={{
                    width: 96, height: 96,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 8px 32px rgba(16,185,129,0.35)',
                    animation: 'successPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
                }}>
                    <span className="material-symbols-outlined" style={{
                        fontSize: 52, color: '#fff', fontVariationSettings: "'FILL' 1"
                    }}>
                        check_circle
                    </span>
                </div>

                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#064e3b', marginBottom: 8 }}>
                    {content.title}
                </h1>
                <p style={{ color: '#065f46', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem', whiteSpace: 'pre-line' }}>
                    {content.description}
                </p>

                {sessionId && (
                    <div style={{
                        background: '#f0fdf4', borderRadius: 12, padding: '0.75rem 1rem',
                        marginBottom: '1.5rem', border: '1px solid #bbf7d0',
                    }}>
                        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: 2 }}>Stripe Session ID</p>
                        <p style={{ fontSize: '0.8rem', color: '#374151', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                            {sessionId}
                        </p>
                    </div>
                )}

                {/* What happens next */}
                <div style={{
                    background: '#f8fafc', borderRadius: 16, padding: '1.25rem',
                    marginBottom: '2rem', textAlign: 'left',
                    border: '1px solid #e2e8f0',
                }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        What happens next
                    </p>
                    {content.steps.map((item) => (
                        <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#10b981', fontVariationSettings: "'FILL' 1" }}>
                                {item.icon}
                            </span>
                            <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>{item.text}</span>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {content.redirectUrl.startsWith('http') ? (
                        <a
                            href={content.redirectUrl}
                            id="success-dashboard-btn"
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                padding: '0.9rem',
                                borderRadius: 12,
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                color: '#fff', fontWeight: 700, textDecoration: 'none',
                                boxShadow: '0 4px 16px rgba(16,185,129,0.3)',
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
                            {content.redirectText}
                        </a>
                    ) : (
                        <Link
                            href={content.redirectUrl}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                padding: '0.9rem',
                                borderRadius: 12,
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                color: '#fff', fontWeight: 700, textDecoration: 'none',
                                boxShadow: '0 4px 16px rgba(16,185,129,0.3)',
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
                            {content.redirectText}
                        </Link>
                    )}
                    {type !== 'lease' && type !== 'payment' && (
                        <Link href="/tenant/dashboard" style={{ fontSize: '0.875rem', color: '#6b7280', textDecoration: 'none', marginTop: '0.5rem' }}>
                            ← Back to Home
                        </Link>
                    )}
                </div>

                {/* Auto-redirect countdown */}
                <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#9ca3af' }}>
                    Redirecting automatically in {count}s…
                </p>
            </div>

            <style>{`
                @keyframes successPop {
                    from { opacity: 0; transform: scale(0.4); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}
