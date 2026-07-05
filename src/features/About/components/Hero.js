export const Hero = () => {
    return (
        <header className="relative w-full h-[819px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img alt="Modern Architectural Skyscraper" className="w-full h-full object-cover" data-alt="A breathtaking view of a modern skyscraper's glass facade reflecting a soft twilight sky. The architectural photography style is clean and sharp, emphasizing geometric precision and high-contrast lines. The overall mood is sophisticated and futuristic, aligning with a premium corporate minimalist aesthetic. Soft light-blue and cool-grey tones dominate the palette, creating an atmosphere of calculated confidence and architectural excellence." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj_8Uh0-9m9YueE_nBgKQkwbvfolvE03ViUgUxl8nJHjPsZ65KipRAbS6pMNqH4CcAS2QCRHSqp40gguRbUQ087QqXHiwT_P2WUhPxMDhL4QSBooed2hq17nazm5nTa273xo2jMihJrHe2K55YYmDIK7uX4doLqLf_S515Ts81kUUVub13kXBV4tMH0kOIP9B3Z_cgaW6xPzPm8WiX5ZYBK48bSNDChJgVlIJkuy2_BLc8wAklKaNl-r5YpcslORtMlv7Xf00YIg" />
                <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/60 to-transparent"></div>
            </div>
            <div className="relative z-10 w-full max-w-container-max px-margin-mobile md:px-margin-desktop">
                <div className="max-w-2xl">
                    <span className="font-label-caps text-label-caps text-primary tracking-widest mb-4 block uppercase">Our Vision</span>
                    <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-surface mb-6">
                        Redefining Real Estate <span className="text-primary">Management.</span>
                    </h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                        Bridging the gap between complex property logistics and seamless living experiences through high-performance data layering.
                    </p>
                </div>
            </div>
        </header>
    );
}