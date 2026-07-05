export const OurMission = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-stretch">
            <div className="md:col-span-8 glass p-10 rounded-xl flex flex-col justify-center">
                <span className="font-label-caps text-label-caps text-primary mb-4 block">OUR MISSION</span>
                <h2 className="font-headline-lg text-headline-lg mb-6">Empowering clarity in a complex market.</h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    At EstateSync Pro, we believe that real estate management shouldn't be a black box. Our mission is to provide property managers and residents with a transparent, high-performance platform that turns friction into flow. We leverage sophisticated automation and editorial-grade design to ensure every interaction feels premium and intentional.
                </p>
            </div>
            <div className="md:col-span-4 bg-primary text-on-primary p-10 rounded-xl flex flex-col justify-end">
                <span className="material-symbols-outlined text-4xl mb-4">analytics</span>
                <h3 className="font-headline-md text-headline-md mb-2">99.9%</h3>
                <p className="font-label-caps text-label-caps opacity-80">Operational Uptime &amp; Data Accuracy</p>
            </div>
        </section>
    )
}