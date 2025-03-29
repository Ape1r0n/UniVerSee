import { Link } from 'react-router-dom'; 

export const CardLink = ({ to, icon: Icon, title, description }) => (
    <Link
      to={to}
      className="block w-sm border-2 rounded-sm p-4 border-gray-200 flex items-center flex-col hover:shadow-xl transition cursor-pointer hover:border-primary hover:backdrop-blur-3xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
    >
      <Icon className="h-8 w-8 text-primary mx-auto text-white" />
      <h1 className="text-white mt-3 text-xl font-bold">{title}</h1>
      <p className="text-gray-500 text-center mt-3">
        {description}
      </p>
    </Link>
  );