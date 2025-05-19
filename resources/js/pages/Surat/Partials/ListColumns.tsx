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
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, FileInput, FileOutput, Lock, MoreHorizontal } from 'lucide-react';
import { LetterParams } from '../Type';
import { ModalDeleteLetter } from './Modal';

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
                    Nomor Surat
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
                    Nama Surat
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div className="px-2">{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'type_letter_name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Jenis Surat
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div className="px-2">{row.getValue('type_letter_name')}</div>,
    },
    {
        accessorKey: 'status',
        header: 'Status Surat',
        cell: ({ row }) => {
            const valueStatus = row.getValue('status');
            return (
                <div className="text-md flex items-center gap-2 capitalize">
                    {valueStatus === 'masuk' ? <FileInput className="h-4 w-4 text-green-500" /> : <FileOutput className="h-4 w-4 text-red-500" />}
                    {row.getValue('status')}
                </div>
            );
        },
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

            return (
                <div>
                    {status ? (
                        <span className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-orange-500" />
                            Terkunci
                        </span>
                    ) : (
                        <a onClick={() => openInNewTab(file)} target="_blank" className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-blue-500" />
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
                        <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <ModalDeleteLetter letter={letter} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
