import React from 'react';

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


const AlumniCard: React.FC<Alumni> = ({
    NAME,
    COMPANY,
    BATCH,
    PIC,
    PROFILE,
    FIELD,
    BRANCH
}) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="relative">
                <img
                    src={PIC}
                    alt={NAME}
                    className="w-full h-48 object-cover object-center"
                />
                <div className="absolute top-4 right-4 bg-white/80 rounded-full p-2">
                    <span className="text-sm font-semibold text-teal-800">
                        Batch {BATCH}
                    </span>
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-xl font-bold text-teal-900 mb-2">{NAME}</h3>
                <p className="text-gray-600 text-sm mb-3">{COMPANY}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                        {FIELD}
                    </span>
                    {BRANCH && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {BRANCH}
                        </span>
                    )}
                </div>

                <a 
                    href={PROFILE} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors"
                >
                    View Profile
                </a>
            </div>
        </div>
    );
};

export default AlumniCard;