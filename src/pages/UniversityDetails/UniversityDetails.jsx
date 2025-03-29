import { useParams } from 'react-router-dom';
import { School, MapPin, BookOpen, Users, DollarSign, Briefcase, ArrowRight } from 'lucide-react';

const UniversityDetails = () => {
  const { universityId } = useParams();
  
const university = {
  "id": "01e14075-45ee-433f-b75c-279f3973d357",
  "name": "ქუთაისის საერთაშორისო უნივერსიტეტი",
  "description": "",
  "location": "ქუთაისი, საქართველო",
  "phoneNumber": "(+995) 577 477197",
  "faculties": [
    {
      "id": "750163b9-d05f-4728-b738-0eeecaf5e47b",
      "universityId": "01e14075-45ee-433f-b75c-279f3973d357",
      "name": "მათემატიკა",
      "description": "",
      "feePerYear": 2250,
      "programGoals": [
        "მათემატიკის ძირითადი სფეროების კონცეპტუალური და ოპერაციული გაგების ათვისება.",
        "პრობლემების გადაჭრის უნარ-ჩვევების განვითარება, მათ შორის გამოთვლითი და მოდელირების შესაძლებლობები.",
        "ეფექტური კომუნიკაციის, კრიტიკული აზროვნების და მთელი ცხოვრების მანძილზე სწავლის უნარების გაუმჯობესება."
      ],
      "careerOpportunities": [
        "მონაცემთა ანალიტიკოსი",
        "აქტუარი",
        "მეცნიერ-მკვლევარი"
      ],
      "courses": []
    },
    {
      "id": "cf1a9248-d776-435d-87c7-945a3ce0e7d5",
      "universityId": "01e14075-45ee-433f-b75c-279f3973d357",
      "name": "კომპიუტერული მეცნიერება",
      "description": "",
      "feePerYear": 2250,
      "programGoals": [
        "მათემატიკური საფუძვლების, ალგორითმების პრინციპების და კომპიუტერული მეცნიერების თეორიის გამოყენება კომპიუტერული სისტემების დიზაინში.",
        "კომპიუტერული მეცნიერების ფუნდამენტური თეორიების, კონცეფციების და აპლიკაციების ფართო გაგება ეთიკურ პრინციპებთან ერთად პროფესიულ კარიერაში.",
        "კომუნიკაციის, გუნდური მუშაობის და ლიდერობის უნარების ეფექტური გამოყენება რთული პროგრამული სისტემების განვითარებაში.",
        "უწყვეტი პროფესიული განვითარება."
      ],
      "careerOpportunities": [
        "პროგრამისტი",
        "სისტემების ანალიტიკოსი",
        "IT კონსულტანტი"
      ],
      "courses": []
    },
    {
      "id": "7e91cb7f-bc89-4297-8ebb-9b7979f0501a",
      "universityId": "01e14075-45ee-433f-b75c-279f3973d357",
      "name": "მენეჯმენტი",
      "description": "",
      "feePerYear": 2250,
      "programGoals": [
        "მენეჯმენტის სხვადასხვა ფუნქციურ სფეროში თეორიული ცოდნის და პრაქტიკული უნარ-ჩვევების გადაცემა.",
        "საწარმოო, მენეჯერული და ლიდერობის უნარ-ჩვევების განვითარება დინამიურ გლობალურ გარემოში ეფექტურად მუშაობისთვის.",
        "სტუდენტების ჩამოყალიბება, როგორც კონკურენტუნარიანი, მაღალკვალიფიციური, სოციალურად და ეთიკურად პასუხისმგებელი პიროვნებები."
      ],
      "careerOpportunities": [
        "ოპერაციების მენეჯერი",
        "მარკეტინგის სტრატეგი",
        "ფინანსური ანალიტიკოსი"
      ],
      "courses": []
    }
  ],
  "reviews": null
}

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8 container mx-auto relative z-10">
      <div className="max-w-4xl mx-auto h-[75vh] overflow-y-auto">
        {/* University Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <School className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{university.name}</h1>
                <div className="flex items-center mt-2 text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{university.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center text-gray-700">
              <Users className="h-5 w-5 mr-2" />
              <span>Phone: {university.phoneNumber}</span>
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
            {university.faculties.map((faculty) => (
              <div key={faculty.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{faculty.name}</h3>
                      <div className="flex items-center text-gray-600 mb-4">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span>Annual Fee: {faculty.feePerYear} GEL</span>
                      </div>
                    </div>
                  </div>

                  {/* Program Goals */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">პროგრამის მიზნები:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {faculty.programGoals.map((goal, index) => (
                        <li key={index}>{goal}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Career Opportunities */}
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section (if available) */}
        {university.reviews && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Reviews</h2>
            {/* Render reviews here */}
          </div>
        )}

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
    </div>
  );
};

export default UniversityDetails;