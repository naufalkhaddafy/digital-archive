export default function AppLogo() {
    return (
        <>
            <div className="text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-md bg-white">
                {/* <AppLogoIcon className="size-5 fill-current text-white dark:text-black" /> */}
                <img src="/assets/sipagen-icon.png" className="size-8 fill-current text-white dark:text-black" alt="Logo" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold text-white">Sistem Informasi </span>
                <span className="text-xs leading-snug text-gray-300">Pengarsipan Gending</span>
            </div>
        </>
    );
}
