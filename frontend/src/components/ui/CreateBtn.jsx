const CreateBtn = ({ text, ...props }) => {
    return (
        <button
            className="
                px-6 my-2 py-4
                bg-indigo-600 text-white font-semibold 
                rounded-lg shadow-md 
                hover:bg-indigo-500 hover:shadow-indigo-500/20
                active:scale-95 active:translate-y-0
                disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed
                transition-all duration-200 ease-in-out
                
            "
            {...props}
        >
            {text}
        </button>
    )
}

export default CreateBtn;