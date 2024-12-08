import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AlumniCard from './AlumniCards';

interface Alumni {
    NAME: string;
    COMPANY: string;
    BATCH: number;
    PIC: string;
    PROFILE: string;
    EMAIL: string;
    FIELD: string;
    BRANCH?: string | null;
}

const AlumniDashboard: React.FC = () => {
    const [alumni, setAlumni] = useState<Alumni[]>([]);
    const [excludeIndexes, setExcludeIndexes] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Fetch Alumni Data
    const fetchAlumniData = useCallback(async () => {
        if (!hasMore || isLoading) return;

        try {
            setIsLoading(true);

            const response = await axios.post('http://localhost:3001/ran', {
                indexes: excludeIndexes,
            });

            const { items, indexes, remaining } = response.data;

            if (items.length > 0) {
                setAlumni((prev) => [...prev, ...items]);
                setExcludeIndexes((prev) => [...prev, ...indexes]);
                setHasMore(remaining > 0);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching alumni data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [excludeIndexes, hasMore, isLoading]);

    // Infinite Scroll Handling
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 200 >=
                document.documentElement.offsetHeight
            ) {
                fetchAlumniData();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [fetchAlumniData]);

    // Initial Fetch
    useEffect(() => {
        fetchAlumniData();
    }, []); // Empty dependency array ensures this runs only once on mount.

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-12 px-4">
            <div className="container mx-auto max-w-6xl">

                {/* Alumni Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {alumni.map((alumnus, index) => (
                        <AlumniCard key={index} {...alumnus} />
                    ))}
                </div>

                {/* Loading Indicator */}
                {isLoading && (
                    <div className="flex justify-center items-center mt-8">
                        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {/* No More Data */}
                {!hasMore && !isLoading && (
                    <div className="text-center text-gray-500 mt-8">
                        No more alumni to load
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlumniDashboard;
