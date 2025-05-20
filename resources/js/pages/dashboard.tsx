import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ letterIn, letterOut, docAll }: { letterIn: number; letterOut: number; docAll: number }) {
    console.log(letterIn);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex flex-col gap-1 text-center">
                                <h2 className="text-6xl font-bold text-neutral-900 dark:text-neutral-100">{letterIn}</h2>
                                <p className="text-sm text-green-700 dark:text-neutral-400">Surat Masuk</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex flex-col gap-1 text-center">
                                <h2 className="text-6xl font-bold text-neutral-900 dark:text-neutral-100">{letterOut}</h2>
                                <p className="text-sm text-red-700 dark:text-neutral-400">Surat Keluar</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex flex-col gap-1 text-center">
                                <h2 className="text-6xl font-bold text-neutral-900 dark:text-neutral-100">{docAll}</h2>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">Dokumen Arsip</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div> */}
            </div>
        </AppLayout>
    );
}
