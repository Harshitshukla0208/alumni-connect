import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSearchContext } from './SearchContext';
import AlumniCard from './AlumniCards';

const AlumniDashboard: React.FC = () => {
    const { searchResults } = useSearchContext();
    const [alumni, setAlumni] = useState<any[]>([]);
    const [excludeIndexes, setExcludeIndexes] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchAlumniData = useCallback(async () => {
        if (!hasMore || isLoading || searchResults.length > 0) return;

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
    }, [excludeIndexes, hasMore, isLoading, searchResults]);

    useEffect(() => {
        if (searchResults.length === 0) {
            fetchAlumniData();
        }
    }, [searchResults, fetchAlumniData]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {(searchResults.length > 0 ? searchResults : alumni).map((alumnus, index) => (
                        <AlumniCard key={index} {...alumnus} />
                    ))}
                </div>

                {isLoading && (
                    <div className="flex justify-center items-center mt-8">
                        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {!hasMore && !isLoading && searchResults.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                        No more alumni to load
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlumniDashboard;
