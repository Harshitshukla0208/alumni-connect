import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Menu, Loader2 } from 'lucide-react';
import { useSearchContext } from './SearchContext';

interface NavbarProps {
    onSearchToggle?: (isOpen: boolean) => void;
    onMobileSidebarToggle?: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
    onSearchToggle,
    onMobileSidebarToggle,
}) => {
    const { setSearchResults } = useSearchContext();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null); // New ref for search input
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    // Advanced debounce with cancellation
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
            setSearchError(null);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Advanced search handler with error handling and loading state
    const handleSearch = useCallback(async () => {
        if (!debouncedQuery.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        setSearchError(null);

        try {
            const response = await axios.get('http://localhost:3001/search', {
                params: { q: debouncedQuery },
            });

            const { items } = response.data;
            
            if (items.length === 0) {
                setSearchError('No results found');
            }

            setSearchResults(items);
        } catch (error) {
            console.error('Error during search:', error);
            setSearchError('Failed to perform search. Please try again.');
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    }, [debouncedQuery, setSearchResults]);

    // Trigger search when debounced query changes
    useEffect(() => {
        if (debouncedQuery.trim()) {
            handleSearch();
        }
    }, [debouncedQuery, handleSearch]);

    const toggleSearch = () => {
        const newSearchState = !isSearchOpen;
        setIsSearchOpen(newSearchState);
        onSearchToggle?.(newSearchState);
        
        // Reset search state when closing
        if (!newSearchState) {
            setSearchQuery('');
            setSearchResults([]);
            setSearchError(null);
        }
    };

    // Focus on search input when search opens
    useEffect(() => {
        if (isSearchOpen) {
            searchInputRef.current?.focus();
        }
    }, [isSearchOpen]);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target as Node)
            ) {
                toggleSearch();
            }
        };

        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchOpen]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
                {/* Mobile menu toggle */}
                <button
                    onClick={() => {
                        const newMobileMenuState = !isMobileMenuOpen;
                        setIsMobileMenuOpen(newMobileMenuState);
                        onMobileSidebarToggle?.(newMobileMenuState);
                    }}
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

                {/* Search and Actions */}
                <div className="flex items-center space-x-4">
                    <div ref={searchContainerRef} className="relative">
                        {/* Search Toggle Button */}
                        <button
                            onClick={toggleSearch}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            aria-label={isSearchOpen ? 'Close Search' : 'Open Search'}
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
                                        max-w-[400px] 
                                        bg-white 
                                        shadow-lg 
                                        rounded-lg 
                                        overflow-hidden
                                        z-50
                                        border
                                    "
                                >
                                    {/* Search Input */}
                                    <div className="flex items-center px-2 py-2 border-b">
                                        {isSearching ? (
                                            <Loader2 className="animate-spin text-blue-500 mr-2" size={20} />
                                        ) : (
                                            <Search size={20} className="text-gray-400 mr-2" />
                                        )}
                                        <input
                                            ref={searchInputRef} // Add ref to input
                                            type="text"
                                            placeholder="Search alumni, events..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="
                                                flex-grow 
                                                px-2 
                                                py-1 
                                                outline-none 
                                                text-sm
                                                focus:ring-2 
                                                focus:ring-blue-300
                                            "
                                            aria-label="Search input"
                                        />
                                    </div>

                                    {/* Search Error Message */}
                                    {searchError && (
                                        <div className="px-4 py-2 bg-red-50 text-red-600 text-sm">
                                            {searchError}
                                        </div>
                                    )}
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