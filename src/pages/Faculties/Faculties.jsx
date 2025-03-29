import { FacultyCard } from '../../components/FacultyCard/FacultyCard';

const Faculties = () => {
  // Example faculty data - replace with your actual data
  const faculties = [
    { id: '1', name: 'კომპიუტერული მეცნიერება', UniName: 'ქუთაისის საერთაშორისო უნივერსიტეტი' },
    { id: '2', name: 'ინჟინერია', UniName: 'ქუთაისის საერთაშორისო უნივერსიტეტი' },
    { id: '3', name: 'მედიცინა', UniName: 'ქუთაისის საერთაშორისო უნივერსიტეტი' },
  ];

  return (
    <div className='container px-6 mx-auto relative z-10'>
      <h1 className='text-white text-4xl md:text-6xl font-bold mt-6 mb-10'>ფაკულტეტები</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculties.map((f) => (
          <FacultyCard 
            key={f.id}
            FacultyName={f.name} 
            universityId={f.id} 
          />
        ))}
      </div>
    </div>
  );
};

export default Faculties;