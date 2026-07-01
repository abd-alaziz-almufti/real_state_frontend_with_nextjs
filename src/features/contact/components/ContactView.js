'use client';

import Link from 'next/link';
import { useContact } from '../hooks/useContact';

export function ContactView() {
  const {
    formData,
    status,
    errors,
    handleInputChange,
    handleSubmit,
    resetFormStatus,
  } = useContact();

  return (
    <div className="pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pt-12">
      {/* Hero Section */}
      <div className="mb-16 max-w-3xl">
        <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl mb-4 text-on-surface">
          Let's build the future of real estate together.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Whether you have questions about our enterprise features or need technical assistance, our team is here to help you scale your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
        {/* Left Side: Contact Info & Map */}
        <div className="md:col-span-5 space-y-12">
          <section className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-wider">
                  Office Headquarters
                </h3>
                <p className="font-body-md text-body-md text-on-surface">
                  1200 Architecture Plaza, Suite 400
                  <br />
                  San Francisco, CA 94105
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-wider">
                  Email Communication
                </h3>
                <p className="font-body-md text-body-md text-on-surface">
                  hello@estatesyncpro.com
                  <br />
                  partnerships@estatesyncpro.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">call</span>
              </div>
              <div>
                <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-wider">
                  Direct Phone
                </h3>
                <p className="font-body-md text-body-md text-on-surface">
                  +1 (888) 555-0129
                  <br />
                  Mon-Fri, 9am - 6pm PST
                </p>
              </div>
            </div>
          </section>

          {/* Map Widget */}
          <div className="relative rounded-3xl overflow-hidden shadow-sm hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300 aspect-video md:aspect-square bg-surface-container border border-outline-variant/20">
            <img 
              className="w-full h-full object-cover grayscale brightness-95 contrast-125" 
              alt="Map showing San Francisco corporate real estate area" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHk38xBRRKKr-VKqAiIM1ZX5NAIjMQVEYJeMIl2vwe5J6fj1QPJYHUnewBdFCrYoRkkH2xSxRFt2t9s8Qaon-WW_8x9I5i5lM_pHbvfwHSC7NJIpe8PgTo0bR7ekVPsDA7HivYYOq8K8jpdt88ZDR2sYlkpYdYQURTBG26_SBlJRTnHb940Vco4ciOWaBdLOKCywWJ2INGNWW9tifLSc2aEKpVPA5-DFe8PhPWCsOTkjtY5Z3TkZuwF4xGMk8iiQ7kLDqi3XuKzg"
            />
            <div className="absolute bottom-4 left-4 glass-card px-4 py-2 rounded-xl border border-white/50">
              <p className="font-label-caps text-label-caps text-on-surface">
                EstateSync HQ • San Francisco
              </p>
            </div>
          </div>

          {/* Support Center Link */}
          <div className="p-6 rounded-3xl border border-outline-variant/30 bg-surface-container-low flex items-center justify-between group cursor-pointer hover:bg-surface-container transition-all">
            <div>
              <h4 className="font-headline-md text-body-lg font-bold text-on-surface text-lg">
                Already a member?
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Access our comprehensive Support Center for documentation.
              </p>
            </div>
            <a className="text-primary group-hover:translate-x-2 transition-transform duration-300" href="#">
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="md:col-span-7">
          <div className="bg-surface-container-lowest p-8 md:p-12 rounded-3xl shadow-sm border border-outline-variant/20">
            {status === 'success' ? (
              <div className="text-center py-12 space-y-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl font-bold">check</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-headline-md font-bold text-on-surface">Message Sent!</h3>
                  <p className="text-on-surface-variant font-body-md max-w-md mx-auto">
                    Thank you for reaching out. A member of our enterprise solution team will contact you within 24 hours.
                  </p>
                </div>
                <button
                  onClick={resetFormStatus}
                  className="bg-primary text-on-primary px-8 py-3 rounded-xl font-button hover:opacity-90 active:scale-95 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant block" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      className={`w-full px-4 py-3 bg-surface border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-on-surface-variant/40 ${
                        errors.name ? 'border-error' : 'border-outline-variant'
                      }`}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      type="text"
                    />
                    {errors.name && (
                      <p className="text-error text-xs font-semibold">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant block" htmlFor="email">
                      Work Email
                    </label>
                    <input
                      className={`w-full px-4 py-3 bg-surface border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-on-surface-variant/40 ${
                        errors.email ? 'border-error' : 'border-outline-variant'
                      }`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@company.com"
                      type="email"
                    />
                    {errors.email && (
                      <p className="text-error text-xs font-semibold">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block" htmlFor="subject">
                    Subject
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-on-surface-variant"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Enterprise Solutions">Enterprise Solutions</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Partnership Opportunities">Partnership Opportunities</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className={`w-full px-4 py-3 bg-surface border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-on-surface-variant/40 resize-none ${
                      errors.message ? 'border-error' : 'border-outline-variant'
                    }`}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project requirements..."
                    rows={6}
                  ></textarea>
                  {errors.message && (
                    <p className="text-error text-xs font-semibold">{errors.message}</p>
                  )}
                </div>

                {status === 'error' && (
                  <div className="p-4 bg-error-container text-on-error-container rounded-xl">
                    Something went wrong. Please try again.
                  </div>
                )}

                <div className="pt-4">
                  <button
                    className="w-full md:w-auto bg-primary text-on-primary px-12 py-4 rounded-xl font-button text-button shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    type="submit"
                    disabled={status === 'submitting'}
                  >
                    <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                    {status !== 'submitting' && (
                      <span className="material-symbols-outlined text-sm">send</span>
                    )}
                  </button>
                </div>

                <p className="font-label-caps text-label-caps text-on-surface-variant text-center md:text-left">
                  By submitting this form, you agree to our{' '}
                  <Link href="/privacy" className="text-primary underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
