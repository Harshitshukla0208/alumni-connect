import React from 'react';
import { ExternalLink, GraduationCap, Briefcase, Mail } from 'lucide-react';

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
    EMAIL,
    FIELD,
    BRANCH,
}) => {
    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden w-full max-w-sm mx-auto transition-shadow duration-300">
            {/* Profile Picture */}
            <div className="flex justify-center bg-gray-50 pt-6 pb-4">
                <img
                    src={PIC}
                    alt={NAME}
                    className="rounded-full w-32 h-32 object-cover border-3 border-gray-200 shadow-md"
                />
            </div>

            {/* Card Content */}
            <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {NAME}
                </h3>
                
                <div className="space-y-2 mb-4">
                    <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
                        <Briefcase className="w-4 h-4 text-gray-500" />
                        {COMPANY}
                    </p>
                    
                    <div className="flex justify-center items-center gap-2">
                        <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                            <GraduationCap className="w-4 h-4 text-gray-600" />
                            Batch {BATCH}
                        </span>
                    </div>
                </div>

                {/* Field and Branch */}
                <div className="flex justify-center flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                        {FIELD}
                    </span>
                    {BRANCH && (
                        <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                            {BRANCH}
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-2">
                    <a
                        href={PROFILE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Profile
                    </a>
                    
                    <a
                        href={`mailto:${EMAIL}`}
                        className="bg-gray-100 text-gray-700 p-2 rounded-md hover:bg-gray-200 transition-colors"
                        title="Send Email"
                    >
                        <Mail className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AlumniCard;