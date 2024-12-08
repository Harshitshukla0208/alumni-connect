import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Menu } from 'lucide-react';

interface NavbarProps {
    onSearchToggle?: (isOpen: boolean) => void;
    onMobileSidebarToggle?: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
    onSearchToggle,
    onMobileSidebarToggle
}) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle search toggling
    const toggleSearch = () => {
        const newSearchState = !isSearchOpen;
        setIsSearchOpen(newSearchState);
        onSearchToggle?.(newSearchState);
    };

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target as Node)
            ) {
                setIsSearchOpen(false);
                onSearchToggle?.(false);
            }
        };

        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchOpen, onSearchToggle]);

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault(); // Prevent form submission
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
            // Implement actual search logic
            // Optionally, close search after searching
            setIsSearchOpen(false);
            onSearchToggle?.(false);
        }
    };

    // Mobile Menu Toggle
    const toggleMobileMenu = () => {
        const newMobileMenuState = !isMobileMenuOpen;
        setIsMobileMenuOpen(newMobileMenuState);
        onMobileSidebarToggle?.(newMobileMenuState);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
                {/* Mobile Menu Trigger */}
                <button
                    onClick={toggleMobileMenu}
                    className="lg:hidden text-blue-600 hover:text-blue-800 transition-colors"
                    aria-label="Toggle Mobile Menu"
                >
                    <Menu size={24} />
                </button>

                {/* Logo */}
                <div className="text-xl font-bold text-blue-800 
                    absolute 
                    left-1/2 
                    transform 
                    -translate-x-1/2 
                    lg:static 
                    lg:translate-x-0
                ">
                    Alumni Network
                </div>

                {/* Desktop and Mobile Navigation Actions */}
                <div className="flex items-center space-x-4">
                    {/* Search Trigger */}
                    <div ref={searchContainerRef} className="relative">
                        <button
                            onClick={toggleSearch}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            aria-label={isSearchOpen ? "Close Search" : "Open Search"}
                        >
                            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                        </button>

                        <AnimatePresence>
                            {isSearchOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ type: 'tween' }}
                                    className="
                                        absolute 
                                        top-full 
                                        right-0 
                                        mt-2 
                                        w-screen 
                                        max-w-[300px] 
                                        bg-white 
                                        shadow-lg 
                                        rounded-lg 
                                        overflow-hidden
                                        z-50
                                    "
                                >
                                    <form onSubmit={handleSearch} className="flex">
                                        <input
                                            type="text"
                                            placeholder="Search alumni, events..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="
                                                flex-grow 
                                                px-4 
                                                py-2 
                                                outline-none 
                                                border-b 
                                                focus:ring-2 
                                                focus:ring-blue-300
                                            "
                                            aria-label="Search input"
                                        />
                                        <button
                                            type="submit"
                                            className="
                                                bg-blue-600 
                                                text-white 
                                                px-4 
                                                hover:bg-blue-700 
                                                transition-colors
                                            "
                                            aria-label="Search"
                                        >
                                            Go
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Login Button */}
                    <button 
                        className="
                            bg-blue-600 
                            text-white 
                            px-4 
                            py-2 
                            rounded-lg 
                            hover:bg-blue-700 
                            transition-colors
                            hidden 
                            lg:block
                        "
                    >
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;