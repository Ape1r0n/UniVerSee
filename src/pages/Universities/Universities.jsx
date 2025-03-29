import { Link } from 'react-router-dom';
import { FacultyCard } from '../../components/FacultyCard/FacultyCard'

const Universities = () => {
  const universities = [
    { id: 1, name: 'Harvard University', location: 'Cambridge, MA' },
    { id: 2, name: 'Stanford University', location: 'Stanford, CA' },
    { id: 3, name: 'MIT', location: 'Cambridge, MA' },
  ];

  return (
    <div className="text-white flex gap-3 justify-around flex-wrap universities-page container mx-auto px-4 relative z-10">
      <FacultyCard UniName="KIU" FacultyName = "CS"></FacultyCard>
      <FacultyCard UniName="KIU" FacultyName = "CS"></FacultyCard>
      <FacultyCard UniName="KIU" FacultyName = "CS"></FacultyCard>
      <FacultyCard UniName="KIU" FacultyName = "CS"></FacultyCard>
      <FacultyCard UniName="KIU" FacultyName = "CS"></FacultyCard>
    </div>
  );
};

export default Universities;