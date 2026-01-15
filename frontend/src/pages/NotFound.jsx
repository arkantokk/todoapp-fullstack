import { useNavigate } from "react-router-dom";


const NotFound = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/login')
    }

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <div className="text-9xl text-red-600">
                404
            </div>
            <div className="text-9xl">
                PAGE NOT FOUND
            </div>
            <div className="py-6 text-5xl">
                You probably wrote wrong url
            </div>
            <button className="my-5 py-4 px-4 rounded-md bg-zinc-500 text-6xl" onClick={handleClick}>GO BACK TO MAIN PAGE</button>
        </div>
    )
}

export default NotFound;