// components/SyllabusModal.jsx
import { X, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const SyllabusModal = ({ isOpen, onClose, courses }) => {
  if (!isOpen) return null;

  // Group courses by semester
  const semesters = {};
  courses.forEach(course => {
    if (!semesters[course.semester]) {
      semesters[course.semester] = [];
    }
    semesters[course.semester].push(course);
  });

  // Sort semesters
  const sortedSemesters = Object.keys(semesters).sort((a, b) => a - b);

  return (
    <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">სილაბუსი</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6 cursor-pointer" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    სემესტრი
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    სახელი
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    აღწერა
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    კრედიტები
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedSemesters.map(semester => (
                  semesters[semester].map((course, index) => (
                    <CourseRow 
                      key={course.id} 
                      course={course} 
                      isFirstInSemester={index === 0} 
                      semester={semester} 
                      semesterLength={semesters[semester].length} 
                    />
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            დახურვა
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseRow = ({ course, isFirstInSemester, semester, semesterLength }) => {
  const [showComment, setShowComment] = useState(false);
  const hasComments = course.reviews && course.reviews.length > 0;

  return (
    <>
      <tr>
        {isFirstInSemester && (
          <td 
            rowSpan={semesterLength + (hasComments && showComment ? 1 : 0)} 
            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 align-top"
          >
            {semester}
          </td>
        )}
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <div className="flex flex-col">
            {course.name}
            {hasComments && (
              <button
                onClick={() => setShowComment(!showComment)}
                className="flex items-center text-blue-600 text-xs mt-1 hover:underline"
              >
                <MessageSquare className="h-3 w-3 mr-1" />
                <span className='cursor-pointer'>
                  {showComment ? 'კომენტარის დამალვა' : 'კომენტარის ნახვა'}
                </span>
                {showComment ? (
                  <ChevronUp className="h-3 w-3 ml-1" />
                ) : (
                  <ChevronDown className="h-3 w-3 ml-1" />
                )}
              </button>
            )}
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">
          {course.description}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {course.credits}
        </td>
      </tr>
      
      {hasComments && showComment && (
        <tr className="bg-gray-50">
          <td colSpan="4" className="px-6 py-4">
            <div className="space-y-3">
              {course.reviews.map((review, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">{review.reviewerName}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-600 text-xs mr-1">
                        {review.rating}/10
                      </span>
                      <div className="h-2 w-20 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500" 
                          style={{ width: `${review.rating * 10}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="mt-1 text-gray-700 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default SyllabusModal;