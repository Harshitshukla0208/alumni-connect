import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GraduationCap, Briefcase, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full"
        >
            <Card className="overflow-hidden bg-white h-full">
                <CardHeader className="p-0">
                    <div className="relative h-32 bg-gradient-to-r from-blue-600 to-blue-500">
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                            <img
                                src='https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo='
                                alt={NAME}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover transition-shadow duration-200"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-20 pb-6 px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="text-center"
                    >
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {NAME}
                        </h3>
                        <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                            <Briefcase className="w-4 h-4" />
                            <span className="text-sm">{COMPANY}</span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <GraduationCap className="w-4 h-4" />
                                Batch {BATCH}
                            </Badge>
                            <Badge variant="secondary">
                                {FIELD}
                            </Badge>
                            {BRANCH && (
                                <Badge variant="secondary">
                                    {BRANCH}
                                </Badge>
                            )}
                        </div>

                        <div className="flex gap-3 justify-center">
                            <Button
                                asChild
                                variant="default"
                                className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                            >
                                <a
                                    href={PROFILE}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Profile
                                </a>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="transition-colors duration-200"
                            >
                                <a
                                    href={`mailto:${EMAIL}`}
                                    className="flex items-center gap-2"
                                >
                                    <Mail className="w-4 h-4" />
                                    Email
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default AlumniCard;