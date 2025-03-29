import { Link } from 'react-router-dom';
import { FacultyCard } from '../../components/FacultyCard/FacultyCard'

const Universities = () => {
  const universities = [
    { id: 1, name: 'Harvard University', location: 'Cambridge, MA' },
    { id: 2, name: 'Stanford University', location: 'Stanford, CA' },
    { id: 3, name: 'MIT', location: 'Cambridge, MA' },
  ];

  return (
    <div className='container mx-auto relative z-10'>
      <h1 className='text-white text-6xl font-bold mt-6 mb-10'>Universities</h1>
      <div className="text-white flex gap-3 flex-wrap universities-page container mx-auto relative z-10">
        <FacultyCard UniName="KIU" FacultyName = "CS"></FacultyCard>
        <FacultyCard UniName="KIU" FacultyName = "CS"></FacultyCard>
        <FacultyCard UniName="KIU" FacultyName = "CS"></FacultyCard>
        <FacultyCard UniName="KIU" FacultyName = "CS"></FacultyCard>
        <FacultyCard UniName="KIU" FacultyName = "CS"></FacultyCard>
      </div>
    </div>
  );
};

export default Universities;