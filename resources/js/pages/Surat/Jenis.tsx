import { DataTable } from '@/components/DataTable';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FileStack } from 'lucide-react';
import { ModalFormTypeLetter } from './Partials/Modal';
import { columns } from './Partials/TypeLetterColumns';
import { TypeLetterParams } from './Type';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Surat',
        href: '/',
    },
];

const Jenis = ({ typeLetters }: { typeLetters: TypeLetterParams[] }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Surat" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading title="Kelola Jenis Surat" description="Kelola Jenis Surat" />
                <div className="flex max-w-sm gap-5">
                    <div className="w-full rounded-lg border bg-gray-100/50 p-4 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center gap-2 py-2">
                            <div className="flex items-center gap-5">
                                <FileStack className="size-7 text-green-400" />
                                <div>
                                    <div className="text-sm font-semibold text-gray-500">Jenis Surat</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">{typeLetters.length} Surat</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border bg-gray-100/50 p-4 shadow-sm dark:bg-gray-800">
                    <div className="py-4">
                        <ModalFormTypeLetter />
                    </div>
                    <DataTable columns={columns} data={typeLetters} />
                </div>
            </div>
        </AppLayout>
    );
};

export default Jenis;
