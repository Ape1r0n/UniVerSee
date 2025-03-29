import { FacultyCard } from '../../components/FacultyCard/FacultyCard'

const Universities = () => {
  return (
    <div className='container px-6 mx-auto relative z-10'>
      <h1 className='text-white text-6xl font-bold mt-6 mb-10'>უნივერსიტეტები</h1>
      <div className="text-white flex gap-3 flex-wrap universities-page container mx-auto relative z-10">
        <FacultyCard UniName="Kutaisi International University" universityId="01e14075-45ee-433f-b75c-279f3973d357"></FacultyCard>
        <FacultyCard UniName="Free University" universityId="2"></FacultyCard>
      </div>
    </div>
  );
};

export default Universities;