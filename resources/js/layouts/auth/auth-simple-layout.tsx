import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="bg-primary relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={''} className="flex flex-col items-center gap-2 font-medium">
                            <div className="flex items-center">
                                <div className="mb-1 flex h-20 w-20 items-center justify-center rounded-md">
                                    <img
                                        src="/assets/icon-gresik.png"
                                        alt="logo"
                                        className="size-15 fill-current text-[var(--foreground)] dark:text-white"
                                    />
                                </div>
                                <div className="mb-1 flex h-20 w-20 items-center justify-center rounded-md">
                                    <img
                                        src="/assets/sipagen-icon.png"
                                        alt="logo"
                                        className="size-15 fill-current text-[var(--foreground)] dark:text-white"
                                    />
                                </div>
                                <div className="mb-1 flex h-20 w-20 items-center justify-center rounded-md">
                                    <img
                                        src="/assets/icon-unesa.png"
                                        alt="logo"
                                        className="size-15 fill-current text-[var(--foreground)] dark:text-white"
                                    />
                                </div>
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-bold">{title}</h1>
                            <p className="text-center text-sm text-gray-100">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
            <div className="absolute bottom-0 px-2 py-4 text-center text-[0.65rem] font-semibold text-white lg:text-sm">
                © 2025 Program Studi D4 Administrasi Negara, All Rights Reserved
            </div>
        </div>
    );
}
