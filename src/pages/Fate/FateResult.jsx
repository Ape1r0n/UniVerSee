import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/Button/Button';

const FateResult = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const result = state?.result || {};

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl relative z-10">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 mb-6 hover:underline"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        უკან დაბრუნება
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center">თქვენი შედეგი</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
        
        <div className="flex justify-center">
          <Button
            onClick={() => navigate('/fate')}
            className="px-6 py-3 text-lg"
          >
            ხელახლა ცდა
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FateResult;