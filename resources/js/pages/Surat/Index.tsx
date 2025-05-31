import { DataTable } from '@/components/DataTable';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { FileInput, FileOutput, FolderClosed, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { columns } from './Partials/ListColumns';
import { LetterParams, TypeLetterParams } from './Type';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Surat',
        href: '/',
    },
];

// const surat: LetterParams[] = [
//     {
//         id: 1,
//         name: 'Surat Pemberitahuan',
//         code: 'SPB',
//         type: 'Masuk',
//         file: 'https://picsum.photos/200',
//     },
//     {
//         id: 2,
//         name: 'Surat Peringatan',
//         code: 'SPR',
//         type: 'Keluar',
//         file: 'https://picsum.photos/200',
//     },
//     {
//         id: 3,
//         name: 'Surat Pengumuman',
//         code: 'SPG',
//         type: 'Masuk',
//         file: 'https://picsum.photos/200',
//     },
//     {
//         id: 4,
//         name: 'Surat Pemberitahuan',
//         code: 'SPB',
//         type: 'Keluar',
//         file: 'https://picsum.photos/200',
//     },
//     {
//         id: 5,
//         name: 'Surat Peringatan',
//         code: 'SPR',
//         type: 'Masuk',
//         file: 'https://picsum.photos/200',
//     },
//     {
//         id: 6,
//         name: 'Surat Pengumuman',
//         code: 'SPG',
//         type: 'Keluar',
//         file: 'https://picsum.photos/200',
//     },
// ];

const Index = ({ typeLetters, letters }: { typeLetters: TypeLetterParams[]; letters: LetterParams[] }) => {
    const getQueryParam = (key: string) => {
        const params = new URLSearchParams(window.location.search);
        return params.get(key);
    };

    const [filter, setFilter] = useState({
        keyword: getQueryParam('keyword') || '',
    });
    const [processing, setProcessing] = useState(false);
    const search = async (type: string, data: string | string[]) => {
        setFilter((prev) => {
            const updatedFilter = { ...prev, [type]: data };
            const dataReady = Object.fromEntries(
                Object.entries({
                    keyword: updatedFilter.keyword || null,
                }).filter(([, v]) => Boolean(v)),
            );

            setTimeout(() => {
                router.get('/surat/daftar-surat', dataReady, {
                    preserveState: true,
                    preserveScroll: true,
                    onStart: () => setProcessing(true),
                    onFinish: () => setProcessing(false),
                });
            }, 500);

            return updatedFilter;
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Surat" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading title="Kelola Surat" description="Kelola surat" />
                <div className="flex items-center gap-2">
                    <div className="relative max-w-md flex-1">
                        <input
                            type="text"
                            placeholder="Cari folder jenis surat atau surat..."
                            onChange={(e) => search('keyword', e.target.value)}
                            value={filter.keyword}
                            className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-gray-400"
                        />
                        <Search className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex-0 cursor-pointer bg-green-700 text-white">
                                <Plus className="size-5" />
                                <span className="sr-only">Tambah Surat</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-60" side="bottom" align="start">
                            <DropdownMenuLabel>
                                <p className="text-sm font-semibold text-gray-900">Action</p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href="/surat/tambah-surat-keluar">
                                    <div className="flex items-center text-xs">
                                        <FileOutput className="size-5 text-red-500" />
                                        <span className="w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Tambah Surat Keluar
                                        </span>
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/surat/tambah-surat-masuk">
                                    <div className="flex items-center text-sm">
                                        <FileInput className="size-5 text-green-500" />
                                        <p className="block w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Tambah Surat Masuk
                                        </p>
                                    </div>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <h3 className="p-3 font-bold">Jenis Surat</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {processing ? (
                        <div className="w-full cursor-pointer rounded-lg border bg-gray-100/50 p-4 shadow-md">
                            <div className="flex items-center gap-3 border-gray-300 py-2 dark:border-gray-700">
                                <div className="flex animate-pulse space-x-4">
                                    <div className="size-10 rounded-full bg-gray-200"></div>
                                    <div className="flex-1 space-y-6 py-1">
                                        <div className="h-2 rounded bg-gray-200"></div>
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                                            </div>
                                            <div className="h-2 rounded bg-gray-200"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : typeLetters.length > 0 ? (
                        typeLetters.map((s, index) => (
                            <Link href={`/surat/${s.slug}`} key={index}>
                                <div className="w-full cursor-pointer rounded-lg border bg-gray-100/50 p-4 shadow-md">
                                    <div className="flex items-center gap-3 border-gray-300 py-2 dark:border-gray-700">
                                        <div className="flex items-center gap-3">
                                            <FolderClosed className="size-12 text-gray-500" />
                                            <div>
                                                <div className="text-md py-1 font-semibold text-gray-200">{s.name}</div>
                                                <div className="text-sm text-gray-700 dark:text-gray-400">{s.documents_count} Surat</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="p-5 font-bold text-gray-500">
                            <p>Jenis Surat Tidak Ditemukan</p>
                        </div>
                    )}
                </div>
                <h3 className="p-3 font-bold">Surat terbaru</h3>
                <div className="rounded-lg border bg-gray-100/50 p-4 shadow-sm dark:bg-gray-800">
                    <DataTable columns={columns} data={letters} />
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
