import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import LayoutSurat from './Layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelola Surat',
        href: '/settings/profile',
    },
];

const Index = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Surat" />

            <LayoutSurat>
                <div className="space-y-6">
                    <HeadingSmall title="Arsip Surat" description="Daftar surat yang telah diarsipkan" />
                    this surat
                </div>

                {/* <DeleteUser /> */}
            </LayoutSurat>
        </AppLayout>
    );
};

export default Index;
