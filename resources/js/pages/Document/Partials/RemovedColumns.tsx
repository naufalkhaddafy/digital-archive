'use client';

import { Button } from '@/components/ui/button';
import { LetterParams } from '@/pages/Surat/Type';
import { router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, FolderSync, Lock, LockIcon } from 'lucide-react';

// import { ModalDeleteUser, ModalFormUser } from './ModalUser';

export const columns: ColumnDef<LetterParams>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    No
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div className="pl-4">{row.index + 1}</div>,
    },

    {
        accessorKey: 'code',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nomor Dokumen
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div className="px-2">{row.getValue('code')}</div>,
    },

    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nama Dokumen
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div className="px-2">{row.getValue('name')}</div>,
    },

    {
        accessorKey: 'deleted_at',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Tanggal Dihapus
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div className="px-2">{row.getValue('deleted_at')}</div>,
    },
    {
        accessorKey: 'removed_at',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Dihapus Permanen
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div className="px-2 text-red-600">{row.getValue('removed_at')}</div>,
    },
    {
        accessorKey: 'file',
        header: 'Dokumen',
        cell: ({ row }) => {
            const file = row.getValue('file') as string;
            const status = row.original.is_private;
            const openInNewTab = (url) => {
                window.open(url, '_blank', 'noopener,noreferrer');
            };

            const { auth } = usePage().props;
            return (
                <div>
                    {status && auth.role !== 'admin' ? (
                        <span className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-orange-500" />
                            Terkunci
                        </span>
                    ) : (
                        <a onClick={() => openInNewTab(file)} target="_blank" className="flex cursor-pointer items-center gap-2">
                            {status ? <LockIcon className="h-4 w-4 text-orange-500" /> : <Eye className="h-4 w-4 text-blue-500" />}
                            Lihat
                        </a>
                    )}
                </div>
            );
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const letter = row.original;

            const handleRestore = (id: number) => {
                router.patch(route('dokumen.restore', id));
            };

            return (
                <Button className="text-xs" onClick={() => handleRestore(letter.id)}>
                    <FolderSync /> Restore
                </Button>
            );
        },
    },
];
