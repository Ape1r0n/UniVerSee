import './Input.css'

export const Input = ({ 
    className = '', 
    type = 'text', 
    ...props 
  }) => {
    const baseClasses = [
      'flex text-white h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
      'placeholder:text-white focus-visible:outline-none focus-visible:ring-1',
      'focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      className
    ].join(' ');
  
    return (
      <input
        type={type}
        className={baseClasses}
        {...props}
      />
    );
  };
  