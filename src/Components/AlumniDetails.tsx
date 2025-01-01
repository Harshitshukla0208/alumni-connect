import React from 'react';
import { Mail, GraduationCap, Briefcase, MapPin, Phone, Globe, Linkedin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface AlumniDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    alumni: {
        NAME: string;
        COMPANY: string;
        BATCH: number;
        PIC: string;
        PROFILE: string;
        EMAIL: string;
        FIELD: string;
        BRANCH?: string;
        PHONE?: string;
        LOCATION?: string;
        LINKEDIN?: string;
        WEBSITE?: string;
        BIO?: string;
    };
}

const AlumniDetails: React.FC<AlumniDetailsProps> = ({ isOpen, onClose, alumni }) => {
    return (
        <Dialog open={isOpen} onOpenChange={() => onClose()}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Alumni Details</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-3 gap-6 p-6">
                    {/* Profile Section */}
                    <div className="text-center md:border-r md:pr-6">
                        <img
                            src='https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo='
                            alt={alumni.NAME}
                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                        />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{alumni.NAME}</h3>
                        <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                            <Briefcase className="w-4 h-4" />
                            <span className="text-sm">{alumni.COMPANY}</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <GraduationCap className="w-4 h-4" />
                                Batch {alumni.BATCH}
                            </Badge>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="md:col-span-2">
                        {alumni.BIO && (
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">About</h4>
                                <p className="text-gray-600 text-sm">{alumni.BIO}</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Contact Information</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Mail className="w-4 h-4" />
                                        <span className="text-sm">{alumni.EMAIL}</span>
                                    </div>
                                    {alumni.PHONE && (
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Phone className="w-4 h-4" />
                                            <span className="text-sm">{alumni.PHONE}</span>
                                        </div>
                                    )}
                                    {alumni.LOCATION && (
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <MapPin className="w-4 h-4" />
                                            <span className="text-sm">{alumni.LOCATION}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Professional Details</h4>
                                <div className="space-y-2">
                                    <Badge className="mr-2">{alumni.FIELD}</Badge>
                                    {alumni.BRANCH && <Badge variant="outline">{alumni.BRANCH}</Badge>}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
                            {alumni.LINKEDIN && (
                                <Button variant="outline" asChild>
                                    <a href={alumni.LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                        <Linkedin className="w-4 h-4" />
                                        LinkedIn Profile
                                    </a>
                                </Button>
                            )}
                            {alumni.WEBSITE && (
                                <Button variant="outline" asChild>
                                    <a href={alumni.WEBSITE} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                        <Globe className="w-4 h-4" />
                                        Website
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AlumniDetails;