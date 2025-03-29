import { useParams } from 'react-router-dom';
import { School, MapPin, BookOpen, Users, DollarSign, Briefcase, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import SyllabusModal from '../../components/SyllabusModal/SyllabusModal';
import universityData from '../../data/university.json';

const UniversityDetails = () => {
    const { universityId } = useParams();
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [university, setUniversity] = useState(universityData); // peak back end engineering :)))
    
    console.log("University data:", university);

    if (!university) {
        return <div className="min-h-screen flex items-center justify-center">Loading university data...</div>;
    }

    const handleSyllabusClick = (faculty) => {
        setSelectedFaculty(faculty);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFaculty(null);
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto h-[75vh] overflow-y-auto">
                {/* University Header */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="p-8">
                        <div className="flex items-center mb-6">
                            <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                <School className="h-8 w-8 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {university?.name || "University Name Not Available"}
                                </h1>
                                <div className="flex items-center mt-2 text-gray-600">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    <span>{university?.location || "Location Not Specified"}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center text-gray-700">
                            <Users className="h-5 w-5 mr-2" />
                            <span>Phone: {university?.phoneNumber || "Not Available"}</span>
                        </div>
                    </div>
                </div>

                {/* Faculties Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                        <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                        ფაკულტეტები
                    </h2>
                    
                    <div className="space-y-4">
                        {university?.faculties?.length > 0 ? (
                            university.faculties.map((faculty) => (
                                <div key={faculty.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                    {faculty?.name || "Faculty Name Not Available"}
                                                </h3>
                                                <div className="flex items-center text-gray-600 mb-4">
                                                    <DollarSign className="h-4 w-4 mr-1" />
                                                    <span>Annual Fee: {faculty?.feePerYear || "0"} GEL</span>
                                                </div>
                                            </div>
                                            {faculty?.courses?.length > 0 && (
                                                <button
                                                    onClick={() => handleSyllabusClick(faculty)}
                                                    className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                                >
                                                    სილაბუსი
                                                </button>
                                            )}
                                        </div>

                                        {/* Program Goals */}
                                        {faculty?.programGoals?.length > 0 && (
                                            <div className="mb-4">
                                                <h4 className="font-medium text-gray-900 mb-2">პროგრამის მიზნები:</h4>
                                                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                                    {faculty.programGoals.map((goal, index) => (
                                                        <li key={index}>{goal}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Career Opportunities */}
                                        {faculty?.careerOpportunities?.length > 0 && (
                                            <div>
                                                <h4 className="font-medium text-gray-900 mb-2">კარიერული შესაძლებლობები:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {faculty.careerOpportunities.map((career, index) => (
                                                        <span 
                                                            key={index} 
                                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                                        >
                                                            <Briefcase className="h-4 w-4 mr-1" />
                                                            {career}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white p-4 rounded-lg text-center">
                                No faculties available
                            </div>
                        )}
                    </div>
                </div>

                {/* Back Button */}
                <div className="flex justify-center">
                    <button 
                        onClick={() => window.history.back()} 
                        className="flex cursor-pointer items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <ArrowRight className="h-5 w-5 mr-2 transform rotate-180" />
                        უკან დაბრუნება
                    </button>
                </div>
            </div>

            {/* Syllabus Modal */}
            {selectedFaculty && (
                <SyllabusModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    courses={selectedFaculty?.courses || []}
                />
            )}
        </div>
    );
};

export default UniversityDetails;