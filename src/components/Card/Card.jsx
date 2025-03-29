import { School, MapPin, Globe, BookOpen } from 'lucide-react';

export const Card = ({ name, location, website, programs }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <School className="text-blue-600 w-6 h-6" />
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          </div>
          
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{location}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-500" />
              <a 
                href={website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {website.replace(/^https?:\/\//, '')}
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gray-500" />
              <span>{programs} programs available</span>
            </div>
          </div>
          
          <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2">
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    );
  };