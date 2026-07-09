import React from 'react';
import AgencyProfileForm from '@/features/RegisterAgency/components/AgencyProfileForm';
import InfoBentoSection from '@/features/RegisterAgency/components/InfoBentoSection';

export default function AgencyRegistrationPage() {
  return (
    <div className="flex-grow flex flex-col items-center py-12 px-margin-mobile md:px-margin-desktop w-full">
      <AgencyProfileForm />
      <InfoBentoSection />
    </div>
  );
}