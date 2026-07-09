export const SuccessMessage = ({ successData }) => {
    return (
        <div className="bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/50 shadow-sm w-full max-w-3xl rounded-xl p-8 md:p-12 mb-12 text-center">
            <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-on-secondary-container text-3xl" data-icon="check_circle">check_circle</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Registration Successful!</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8">{successData.message}</p>

            {successData.dashboard_url && (
                <a
                    href={successData.dashboard_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex px-8 py-3 font-button text-button bg-primary text-on-primary rounded-lg shadow-sm hover:translate-y-[-2px] active:scale-95 transition-all items-center gap-2"
                >
                    Go to Admin Dashboard
                    <span className="material-symbols-outlined text-sm" data-icon="open_in_new">open_in_new</span>
                </a>
            )}
        </div>
    );

}