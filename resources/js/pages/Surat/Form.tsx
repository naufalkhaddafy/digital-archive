import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { File, FileInput, FileOutput, LoaderCircle, Lock, X } from 'lucide-react';
import { useState } from 'react';
import { LetterParams } from './Type';

type PageSettings = {
    title: string;
    description: string;
    url: string;
    method: string;
    type: string;
};

type TypeLetter = { id: number; name: string; is_private: boolean };

const Form = ({ page_settings, type_letters, letter }: { page_settings: PageSettings; type_letters: TypeLetter[]; letter?: LetterParams }) => {
    const { errors } = usePage().props;

    const [processing, setProcessing] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Daftar Surat',
            href: '/surat/daftar-surat',
        },
        {
            title: `Form ${page_settings.title}`,
            href: '/',
        },
    ];

    const { setData, data, reset } = useForm({
        type_letter_id: letter?.type_letter_id || '',
        name: letter?.name || '',
        code: letter?.code || '',
        description: letter?.description || '',
        file: letter?.file || null,
        is_private: letter?.is_private || false,
        accepted_at: letter?.accepted_at || '',
        status: page_settings.type == 'in' ? 'masuk' : 'keluar',
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

    console.log(data.file);
    const [isFile, setIsFile] = useState<boolean>(letter?.file ? true : false);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Form Surat" />
            <div className="rounded-xl px-4 py-6">
                <Heading title={`${page_settings.title}`} description={page_settings.description} />
                <div className="max-w-4xl">
                    <div className="w-full rounded-xl border p-4 shadow xl:col-span-4">
                        <div className="flex items-center justify-between border-gray-200 p-2 py-4">
                            <div className="flex items-center space-x-2">
                                {page_settings.type == 'in' ? (
                                    <FileInput className="size-5 text-green-500" />
                                ) : (
                                    <FileOutput className="size-5 text-red-500" />
                                )}
                                <h2 className="text-lg font-semibold">Form {page_settings.title}</h2>
                            </div>
                        </div>
                        <form className="p-2" onSubmit={handleSubmit}>
                            <div className="grid w-full gap-3">
                                <div className="w-full">
                                    <Label htmlFor="description">Jenis Surat</Label>
                                    <Select
                                        name="type_letter_id"
                                        onValueChange={(e) => setData('type_letter_id', e)}
                                        value={`${data.type_letter_id}`}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Jenis Surat" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {type_letters.map((type_letter) => (
                                                <SelectItem key={type_letter.id} value={`${type_letter.id}`}>
                                                    {type_letter.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError className="mt-2" message={errors.type_letter_id} />
                                </div>
                                <div className="flex w-full flex-col-reverse gap-4 lg:flex-row">
                                    <div className="w-full">
                                        <Label htmlFor="name">Nama Surat</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            className="w-full"
                                            placeholder="Masukan nama surat ..."
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.name} />
                                    </div>
                                    <div className="w-full">
                                        <Label htmlFor="code">Nomor Surat</Label>
                                        <Input
                                            id="code"
                                            type="text"
                                            className="w-full"
                                            placeholder="No. Surat"
                                            value={data.code}
                                            onChange={(e) => setData('code', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.code} />
                                    </div>
                                </div>
                                <div className="grid w-full grid-cols-5 justify-items-center gap-4">
                                    <div className="col-span-3 w-full">
                                        <Label htmlFor="description">File</Label>
                                        {isFile ? (
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
                                                        onClick={() => setIsFile(false)}
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
                                    <div className="col-span-2 w-full">
                                        <Label htmlFor="is_private">Kunci Surat</Label>
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
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="accepted_at">Tanggal {page_settings.type == 'in' ? 'Diterima' : 'Dikeluarkan'}</Label>
                                    <Input
                                        id="accepted_at"
                                        type="date"
                                        className="w-full"
                                        placeholder="Tanggal diterima"
                                        value={data.accepted_at}
                                        onChange={(e) => setData('accepted_at', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.accepted_at} />
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
