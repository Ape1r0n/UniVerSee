import { Link } from 'react-router-dom';
import { School, MapPin, Globe, BookOpen } from 'lucide-react';

export const FacultyCard = ({ UniName, FacultyName, universityId }) => {
  return (
    <Link 
      to={`/universities/${universityId}`} 
      className="block min-w-md rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <School className="h-5 w-5 text-blue-600" />
          </div>
          
          <div>
            {UniName && (
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{UniName}</h3>
            )}
            <div className="flex items-center text-gray-700">
              <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-base">{FacultyName}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          <span>View university details →</span>
        </div>
      </div>
    </Link>
  );
};