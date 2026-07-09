export const CTA = () => {
    return (
        <section className="relative py-20 px-10 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img alt="Clean Workspace" className="w-full h-full object-cover" data-alt="A wide-angle interior view of a high-end architectural firm's meeting room. The room features a long minimalist oak table and sleek ergonomic chairs, with a background of frosted glass and soft-light morning views of the city. The palette is dominated by off-whites, warm woods, and the primary indigo color as subtle accents in the decor. The mood is productive, serene, and deeply professional." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLwsrTASVLRmLVwDIXLPKxDn09mx-PTivTP8t-ohGTTBsIBB4YeMvczp4m6hh-MNIofS8bUXpy1ZNcO39Ts1vp-7VTaEKjC2J6waYZBGu3tb7OjcNGGHzNFUvemrCsJciLgSLJlR5tlrozilA1uhdIajPe4YhO01kBgTY5DoQG8QcNV-droCC1lmCHhwL80C0S6-L2wqVhaSR5c3VJopy4E4i5ekbowB4JdVwW0uuq8IraLdxtNMo1QiqrUnpVIlSzNFbaqMpD9A" />
                <div className="absolute inset-0 bg-primary/80 backdrop-blur-md"></div>
            </div>
            <div className="relative z-10 text-center text-on-primary">
                <h2 className="font-headline-lg text-headline-lg mb-6">Ready to sync your estate?</h2>
                <p className="font-body-lg text-body-lg max-w-xl mx-auto mb-10 opacity-90">
                    Join the thousands of property managers who have transitioned to a high-performance management ecosystem.
                </p>
                <div className="flex flex-col sm:flex-row gap-gutter justify-center">
                    <button className="bg-surface text-primary px-8 py-4 rounded-lg font-button text-button hover:bg-surface/90 transition-all">Get Started Today</button>
                    <button className="border border-on-primary/30 text-on-primary px-8 py-4 rounded-lg font-button text-button hover:bg-on-primary/10 transition-all">Request a Demo</button>
                </div>
            </div>
        </section>
    )
}