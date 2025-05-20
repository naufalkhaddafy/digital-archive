import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { CirclePlus, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { LetterParams, TypeLetterParams } from '../Type';

export const ModalFormTypeLetter = ({ type }: { type?: TypeLetterParams }) => {
    const [open, setOpen] = useState<boolean>(false);

    const { setData, errors, post, patch, processing, reset } = useForm({
        name: type?.name || '',
        is_private: type?.is_private || false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        (type ? patch : post)(`/surat/jenis-surat/${type?.id || ''}`, {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className={`${type ? 'hover:bg-secondary text-red-500" w-full justify-start rounded-sm bg-transparent px-2 py-1 text-start text-sm font-normal' : 'bg-green-700 hover:border hover:border-green-600 hover:bg-white hover:text-green-600'}`}
                >
                    {type ? (
                        'Edit '
                    ) : (
                        <>
                            <CirclePlus className="mr-2" />
                            Jenis Surat
                        </>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="w-4xl">
                <DialogTitle>{type ? 'Edit' : 'Tambah'} Jenis Surat</DialogTitle>
                <DialogDescription>{type ? 'Edit' : 'Tambah'} jenis surat</DialogDescription>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Jenis Surat
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="name"
                                defaultValue={type?.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukan Nama Jenis Surat"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                    </div>
                </div>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary" type="button">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button disabled={processing} className="cursor-pointer" asChild>
                        <button onClick={submit}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Simpan
                        </button>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export const ModalDeleteTypeLetter = ({ type }: { type: TypeLetterParams }) => {
    const { delete: destroy, processing } = useForm({
        id: type.id || '',
    });
    const [open, setOpen] = useState<boolean>(false);

    const deletePost = (type: TypeLetterParams) => {
        destroy(route('jenis-surat.destroy', type.id), {
            preserveScroll: true,
            onSuccess: () => setOpen(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="hover:bg-secondary w-full rounded-sm px-2 py-1 text-start text-sm text-red-500">Hapus</button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Hapus Jenis Surat</DialogTitle>
                <DialogDescription>Apakah anda ingin menghapus Jenis Surat {type.name}</DialogDescription>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button disabled={processing} variant="destructive" asChild>
                        <button onClick={() => deletePost(type)} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Delete
                        </button>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export const ModalDeleteLetter = ({ letter }: { letter: LetterParams }) => {
    const { delete: destroy, processing } = useForm({
        id: letter.id || '',
    });
    const [open, setOpen] = useState<boolean>(false);

    const deletePost = (type: LetterParams) => {
        destroy(route('surat.destroy', type.id), {
            preserveScroll: true,
            onSuccess: () => setOpen(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="hover:bg-secondary w-full rounded-sm px-2 py-1 text-start text-sm text-red-500">Hapus</button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Hapus Surat</DialogTitle>
                <DialogDescription>Apakah anda ingin menghapus Surat {letter.name}</DialogDescription>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button disabled={processing} variant="destructive" asChild>
                        <button onClick={() => deletePost(letter)} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Delete
                        </button>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
