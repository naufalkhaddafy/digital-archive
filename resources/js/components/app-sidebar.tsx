import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { FileStack, FolderArchive, FolderClock, FolderCog, LayoutGrid, Mails, UserCog } from 'lucide-react';
import AppLogo from './app-logo';

const authUser = () => {
    const { auth } = usePage().props;
    return auth?.role ?? null;
};

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

const getSuratMenu = (): NavItem[] => {
    const role = authUser();

    const menu: NavItem[] = [
        {
            title: 'Daftar Surat',
            href: '/surat/daftar-surat',
            icon: Mails,
        },
    ];

    if (role === 'admin') {
        menu.push({
            title: 'Jenis Surat',
            href: '/surat/jenis-surat',
            icon: FileStack,
        });
    }

    return menu;
};

const getFileMenu = (): NavItem[] => {
    const role = authUser();

    const menu: NavItem[] = [
        {
            title: 'Arsip Dokumen',
            href: '/dokumen',
            icon: FolderCog,
        },
    ];

    if (role === 'admin') {
        menu.push(
            {
                title: 'Setting Retensi',
                href: '/dokumen/settings',
                icon: FolderClock,
            },
            {
                title: 'Dokumen Terhapus',
                href: '/dokumen-terhapus',
                icon: FolderArchive,
            },
        );
    }

    return menu;
};
const fileMenu: NavItem[] = [];

const userMenu: NavItem[] = [
    {
        title: 'User Settings',
        href: '/pengguna',
        icon: UserCog,
    },
];

export function AppSidebar() {
    // const { auth } = usePage().props;
    return (
        <Sidebar collapsible="icon" variant="inset" className="bg-[#8b2727]">
            <SidebarHeader className="bg-[#8b2727]">
                <SidebarMenu className="bg-[#8b2727]">
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="bg-[#8b2727]">
                <NavMain items={mainNavItems} title="Platform" />
                <NavMain items={getSuratMenu()} title="Kelola Surat" />
                <NavMain items={getFileMenu()} title="File Manager" />
                {authUser() === 'admin' && <NavMain items={userMenu} title="Manajemen User" />}
            </SidebarContent>

            <SidebarFooter className="bg-[#8b2727]">
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
