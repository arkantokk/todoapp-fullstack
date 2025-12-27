const RemoveBtn = ({ text, ...props }) => {
    return (
        <button
            className="px-2 flex justify-end  disabled:bg-gray-500 rounded-lg bg-gray-900 transition duration-150 ease-in-out transform active:translate-y-1 text-red-600 font-bold"
            {...props}>
            {text}
        </button>
    )
}

export default RemoveBtn;