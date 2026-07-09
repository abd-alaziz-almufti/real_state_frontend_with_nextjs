'use client';
import React, { useState } from 'react';
import api from '@/lib/axios';
import { SuccessMessage } from './SuccessMessage';

export default function AgencyProfileForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    password: '',
    password_confirmation: '',
  });
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
      if (errors.logo) {
        setErrors(prev => ({ ...prev, logo: null }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('phone', formData.phone);
    payload.append('password', formData.password);
    payload.append('password_confirmation', formData.password_confirmation);
    if (formData.address) payload.append('address', formData.address);
    // Note: website is collected but not sent as it is not in the validation rules
    if (logo) payload.append('logo', logo);

    try {
      const response = await api.post('/agencies', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept ': 'application/json',
        },
      });
      // response directly contains the JSON body due to axios interceptor returning response.data
      setSuccessData(response);
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        alert(error.message || 'An error occurred during registration.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (successData) {
    return (
      <SuccessMessage successData={successData} />
    );
  }

  return (
    <div className="bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/50 shadow-sm w-full max-w-3xl rounded-xl p-8 md:p-12 mb-12">
      <div className="mb-8">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Build your agency profile</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Start by providing basic information about your agency. This will be visible to your team and potential clients.</p>
      </div>
      <form className="space-y-gutter" onSubmit={handleSubmit}>
        {/* Logo Upload Area */}
        <div className="flex flex-col gap-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">AGENCY LOGO</span>
          <div className={`group relative w-32 h-32 rounded-xl bg-surface-container border-2 ${errors.logo ? 'border-error' : 'border-dashed border-outline-variant'} flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors overflow-hidden`}>
            {logoPreview ? (
              <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
            ) : (
              <>
                <span className="material-symbols-outlined text-4xl text-outline mb-1" data-icon="add_a_photo">add_a_photo</span>
                <span className="font-label-caps text-[10px] text-center px-2">Upload Logo</span>
              </>
            )}
            <input
              name="logo"
              className="absolute inset-0 opacity-0 cursor-pointer"
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
              onChange={handleFileChange}
            />
          </div>
          {errors.logo && <span className="text-error text-sm mt-1">{errors.logo[0]}</span>}
        </div>
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant">AGENCY NAME</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`bg-surface-container-low border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md ${errors.name ? 'border-error ring-1 ring-error' : ''}`}
              placeholder="e.g. Skyline Realty Group"
              type="text"
            />
            {errors.name && <span className="text-error text-sm">{errors.name[0]}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant">CORPORATE EMAIL</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`bg-surface-container-low border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md ${errors.email ? 'border-error ring-1 ring-error' : ''}`}
              placeholder="contact@agency.com"
              type="email"
            />
            {errors.email && <span className="text-error text-sm">{errors.email[0]}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant">PHONE NUMBER</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`bg-surface-container-low border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md ${errors.phone ? 'border-error ring-1 ring-error' : ''}`}
              placeholder="+1 (555) 000-0000"
              type="tel"
            />
            {errors.phone && <span className="text-error text-sm">{errors.phone[0]}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant">WEBSITE URL (Optional)</label>
            <input
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="bg-surface-container-low border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md"
              placeholder="https://agency.com"
              type="url"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant">PASSWORD</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`bg-surface-container-low border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md ${errors.password ? 'border-error ring-1 ring-error' : ''}`}
              placeholder="••••••••"
              type="password"
            />
            {errors.password && <span className="text-error text-sm">{errors.password[0]}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant">CONFIRM PASSWORD</label>
            <input
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              className="bg-surface-container-low border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md"
              placeholder="••••••••"
              type="password"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-label-caps text-label-caps text-on-surface-variant">OFFICE ADDRESS</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={`bg-surface-container-low border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md ${errors.address ? 'border-error ring-1 ring-error' : ''}`}
            placeholder="Street address, Suite, City, State, ZIP"
            rows={3}
          ></textarea>
          {errors.address && <span className="text-error text-sm">{errors.address[0]}</span>}
        </div>
        {/* Actions */}
        <div className="pt-8 border-t border-outline-variant/30 flex justify-between items-center">
          <button className="px-6 py-3 font-button text-button text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" type="button">Save as Draft</button>
          <button
            disabled={isLoading}
            className={`px-8 py-3 font-button text-button bg-primary text-on-primary rounded-lg shadow-sm hover:translate-y-[-2px] active:scale-95 transition-all flex items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            type="submit"
          >
            {isLoading ? 'Registering...' : 'Complete Registration'}
            {!isLoading && <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>}
          </button>
        </div>
      </form>
    </div>
  );
}
