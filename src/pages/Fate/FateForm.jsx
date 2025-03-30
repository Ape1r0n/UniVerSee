import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/Button/Button';

const FateForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      faculty: "Computer Science", // Default faculty or you can make this dynamic
      gender: '',
      hobbies: [],
      which_trovert: '',
      wl_balance: '',
      dedication: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        hobbies: checked 
          ? [...prev.hobbies, value]
          : prev.hobbies.filter(hobby => hobby !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  console.log("entered fate form")

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    setError(null);

    console.log(formData)
    
    try {
      const response = await fetch('https://universee-ml-predictor-789121096200.europe-north2.run.app/predict', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(response)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      navigate('/fate-result', { state: { result } });
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('დაფიქსირდა შეცდომა. გთხოვთ სცადოთ ხელახლა.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.gender &&
      formData.hobbies.length > 0 &&
      formData.which_trovert &&
      formData.wl_balance &&
      formData.dedication
    );
  };

  return (
    <div className="container mx-auto px-4 mt-2 max-w-3xl relative z-10">
    <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 cursor-pointer mb-2 hover:underline"
    >
        <ArrowLeft className="h-5 w-5 mr-2" />
        უკან დაბრუნება
    </button>

    <h1 className="text-2xl text-white font-bold mb-4 text-center">ბედს მივენდობი?!</h1>
    
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <form 
        onSubmit={handleSubmit} 
        className="space-y-8 p-6 h-[75vh] overflow-y-auto"
        >
        {/* Gender Section */}
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">სქესი: *</h2>
            <div className="space-y-2">
            {['მამრობითი', 'მდედრობითი', 'სხვა'].map(gender => (
                <label key={gender} className="flex items-center space-x-3">
                <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600"
                    required
                />
                <span>{gender}</span>
                </label>
            ))}
            </div>
        </div>

        {/* Hobbies Section */}
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">
            გთხოვთ, ჩამოთვლილთაგან აირჩიოთ თქვენი ერთი ან მეტი ჰობი: *
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
                'სპორტი',
                'ვიდეო თამაშები',
                'ფილმები / სერიალები',
                'ანიმეები / მანგები და კომიქსები',
                'ლაშქრობა / ბუნებაში გასვლა',
                'მეცნიერება და ტექნოლოგიები',
                'ვარჯიში',
                'მეგობრებთან ერთად გართობა',
                'შოპინგი'
            ].map(hobby => (
                <label key={hobby} className="flex items-center space-x-3">
                <input
                    type="checkbox"
                    name="hobbies"
                    value={hobby}
                    checked={formData.hobbies.includes(hobby)}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600"
                    required={formData.hobbies.length === 0}
                />
                <span>{hobby}</span>
                </label>
            ))}
            </div>
        </div>

        {/* Social Personality Section */}
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">
            რამდენად სოციალურ ადამიანად მიიჩნევთ თავს? *
            </h2>
            <div className="space-y-2">
            {['ექსტროვერტი', 'ინტროვერტი', 'სადღაც შუაში'].map(type => (
                <label key={type} className="flex items-center space-x-3">
                <input
                    type="radio"
                    name="which_trovert"
                    value={type}
                    checked={formData.which_trovert === type}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600"
                    required
                />
                <span>{type}</span>
                </label>
            ))}
            </div>
        </div>

        {/* Work-Life Balance Section */}
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">
            როგორი work-life ბალანსი გსურთ? *
            </h2>
            <div className="space-y-2">
            {[
                'სწავლა 20%, თავისუფალი დრო 80%',
                'სწავლა 40%, თავისუფალი დრო 60%',
                'სწავლა 60%, თავისუფალი დრო 40%',
                'სწავლა 80%, თავისუფალი დრო 20%'
            ].map(balance => (
                <label key={balance} className="flex items-center space-x-3">
                <input
                    type="radio"
                    name="wl_balance"
                    value={balance}
                    checked={formData.wl_balance === balance}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600"
                    required
                />
                <span>{balance}</span>
                </label>
            ))}
            </div>
        </div>

        {/* Dedication Section */}
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">
            აპირებთ თუ არა, რომ უნივერსიტეტს მიღმა (მაგალითად, თითქმის ყველა არდადეგებზე) სწავლას მნიშვნელოვანი დრო გამოუყოთ? მაგალითად გაიაროთ კურსები, ონლაინ ჩანაწერებს უყუროთ, გააკეთოთ დამატებითი პროექტები... *
            </h2>
            <div className="space-y-2">
            {['დიახ', 'არა'].map(option => (
                <label key={option} className="flex items-center space-x-3">
                <input
                    type="radio"
                    name="dedication"
                    value={option}
                    checked={formData.dedication === option}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600"
                    required
                />
                <span>{option}</span>
                </label>
            ))}
            </div>
        </div>

        <div className="pt-4 sticky bottom-0 bg-white pb-4">
            <Button
            type="submit"
            className="w-full py-3 text-lg cursor-pointer"
            disabled={!isFormValid()}
            >
            შედეგის ნახვა
            </Button>
        </div>
        </form>
    </div>
    </div>
  );
};

export default FateForm;