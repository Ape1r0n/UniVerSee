import { Link } from 'react-router-dom'; 

export const CardLink = ({ to, icon: Icon, title, description }) => (
    <Link
      to={to}
      className="block w-sm border-2 rounded-sm p-4 border-gray-200 flex items-center flex-col hover:shadow-lg transition-shadow cursor-pointer hover:border-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
    >
      <Icon className="h-8 w-8 text-primary mx-auto" />
      <h1 className="mt-3 text-xl font-bold">{title}</h1>
      <p className="text-gray-500 text-center mt-3">
        {description}
      </p>
    </Link>
  );