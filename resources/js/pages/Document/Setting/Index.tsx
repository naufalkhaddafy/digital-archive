import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppLayout from '@/layouts/app-layout';
import { TypeLetterParams } from '@/pages/Surat/Type';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Settings } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dokumen Setting',
        href: '/',
    },
];
const Index = ({ type, retensi }: { type: TypeLetterParams[]; retensi: any }) => {
    const { data, setData, patch, processing, errors } = useForm({
        time: retensi.value.time || '1',
        documents: retensi.value.documents || [],
    });

    const onChecked = (checked, value) => {
        if (checked) {
            setData('documents', [...data.documents, value]);
        } else {
            setData(
                'documents',
                data.documents.filter((item) => item !== value),
            );
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('dokumen.settings.update'));
    };

    console.log(data);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Arsip Dokumen" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading title="Dokumen Setting" description="halaman untuk setting manajeman data dokumen" />
                <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800">
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center gap-3 border-b pb-2">
                            <Settings className="size-6" />
                            <p className="py-2 text-xl font-semibold">Manajemen Retensi</p>
                        </div>
                        <div className="p-4">
                            <div className="my-3 flex flex-col">
                                <Label htmlFor="" className="mb-2 text-lg font-bold">
                                    Durasi Retensi
                                </Label>
                                <RadioGroup
                                    defaultValue={data.time}
                                    onValueChange={(value) => setData('time', value)}
                                    className="flex flex-wrap py-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="1" id="one-year" />
                                        <Label htmlFor="one-year">1 Tahun</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="2" id="two-year" />
                                        <Label htmlFor="two-year">2 Tahun</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="3" id="three-year" />
                                        <Label htmlFor="three-year">3 Tahun</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="4" id="four-year" />
                                        <Label htmlFor="four-year">4 Tahun</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="5" id="five-year" />
                                        <Label htmlFor="five-year">5 Tahun</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="" className="mb-4 text-lg font-bold">
                                    Dokumen dimusnahkan
                                </Label>
                                <div className="flex flex-wrap items-center gap-3">
                                    {type.map((item, index) => {
                                        return (
                                            <div className="flex items-center gap-2" key={index}>
                                                <Checkbox
                                                    id={`${item.id}`}
                                                    value={item.id}
                                                    defaultChecked={data.documents.includes(item.id)}
                                                    onCheckedChange={(e) => onChecked(e, item.id)}
                                                />
                                                <label
                                                    htmlFor={`${item.id}`}
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {item.name}
                                                </label>
                                            </div>
                                        );
                                    })}
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="all-document"
                                            onCheckedChange={(e) => onChecked(e, 'all')}
                                            defaultChecked={data.documents.includes('all')}
                                        />
                                        <label
                                            htmlFor="all-document"
                                            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Dokumen Arsip
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <InputError className="mt-2" message={errors.time || errors.documents} />

                        <div className="mt-3 px-3 py-4">
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
        </AppLayout>
    );
};

export default Index;
