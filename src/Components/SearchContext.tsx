import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
    searchResults: any[];
    setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
    children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [searchResults, setSearchResults] = useState<any[]>([]);

    return (
        <SearchContext.Provider value={{ searchResults, setSearchResults }}>
            {children}
        </SearchContext.Provider>
    );
};

// Custom hook to use the search context
export const useSearchContext = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
};
