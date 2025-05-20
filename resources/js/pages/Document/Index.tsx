import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { LetterParams } from '@/pages/Surat/Type';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { DataTable } from './Partials/Datatable';
import { columns } from './Partials/DocumentColumns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Arsip Dokumen',
        href: '/',
    },
];

const Index = ({ letters }: { letters: LetterParams[] }) => {
    const getQueryParam = (key: string) => {
        const params = new URLSearchParams(window.location.search);
        return params.get(key);
    };

    const [filter, setFilter] = useState({
        keyword: getQueryParam('keyword') || '',
    });
    const search = async (type: string, data: string | string[]) => {
        setFilter((prev) => {
            const updatedFilter = { ...prev, [type]: data };
            const dataReady = Object.fromEntries(
                Object.entries({
                    keyword: updatedFilter.keyword || null,
                }).filter(([, v]) => Boolean(v)),
            );

            setTimeout(() => {
                router.get('/dokumen', dataReady, {
                    preserveState: true,
                    preserveScroll: true,
                });
            }, 500);

            return updatedFilter;
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Arsip Dokumen" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading title="Kelola Arsip Dokumen" description="halaman untuk mengelola arsip dokumen " />

                <div className="flex items-center gap-2">
                    <div className="relative max-w-md flex-1">
                        <input
                            type="text"
                            placeholder="Cari dokumen ..."
                            onChange={(e) => search('keyword', e.target.value)}
                            value={filter.keyword}
                            className="w-full rounded-lg border bg-white px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-400"
                        />
                        <Search className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                    </div>
                    <Button variant="outline" className="flex-0 cursor-pointer bg-green-700 text-white" asChild>
                        <Link href="dokumen/create">
                            <Plus className="size-5" />
                            <span className="sr-only">Tambah Dokumen</span>
                        </Link>
                    </Button>
                </div>

                <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800">
                    <DataTable columns={columns} data={letters} />
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
