'use client';

import { OurMission } from './OurMission';
import { Hero } from './Hero';
import { LeadershipTeam } from './LeadershipTeam';
import { CTA } from './CTA';
import { OurStory } from './OurStory';

export function About() {

  return (
    <>
      {/* Hero Section */}
      <Hero />
      <main className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 space-y-32">
        {/*  Our Mission & Values (Bento-style Grid)  */}
        <OurMission />
        {/* Our Story */}
        <OurStory />
        {/* Leadership Team */}
        <LeadershipTeam />
        {/* CTA */}
        <CTA />
      </main>

    </>
  );
}


