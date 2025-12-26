

const RegBtn = ({ text, ...props }) => {
    return (
        <button
            className="w-full flex justify-center items-center disabled:bg-gray-500 rounded-lg bg-pink-900 transition duration-150 ease-in-out transform active:translate-y-1 "
            {...props}>
            {text}
        </button>
    )
}

export default RegBtn;