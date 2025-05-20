import { DataTable } from '@/components/DataTable';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FileStack } from 'lucide-react';
import { columns } from './Partials/DetailColumns';
import { LetterParams, TypeLetterParams } from './Type';

const Detail = ({ letters, typeLetter }: { letters: LetterParams[]; typeLetter: TypeLetterParams }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Kelola Surat',
            href: '/surat/daftar-surat',
        },
        {
            title: `Daftar ${typeLetter.name}`,
            href: '/',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Jenis Surat" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading title={`Daftar ${typeLetter.name}`} description="Detail Jenis Surat" />
                <div className="flex max-w-sm gap-5">
                    <div className="w-full rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center gap-2 py-2">
                            <div className="flex items-center gap-5">
                                <FileStack className="size-7 text-green-400" />
                                <div>
                                    <div className="text-sm font-semibold text-gray-500">{typeLetter.name}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">{letters.length} Surat</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800">
                    <DataTable columns={columns} data={letters} />
                </div>
            </div>
        </AppLayout>
    );
};

export default Detail;
