const RegInput = ({ label, error, id, ...props }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            
            {label && (
                <label htmlFor={id} className="text-gray-700 text-sm font-semibold">
                    {label}
                </label>
            )}
            
            
            <input
                id={id}
                className={`
                    w-full bg-white text-gray-900 border rounded-md px-3 py-2 outline-none transition-all
                    ${error 
                        ? 'border-red-500 focus:ring-2 focus:ring-red-200' // ЧЕРВОНИЙ, ЯКЩО Є ПОМИЛКА
                        : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                    }
                `}
                {...props} 
            />

            
            {error && (
                <span className="text-red-500 text-xs font-medium animate-pulse">
                    {error}
                </span>
            )}
        </div>
    );
};

export default RegInput;