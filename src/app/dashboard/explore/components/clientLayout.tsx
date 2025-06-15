'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import {
    HomeIcon as HomeOutline,
    UserIcon as UserOutline,
    FireIcon as FireOutline,
    GlobeAltIcon as ExploreOutline,
} from '@heroicons/react/24/outline';

import {
    HomeIcon as HomeSolid,
    UserIcon as UserSolid,
    FireIcon as FireSolid,
    GlobeAltIcon as ExploreSolid,
} from '@heroicons/react/24/solid';

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        {
            href: '/dashboard/review',
            label: 'Home',
            iconOutline: HomeOutline,
            iconSolid: HomeSolid,
        },
        {
            href: '/dashboard/explore',
            label: 'Explore',
            iconOutline: ExploreOutline,
            iconSolid: ExploreSolid,
        },
        {
            href: '/dashboard/content',
            label: 'Popular',
            iconOutline: FireOutline,
            iconSolid: FireSolid,
        },
        {
            href: '/dashboard/profile',
            label: 'Profile',
            iconOutline: UserOutline,
            iconSolid: UserSolid,
        },
    ];

    return (
        <section className="flex h-screen">
            <aside
                style={{
                    background: 'linear-gradient(180deg, #3C2773 0%, #844DD4 100%)',
                }}
                className="w-[250px] h-full p-5 space-y-8 text-white shadow"
            >
                <div className="text-2xl font-bold">
                    <Link href="/dashboard">Moodie</Link>
                </div>

                <div className="flex flex-col space-y-4">
                    {navItems.map(({ href, label, iconOutline: Outline, iconSolid: Solid }) => {
                        const isActive = pathname === href;
                        const Icon = isActive ? Solid : Outline;

                        return (
                            <Button
                                key={href}
                                variant="ghost"
                                asChild
                                className={`w-full justify-start ${
                                    isActive
                                        ? 'bg-white text-purple-700 font-semibold'
                                        : 'text-white hover:text-purple-500'
                                }`}
                            >
                                <Link href={href} className="flex items-center gap-2">
                                    <Icon className="w-5 h-5" />
                                    <span>{label}</span>
                                </Link>
                            </Button>
                        );
                    })}
                </div>
            </aside>

            <main className="flex-1 p-8 bg-purple-100 overflow-y-auto">
                {children}
            </main>
        </section>
    );
}
