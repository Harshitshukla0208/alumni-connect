import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
    searchResults: any[];
    setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
    isSearching: boolean;
    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
    children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SearchContext.Provider value={{ 
            searchResults, 
            setSearchResults,
            isSearching,
            setIsSearching,
            searchQuery,
            setSearchQuery
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
};