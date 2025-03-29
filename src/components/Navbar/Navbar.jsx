import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";

function Navbar() {
  return (
    <div className="container mx-auto py-6 px-6">
      <Link to="/" className="inline-block">
        <img 
          src={logo} 
          style={{
            width: '70px',
            height: '70px',
            position: 'relative',
            zIndex: 1000000
          }} 
          alt="logo" 
          className="hover:opacity-80 transition-opacity duration-200"
        />
      </Link>
    </div>
  );
}

export default Navbar;