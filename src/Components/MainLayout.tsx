import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import Navbar from './Navigation';
import Sidebar from './Sidebar';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const savedSidebarState = localStorage.getItem('mobileSidebarState');
        if (savedSidebarState) {
            setIsMobileSidebarOpen(JSON.parse(savedSidebarState));
        }
        
        const timer = setTimeout(() => setIsInitialLoad(false), 300);
        return () => clearTimeout(timer);
    }, []);

    // Save mobile sidebar state when it changes
    useEffect(() => {
        localStorage.setItem('mobileSidebarState', JSON.stringify(isMobileSidebarOpen));
    }, [isMobileSidebarOpen]);

    const MobileSidebarTrigger = () => (
        <motion.button
            key="mobile-sidebar-trigger"
            initial={{ 
                opacity: isInitialLoad ? 0 : 1, 
                scale: isInitialLoad ? 0.8 : 1 
            }}
            animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                    duration: 0.3,
                    ease: "easeOut"
                }
            }}
            exit={{ 
                opacity: 0, 
                scale: 0.8,
                transition: { 
                    duration: 0.2
                }
            }}
            className="
                lg:hidden
                fixed
                bottom-4
                left-4
                z-40
                bg-blue-600
                text-white
                p-3
                rounded-full
                shadow-lg
                hover:bg-blue-700
                transition-all
                duration-300
            "
            aria-label="Open Menu"
            onClick={() => setIsMobileSidebarOpen(true)}
        >
            <Menu size={24} />
        </motion.button>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar
                onSearchToggle={(isOpen) => setIsSearchOpen(isOpen)}
                onMobileSidebarToggle={(isOpen) => setIsMobileSidebarOpen(isOpen)}
            />

            <Sidebar
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />

            <main
                className={`
                    lg:pl-64
                    pt-20
                    transition-all
                    duration-300
                    ease-in-out
                    ${isSearchOpen ? 'opacity-50 pointer-events-none' : ''}
                `}
            >
                {children}
            </main>

            <AnimatePresence>
                {!isMobileSidebarOpen && (
                    <MobileSidebarTrigger />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isMobileSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="
                            lg:hidden
                            fixed
                            inset-0
                            bg-black
                            z-40
                        "
                        onClick={() => setIsMobileSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default MainLayout;