import Heading from '@/components/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { File, FilePlus, Lock, LockIcon } from 'lucide-react';
import { useState } from 'react';
import { LetterParams } from '../Surat/Type';

type PageSettings = {
    title: string;
    description: string;
    url: string;
    method: string;
    type: string;
};

const Detail = ({ page_settings, document }: { page_settings: PageSettings; document?: LetterParams }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Arsip Dokumen',
            href: '/dokumen',
        },
        {
            title: `${page_settings.title}`,
            href: '/',
        },
    ];
    const [isFile] = useState<boolean>(document?.file ? true : false);
    const { auth } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Dokumen" />
            <div className="rounded-xl px-4 py-6">
                <Heading title={`${page_settings.title}`} description={page_settings.description} />
                <div className="max-w-4xl">
                    <div className="w-full rounded-xl border bg-gray-100/50 p-4 shadow xl:col-span-4">
                        <div className="flex items-center justify-between border-gray-200 p-2 py-4">
                            <div className="flex items-center space-x-2">
                                <FilePlus className="size-5 text-green-500" />
                                <h2 className="text-lg font-semibold">{page_settings.title}</h2>
                            </div>
                        </div>
                        <form className="p-2">
                            <div className="grid w-full gap-3">
                                <div className="flex w-full flex-col-reverse gap-4 lg:flex-row">
                                    <div className="w-full">
                                        <Label htmlFor="name">Nama Dokumen</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            className="w-full"
                                            placeholder="Masukan nama dokumen ..."
                                            value={document?.name}
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Label htmlFor="code">Nomor Dokumen</Label>
                                        <Input id="code" type="text" className="w-full" placeholder="No. dokumen" value={document?.code} readOnly />
                                    </div>
                                </div>
                                <div className="grid w-full grid-cols-5 justify-items-center gap-4">
                                    <div className="col-span-5 w-full">
                                        <Label htmlFor="description">File</Label>
                                        {isFile && document?.is_private == false ? (
                                            <div className="max-w-md rounded-lg border p-2 shadow">
                                                <div className="flex items-center justify-between px-2">
                                                    <a href={`${document?.file}`} target="_blank" className="flex w-full items-center gap-2">
                                                        <div className="flex items-center space-x-4">
                                                            <File className="size-5 text-gray-500" />
                                                            <h3 className="text-md font-semibold">Lihat Surat</h3>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        ) : isFile && auth.role === 'staff' ? (
                                            <div className="flex items-center gap-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center space-x-4">
                                                        <File className="size-5 text-gray-500" />
                                                        <h3 className="text-md font-semibold">Dokumen Terkunci</h3>
                                                    </div>
                                                </div>
                                                <LockIcon />
                                            </div>
                                        ) : isFile && auth.role === 'admin' ? (
                                            <div className="max-w-md rounded-lg border p-2 shadow">
                                                <div className="flex items-center justify-between px-2">
                                                    <a href={`${document?.file}`} target="_blank" className="flex w-full items-center gap-2">
                                                        <div className="flex items-center space-x-4">
                                                            <File className="size-5 text-gray-500" />
                                                            <h3 className="text-md font-semibold">Lihat Surat</h3>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        ) : (
                                            <Input id="description" type="file" className="w-full" placeholder="No. Surat Otomatis" />
                                        )}
                                    </div>
                                    {auth.role === 'admin' && (
                                        <div className="col-span-2 w-full">
                                            <Label htmlFor="is_private">Kunci Dokumen</Label>
                                            <div className="flex items-center gap-2 py-2">
                                                <Switch id="is_private" defaultChecked={document?.is_private === 1 ? true : false} disabled />
                                                <Lock className="size-5" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Deskripsi (optional)</Label>
                                    <Textarea
                                        id="description"
                                        className="w-full"
                                        placeholder="Masukan deskripsi surat ..."
                                        value={document?.description}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Detail;
