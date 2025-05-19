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
import { FileInput, FileOutput, LoaderCircle, Lock } from 'lucide-react';
import { useState } from 'react';

type PageSettings = {
    title: string;
    description: string;
    url: string;
    method: string;
    type: string;
};

type TypeLetter = { id: number; name: string; is_private: boolean };

const Form = ({ page_settings, type_letters }: { page_settings: PageSettings; type_letters: TypeLetter[] }) => {
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
        type_letter_id: '',
        name: '',
        code: '',
        description: '',
        file: null,
        is_private: false,
        accepted_at: '',
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
                                            onChange={(e) => setData('code', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.code} />
                                    </div>
                                </div>
                                <div className="grid w-full grid-cols-5 justify-items-center gap-4">
                                    <div className="col-span-3 w-full">
                                        <Label htmlFor="description">File</Label>
                                        <Input
                                            id="description"
                                            type="file"
                                            className="w-full"
                                            placeholder="No. Surat Otomatis"
                                            onChange={handleFileChange}
                                        />
                                        <InputError className="mt-2" message={errors.file} />
                                    </div>
                                    <div className="col-span-2 w-full">
                                        <Label htmlFor="is_private">Kunci Surat</Label>
                                        <div className="flex items-center gap-2 py-2">
                                            <Switch id="is_private" onCheckedChange={(e) => setData('is_private', e)} />
                                            <Lock className="size-5" />
                                        </div>
                                        <InputError className="mt-2" message={errors.is_private} />
                                    </div>
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="accepted_at">Tanggal diterima</Label>
                                    <Input
                                        id="accepted_at"
                                        type="date"
                                        className="w-full"
                                        placeholder="Tanggal diterima"
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
