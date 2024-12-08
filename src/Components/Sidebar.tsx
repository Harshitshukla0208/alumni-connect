import React from 'react';
import { motion } from 'framer-motion';
import {
    Home,
    Users,
    Calendar,
    Briefcase,
    MessageCircle,
    Bell,
    Settings,
    LogOut,
    X
} from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { LucideProps } from 'lucide-react';

export interface Badge {
    count: number;
    color: string;
}

export interface NavigationItem {
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    label: string;
    href: string;
    badge?: Badge | null;
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const menuItems: NavigationItem[] = [
        { icon: Home, label: 'Dashboard', href: '/dashboard', badge: null },
        {
            icon: Users,
            label: 'Alumni Network',
            href: '/network',
            badge: { count: 12, color: 'bg-blue-500' }
        },
        {
            icon: Calendar,
            label: 'Events',
            href: '/events',
            badge: { count: 5, color: 'bg-green-500' }
        },
        {
            icon: Briefcase,
            label: 'Job Board',
            href: '/jobs',
            badge: { count: 8, color: 'bg-purple-500' }
        },
        {
            icon: MessageCircle,
            label: 'Forums',
            href: '/forums',
            badge: { count: 3, color: 'bg-red-500' }
        }
    ];

    const secondaryItems: NavigationItem[] = [
        { icon: Bell, label: 'Notifications', href: '/notifications', badge: null },
        { icon: Settings, label: 'Settings', href: '/settings', badge: null },
        { icon: LogOut, label: 'Logout', href: '/logout', badge: null }
    ];

    const renderBadge = (badge: Badge | null | undefined) => {
        if (!badge) return null;
        return (
            <span
                className={`
                    ml-auto 
                    px-2 
                    py-0.5 
                    rounded-full 
                    text-xs 
                    text-white
                    ${badge.color}
                `}
            >
                {badge.count}
            </span>
        );
    };

    const renderNavigationItems = (items: NavigationItem[]) => {
        return items.map((item) => (
            <a
                key={item.label}
                href={item.href}
                className="
                    flex 
                    items-center 
                    p-3 
                    hover:bg-blue-50 
                    rounded-lg 
                    transition-colors 
                    group 
                    relative
                "
            >
                <item.icon
                    className="
                        mr-3 
                        text-blue-600 
                        group-hover:text-blue-800 
                        transition-colors
                    "
                    size={20}
                />
                <span className="text-blue-800 font-medium">{item.label}</span>
                {renderBadge(item.badge)}
            </a>
        ));
    };

    return (
        <>
            {/* Mobile Sidebar */}
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: isOpen ? 0 : '-100%' }}
                transition={{ type: 'tween' }}
                className="
                    lg:hidden 
                    fixed 
                    bottom-0 
                    top-0 
                    left-0 
                    w-64 
                    bg-white 
                    shadow-lg 
                    z-50 
                    overflow-y-auto
                "
            >
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-xl font-bold text-blue-800">Alumni Network</h2>
                    <button onClick={onClose} className="text-blue-600 hover:text-blue-800">
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4">
                    {renderNavigationItems([...menuItems, ...secondaryItems])}
                </nav>
            </motion.div>

            {/* Desktop Sidebar */}
            <div
                className="
                    hidden 
                    lg:block 
                    fixed 
                    top-0 
                    left-0 
                    h-full 
                    w-64 
                    bg-white 
                    shadow-lg 
                    z-30 
                    pt-20 
                    overflow-y-auto
                "
            >
                <nav className="p-4">
                    {renderNavigationItems(menuItems)}

                    <div className="border-t my-4 border-blue-100"></div>

                    {renderNavigationItems(secondaryItems)}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;