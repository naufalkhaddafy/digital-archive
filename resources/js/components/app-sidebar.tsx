import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { FileStack, FolderArchive, FolderClock, FolderCog, LayoutGrid, Mails, UserCog } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

const suratMenu: NavItem[] = [
    {
        title: 'Daftar Surat',
        href: '/surat/daftar-surat',
        icon: Mails,
    },
    {
        title: 'Jenis Surat',
        href: '/surat/jenis-surat',
        icon: FileStack,
    },
];

const fileMenu: NavItem[] = [
    {
        title: 'Arsip Dokumen',
        href: '/dokumen',
        icon: FolderCog,
    },
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
];

const userMenu: NavItem[] = [
    {
        title: 'User Settings',
        href: '/pengguna',
        icon: UserCog,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;
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
                <NavMain items={suratMenu} title="Kelola Surat" />
                <NavMain items={fileMenu} title="File Manager" />
                {auth.role === 'admin' && <NavMain items={userMenu} title="Manajemen User" />}
            </SidebarContent>

            <SidebarFooter className="bg-[#8b2727]">
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
