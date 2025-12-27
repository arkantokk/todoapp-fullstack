const TodoInput = ({ value, placeholder, id, ...props }) => {
    return (
        <input 
            value={value}
            placeholder={placeholder}
            id={id}
            className="
                w-full px-4 py-2 
                bg-gray-800 border border-gray-700 
                text-white placeholder-gray-500
                rounded-lg outline-none
                transition-all duration-200
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-gray-700
            "
            {...props}
        />
    )
}

export default TodoInput;