import { Link } from 'react-router-dom';

const Universities = () => {
  // Example university data - replace with your actual data
  const universities = [
    { id: 1, name: 'Harvard University', location: 'Cambridge, MA' },
    { id: 2, name: 'Stanford University', location: 'Stanford, CA' },
    { id: 3, name: 'MIT', location: 'Cambridge, MA' },
  ];

  return (
    <div className="universities-page">
      <h1>Universities</h1>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/faculties">Faculties</Link>
      </nav>
      
      <div className="universities-list">
        <h2>List of Universities</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {universities.map(university => (
              <tr key={university.id}>
                <td>{university.name}</td>
                <td>{university.location}</td>
                <td>
                  <Link to={`/universities/${university.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Universities;