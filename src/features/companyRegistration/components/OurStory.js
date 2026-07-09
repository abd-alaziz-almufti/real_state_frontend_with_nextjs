export const OurStory = () => {
    return (
        <section className="flex flex-col md:flex-row gap-gutter items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
                <div className="relative rounded-xl overflow-hidden shadow-sm">
                    <img alt="Collaborative Modern Office Space" className="w-full h-[500px] object-cover" data-alt="A wide-angle shot of a bright, open-plan corporate office with minimalist furniture and floor-to-ceiling windows. The interior design features a clean color palette of whites, light woods, and deep charcoal accents. Natural daylight floods the space, highlighting the sophisticated glass partitions and polished floors. The atmosphere is serene and professional, reflecting a culture of innovation and transparency in the workplace." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkbPgQ18UoCMeXGWxqcUKNKjTbZzrQN5P-mGjmd4SKmeoh4TADTRw9Po_nANuis5RfwlozNK2PJ299SiyruVBeIGTWsA3zgUmQ0Z9sPx88Tg5ydETuewnKfQQe4iJucKgdXYWUpY9gRmydN0GXeXJa1Gy8LbODUm1_XGxxhZWdkRWYprN2cRboC8VyM33dWQw1XQ_dqKah4dH14_2M9HRVWpkpcibsAoVTzi9k048l91FFc7T2sJ5xla0-lzYeg4RLf7SbnfyXEQ" />
                </div>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 px-0 md:px-12">
                <span className="font-label-caps text-label-caps text-primary mb-4 block">OUR STORY</span>
                <h2 className="font-headline-lg text-headline-lg mb-6">Bridging the Gap</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                    EstateSync Pro was born out of a simple frustration: the disconnect between the sophisticated needs of property managers and the digital expectations of modern renters.
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    We saw a world where communication was fragmented and data was siloed. Our founders set out to build a "single source of truth"—a platform that balances the rigor of enterprise software with the intuitive elegance of a luxury journal. Today, we manage over 2 million square feet of high-performance real estate across three continents.
                </p>
            </div>
        </section>
    )
}