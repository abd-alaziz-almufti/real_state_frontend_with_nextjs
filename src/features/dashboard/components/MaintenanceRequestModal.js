'use client';

import { useState } from 'react';
import { useMaintenanceRequest } from '../hooks/useMaintenanceRequest';

const PRIORITIES = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'emergency', label: 'Emergency' },
];

export function MaintenanceRequestModal({ leases = [], onClose, onSubmitted }) {
    const { submit, submitting, error, success } = useMaintenanceRequest();

    const activeLeases = leases.filter((l) => l.status === 'active');

    const [form, setForm] = useState({
        unit_id: activeLeases[0]?.unit_id || '',
        title: '',
        description: '',
        priority: 'medium',
        images: [],
    });

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleFiles = (e) => {
        const files = Array.from(e.target.files || []).slice(0, 5);
        setForm((prev) => ({ ...prev, images: files }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.unit_id || !form.title.trim() || !form.description.trim()) return;

        const result = await submit(form);
        if (result.success) {
            onSubmitted?.(result.data);
            setTimeout(() => onClose?.(), 1200);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(15,23,42,0.5)' }}
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-2xl p-6"
                style={{ background: '#fff' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold" style={{ color: '#0f172a' }}>Submit Maintenance Request</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {activeLeases.length === 0 ? (
                    <p className="text-sm" style={{ color: '#64748b' }}>
                        You don&apos;t have an active lease to submit a maintenance request for.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold block mb-1.5" style={{ color: '#334155' }}>Unit</label>
                            <select
                                value={form.unit_id}
                                onChange={handleChange('unit_id')}
                                className="w-full rounded-xl px-3 py-2.5 text-sm"
                                style={{ border: '1px solid #e2e8f0' }}
                            >
                                {activeLeases.map((l) => (
                                    <option key={l.unit_id} value={l.unit_id}>
                                        {l.property_name} - Unit {l.unit_number}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-xs font-semibold block mb-1.5" style={{ color: '#334155' }}>Title</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={handleChange('title')}
                                placeholder="e.g. AC not cooling"
                                maxLength={255}
                                required
                                className="w-full rounded-xl px-3 py-2.5 text-sm"
                                style={{ border: '1px solid #e2e8f0' }}
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold block mb-1.5" style={{ color: '#334155' }}>Description</label>
                            <textarea
                                value={form.description}
                                onChange={handleChange('description')}
                                rows={4}
                                maxLength={2000}
                                required
                                className="w-full rounded-xl px-3 py-2.5 text-sm resize-none"
                                style={{ border: '1px solid #e2e8f0' }}
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold block mb-1.5" style={{ color: '#334155' }}>Priority</label>
                            <select
                                value={form.priority}
                                onChange={handleChange('priority')}
                                className="w-full rounded-xl px-3 py-2.5 text-sm"
                                style={{ border: '1px solid #e2e8f0' }}
                            >
                                {PRIORITIES.map((p) => (
                                    <option key={p.value} value={p.value}>{p.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-xs font-semibold block mb-1.5" style={{ color: '#334155' }}>Photos (optional, up to 5)</label>
                            <input type="file" accept="image/*" multiple onChange={handleFiles} className="text-sm" />
                        </div>

                        {error && (
                            <p className="text-xs font-medium p-2.5 rounded-lg" style={{ background: '#fef2f2', color: '#dc2626' }}>
                                {error}
                            </p>
                        )}
                        {success && (
                            <p className="text-xs font-medium p-2.5 rounded-lg" style={{ background: '#dcfce7', color: '#16a34a' }}>
                                Request submitted successfully.
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                            style={{ background: '#f59e0b' }}
                        >
                            {submitting ? 'Submitting…' : 'Submit Request'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}