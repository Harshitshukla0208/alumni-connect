import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { useSearchContext } from './SearchContext';
import AlumniCard from './AlumniCards';
import AlumniDetails from './AlumniDetails';
import { Loader2, Search } from 'lucide-react';

const AlumniDashboard: React.FC = () => {
    const { searchResults, searchQuery, isSearching } = useSearchContext();
    const [alumni, setAlumni] = useState<any[]>([]);
    const [excludeIndexes, setExcludeIndexes] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [selectedAlumni, setSelectedAlumni] = useState<any | null>(null);
    
    const { ref: loadingRef, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    const fetchAlumniData = useCallback(async () => {
        if (!hasMore || isLoading || searchResults.length > 0) return;
        
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:3001/ran', {
                indexes: excludeIndexes,
            });
            
            const { items, indexes, remaining } = response.data;
            
            if (items.length > 0) {
                setAlumni(prev => [...prev, ...items]);
                setExcludeIndexes(prev => [...prev, ...indexes]);
                setHasMore(remaining > 0);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching alumni data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [excludeIndexes, hasMore, isLoading, searchResults]);

    useEffect(() => {
        if (inView && !isLoading && hasMore && searchResults.length === 0 && !searchQuery) {
            fetchAlumniData();
        }
    }, [inView, fetchAlumniData, isLoading, hasMore, searchResults, searchQuery]);

    const displayedAlumni = searchResults.length > 0 ? searchResults : alumni;
    // const { ref: loadingRef, inView } = useInView({
    //     threshold: 0.1,
    //     triggerOnce: false,
    // });

    // const fetchAlumniData = useCallback(async () => {
    //     if (!hasMore || isLoading || searchResults.length > 0) return;
        
    //     try {
    //         setIsLoading(true);
    //         const response = await axios.post('http://localhost:3001/ran', {
    //             indexes: excludeIndexes,
    //         });
            
    //         const { items, indexes, remaining } = response.data;
            
    //         if (items.length > 0) {
    //             setAlumni(prev => [...prev, ...items]);
    //             setExcludeIndexes(prev => [...prev, ...indexes]);
    //             setHasMore(remaining > 0);
    //         } else {
    //             setHasMore(false);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching alumni data:', error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }, [excludeIndexes, hasMore, isLoading, searchResults]);

    // useEffect(() => {
    //     if (inView && !isLoading && hasMore && searchResults.length === 0) {
    //         fetchAlumniData();
    //     }
    // }, [inView, fetchAlumniData, isLoading, hasMore, searchResults]);

    // const displayedAlumni = searchResults.length > 0 ? searchResults : alumni;

    const handleAlumniClick = (alumnus: any) => {
        setSelectedAlumni(alumnus);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 px-4 pb-12">
            <div className="container mx-auto max-w-7xl">
                {/* Search Results Header */}
                {searchResults.length > 0 && (
                    <div className="mb-6 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Search className="w-5 h-5" />
                            <span className="font-medium">
                                Found {searchResults.length} matching {searchResults.length === 1 ? 'alumni' : 'alumni'}
                            </span>
                        </div>
                    </div>
                )}
                
                {/* Alumni Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {displayedAlumni.map((alumnus, index) => (
                            <motion.div
                                key={alumnus.EMAIL || index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => handleAlumniClick(alumnus)}
                                className="cursor-pointer"
                            >
                                <AlumniCard {...alumnus} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {displayedAlumni.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No alumni found</p>
                    </div>
                )}

                {/* Loading State */}
                {searchResults.length === 0 && (
                    <div ref={loadingRef} className="h-20 flex items-center justify-center mt-8">
                        {isLoading && (
                            <div className="flex items-center gap-2 text-gray-600">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span className="text-sm font-medium">Loading more alumni...</span>
                            </div>
                        )}
                        {!hasMore && !isLoading && (
                            <div className="text-gray-500 text-sm font-medium">
                                No more alumni to load
                            </div>
                        )}
                    </div>
                )}

                {/* Details Modal */}
                {selectedAlumni && (
                    <AlumniDetails
                        isOpen={!!selectedAlumni}
                        onClose={() => setSelectedAlumni(null)}
                        alumni={selectedAlumni}
                    />
                )}
            </div>
        </div>
    );
};

export default AlumniDashboard;