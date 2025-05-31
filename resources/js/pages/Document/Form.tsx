import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { File, FilePlus, LoaderCircle, Lock, LockIcon, X } from 'lucide-react';
import { useState } from 'react';
import { LetterParams } from '../Surat/Type';

type PageSettings = {
    title: string;
    description: string;
    url: string;
    method: string;
    type: string;
};

const Form = ({ page_settings, document }: { page_settings: PageSettings; document?: LetterParams }) => {
    const { errors, auth } = usePage().props;

    const [processing, setProcessing] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Arsip Dokumen',
            href: '/dokumen',
        },
        {
            title: `Form ${page_settings.title}`,
            href: '/',
        },
    ];

    const { setData, data, reset } = useForm({
        name: document?.name || '',
        code: document?.code || '',
        description: document?.description || '',
        file: document?.file || null,
        is_private: document?.is_private || false,
        accepted_at: document?.accepted_at || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(
            page_settings.url,
            {
                _method: page_settings.method == 'POST' ? 'POST' : 'PATCH',
                ...data,
            },
            {
                preserveScroll: true,
                onStart: () => setProcessing(true),
                onSuccess: () => (page_settings.method == 'POST' ? reset() : ''),
                onFinish: () => setProcessing(false),
            },
        );
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('file', file);
        }
    };

    const [isFile, setIsFile] = useState<boolean>(document?.file ? true : false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Form Surat" />
            <div className="rounded-xl px-4 py-6">
                <Heading title={`${page_settings.title}`} description={page_settings.description} />
                <div className="max-w-4xl">
                    <div className="w-full rounded-xl border bg-gray-100/50 p-4 shadow xl:col-span-4">
                        <div className="flex items-center justify-between border-gray-200 p-2 py-4">
                            <div className="flex items-center space-x-2">
                                <FilePlus className="size-5 text-green-500" />
                                <h2 className="text-lg font-semibold">Form {page_settings.title}</h2>
                            </div>
                        </div>
                        <form className="p-2" onSubmit={handleSubmit}>
                            <div className="grid w-full gap-3">
                                <div className="flex w-full flex-col-reverse gap-4 lg:flex-row">
                                    <div className="w-full">
                                        <Label htmlFor="name">Nama Dokumen</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            className="w-full"
                                            placeholder="Masukan nama dokumen ..."
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.name} />
                                    </div>
                                    <div className="w-full">
                                        <Label htmlFor="code">Nomor Dokumen</Label>
                                        <Input
                                            id="code"
                                            type="text"
                                            className="w-full"
                                            placeholder="No. dokumen"
                                            value={data.code}
                                            onChange={(e) => setData('code', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.code} />
                                    </div>
                                </div>
                                <div className="grid w-full grid-cols-5 justify-items-center gap-4">
                                    <div className="col-span-5 w-full">
                                        <Label htmlFor="description">File</Label>
                                        {isFile && data.is_private == false ? (
                                            <div className="max-w-md rounded-lg border p-2 shadow">
                                                <div className="flex items-center justify-between px-2">
                                                    <a href={`${data.file}`} target="_blank" className="flex w-full items-center gap-2">
                                                        <div className="flex items-center space-x-4">
                                                            <File className="size-5 text-gray-500" />
                                                            <h3 className="text-md font-semibold">Lihat Surat</h3>
                                                        </div>
                                                    </a>
                                                    <X
                                                        className="size-5 cursor-pointer text-gray-500 transition-all hover:scale-125"
                                                        onClick={() => {
                                                            setIsFile(false);
                                                            setData('file', null);
                                                        }}
                                                    />
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
                                                    <a href={`${data.file}`} target="_blank" className="flex w-full items-center gap-2">
                                                        <div className="flex items-center space-x-4">
                                                            <File className="size-5 text-gray-500" />
                                                            <h3 className="text-md font-semibold">Lihat Surat</h3>
                                                        </div>
                                                    </a>
                                                    <X
                                                        className="size-5 cursor-pointer text-gray-500 transition-all hover:scale-125"
                                                        onClick={() => {
                                                            setIsFile(false);
                                                            setData('file', null);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <Input
                                                id="description"
                                                type="file"
                                                className="w-full"
                                                placeholder="No. Surat Otomatis"
                                                onChange={handleFileChange}
                                            />
                                        )}

                                        <InputError className="mt-2" message={errors.file} />
                                    </div>
                                    {auth.role === 'admin' && (
                                        <div className="col-span-2 w-full">
                                            <Label htmlFor="is_private">Kunci Dokumen</Label>
                                            <div className="flex items-center gap-2 py-2">
                                                <Switch
                                                    id="is_private"
                                                    onCheckedChange={(e) => setData('is_private', e)}
                                                    defaultChecked={data.is_private === 1 ? true : false}
                                                />
                                                <Lock className="size-5" />
                                            </div>
                                            <InputError className="mt-2" message={errors.is_private} />
                                        </div>
                                    )}
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="description">Deskripsi (optional)</Label>
                                    <Textarea
                                        id="description"
                                        className="w-full"
                                        placeholder="Masukan deskripsi surat ..."
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.description} />
                                </div>
                            </div>

                            <div className="mt-3 py-7">
                                <Button asChild className="cursor-pointer">
                                    <button type="submit">
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Simpan
                                    </button>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Form;
