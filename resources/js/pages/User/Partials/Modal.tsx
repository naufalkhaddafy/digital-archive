import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { CirclePlus, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { UserParams } from '../Type';

export const ModalFormUser = ({ type }: { type?: UserParams }) => {
    const [open, setOpen] = useState<boolean>(false);

    const { data, setData, errors, post, patch, processing, reset } = useForm({
        name: type?.name || '',
        role: type?.role || '',
        email: type?.email || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        (type ? patch : post)(`/pengguna/${type?.id || ''}`, {
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
                            Pengguna
                        </>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="w-4xl">
                <DialogTitle>{type ? 'Edit' : 'Tambah'} Pengguna</DialogTitle>
                <DialogDescription>{type ? 'Edit' : 'Tambah'} pengguna sistem</DialogDescription>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nama
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="name"
                                defaultValue={type?.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukan Nama Pengguna"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                            Role
                        </Label>
                        <div className="col-span-3">
                            <Select name="role" defaultValue={type?.role} onValueChange={(e) => setData('role', e)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="staff">Staff</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.role} className="mt-2" />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="email"
                                defaultValue={type?.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Masukan Email"
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                    </div>
                    {type && <label className="text-sm text-red-500">Masukan Password Jika ingin mengganti password</label>}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="password"
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                placeholder="Masukan pasword.."
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password-confirm" className="text-right">
                            Konfirmasi Password
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="password-confirm"
                                type="password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Masukan konfirmasi password.."
                            />
                            <InputError message={errors.password} className="mt-2" />
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

export const ModalDeleteUser = ({ type }: { type: UserParams }) => {
    const { delete: destroy, processing } = useForm({
        id: type.id || '',
    });
    const [open, setOpen] = useState<boolean>(false);

    const deletePost = (type: UserParams) => {
        destroy(route('pengguna.destroy', type.id), {
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
                <DialogTitle>Hapus Pengguna </DialogTitle>
                <DialogDescription>Apakah anda ingin menghapus Pengguna {type.name}</DialogDescription>
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
