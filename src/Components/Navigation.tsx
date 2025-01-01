import React, { useRef, useEffect, useCallback, useState } from 'react';
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
    const {
        setSearchResults,
        searchQuery,
        setSearchQuery,
        isSearching,
        setIsSearching
    } = useSearchContext();

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const searchContainerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleSearch = useCallback(async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        setSearchError(null);

        try {
            const response = await axios.get('http://localhost:3001/search', {
                params: { q: query },
            });

            const { items } = response.data;

            if (items.length === 0) {
                setSearchError('No matching alumni found');
            }

            setSearchResults(items || []);
        } catch (error) {
            console.error('Error during search:', error);
            setSearchError('Unable to complete search. Please try again.');
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    }, [setSearchResults, setIsSearching]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchQuery.trim()) {
                handleSearch(searchQuery);
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery, handleSearch, setSearchResults]);

    const toggleSearch = () => {
        const newSearchState = !isSearchOpen;
        setIsSearchOpen(newSearchState);
        onSearchToggle?.(newSearchState);

        if (!newSearchState) {
            setSearchQuery('');
            setSearchResults([]);
            setSearchError(null);
        }
    };
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setDebouncedQuery(searchQuery);
    //         setSearchError(null);
    //     }, 300); // Reduced debounce time for better responsiveness

    //     return () => clearTimeout(timer);
    // }, [searchQuery]);

    // const handleSearch = useCallback(async () => {
    //     if (!debouncedQuery.trim()) {
    //         setSearchResults([]);
    //         return;
    //     }

    //     setIsSearching(true);
    //     setSearchError(null);

    //     try {
    //         const response = await axios.get('http://localhost:3001/search', {
    //             params: { q: debouncedQuery },
    //         });

    //         const { items } = response.data;

    //         if (items.length === 0) {
    //             setSearchError('No matching alumni found');
    //         }

    //         setSearchResults(items || []);
    //     } catch (error) {
    //         console.error('Error during search:', error);
    //         setSearchError('Unable to complete search. Please try again.');
    //         setSearchResults([]);
    //     } finally {
    //         setIsSearching(false);
    //     }
    // }, [debouncedQuery, setSearchResults]);

    // useEffect(() => {
    //     if (debouncedQuery.trim()) {
    //         handleSearch();
    //     } else {
    //         setSearchResults([]); // Clear results when search is empty
    //     }
    // }, [debouncedQuery, handleSearch, setSearchResults]);

    // const toggleSearch = () => {
    //     const newSearchState = !isSearchOpen;
    //     setIsSearchOpen(newSearchState);
    //     onSearchToggle?.(newSearchState);

    //     if (!newSearchState) {
    //         setSearchQuery('');
    //         setSearchResults([]);
    //         setSearchError(null);
    //     }
    // };

    useEffect(() => {
        if (isSearchOpen) {
            searchInputRef.current?.focus();
        }
    }, [isSearchOpen]);

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
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
                <button
                    onClick={() => {
                        const newMobileMenuState = !isMobileMenuOpen;
                        setIsMobileMenuOpen(newMobileMenuState);
                        onMobileSidebarToggle?.(newMobileMenuState);
                    }}
                    className="lg:hidden text-gray-700 hover:text-gray-900 transition-colors"
                    aria-label="Toggle Mobile Menu"
                >
                    <Menu size={24} />
                </button>

                <div className="text-xl font-semibold text-gray-900 
                    absolute 
                    left-1/2 
                    transform 
                    -translate-x-1/2 
                    lg:static 
                    lg:translate-x-0
                ">
                    Alumni Network
                </div>

                <div className="flex items-center space-x-4">
                    <div ref={searchContainerRef} className="relative">
                        <button
                            onClick={toggleSearch}
                            className="text-gray-700 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
                            aria-label={isSearchOpen ? 'Close Search' : 'Open Search'}
                        >
                            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                        </button>

                        <AnimatePresence>
                            {isSearchOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
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
                                        border-gray-200
                                    "
                                >
                                    <div className="flex items-center px-3 py-3 border-b border-gray-100">
                                        {isSearching ? (
                                            <Loader2 className="animate-spin text-gray-400 mr-2" size={20} />
                                        ) : (
                                            <Search size={20} className="text-gray-400 mr-2" />
                                        )}
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            placeholder="Search alumni by name, company, or batch..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="flex-grow px-2 py-1 outline-none text-sm"
                                        />
                                    </div>

                                    {searchError && (
                                        <div className="px-4 py-3 bg-gray-50 text-gray-600 text-sm border-t border-gray-100">
                                            {searchError}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        className="
                            bg-gray-900 
                            text-white 
                            px-4 
                            py-2 
                            rounded-lg 
                            hover:bg-gray-800 
                            transition-colors
                            text-sm
                            font-medium
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