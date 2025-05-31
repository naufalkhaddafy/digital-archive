'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LetterParams } from '@/pages/Surat/Type';
import { Link, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, Lock, LockIcon, MoreHorizontal } from 'lucide-react';
import { ModalDeleteDocument } from './Modal';

// import { ModalDeleteUser, ModalFormUser } from './ModalUser';

export const columns: ColumnDef<LetterParams>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false,
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

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem>Lihat Detail</DropdownMenuItem> */}
                        <DropdownMenuItem asChild>
                            <Link href={letter.url}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <ModalDeleteDocument letter={letter} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
