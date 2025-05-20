import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LetterParams } from '@/pages/Surat/Type';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

export const ModalDeleteDocument = ({ letter }: { letter: LetterParams }) => {
    const { delete: destroy, processing } = useForm({
        id: letter.id || '',
    });
    const [open, setOpen] = useState<boolean>(false);

    const deletePost = (type: LetterParams) => {
        destroy(route('dokumen.destroy', type.id), {
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
                <DialogTitle>Hapus Dokumen</DialogTitle>
                <DialogDescription>Apakah anda ingin menghapus Dokumen {letter.name}</DialogDescription>
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
