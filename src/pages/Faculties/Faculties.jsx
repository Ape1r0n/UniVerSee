import { Link } from 'react-router-dom';

const Faculties = () => {
  // Example faculty data - replace with your actual data
  const faculties = [
    { id: 1, name: 'Computer Science', dean: 'Dr. Smith' },
    { id: 2, name: 'Engineering', dean: 'Dr. Johnson' },
    { id: 3, name: 'Medicine', dean: 'Dr. Williams' },
  ];

  return (
    <div className="faculties-page">
      <h1>Faculties</h1>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/universities">Universities</Link>
      </nav>
      
      <div className="faculties-list">
        <h2>List of Faculties</h2>
        <ul>
          {faculties.map(faculty => (
            <li key={faculty.id}>
              <h3>{faculty.name}</h3>
              <p>Dean: {faculty.dean}</p>
              <Link to={`/faculties/${faculty.id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Faculties;