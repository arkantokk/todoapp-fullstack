import '../styles/RegBtn.css'

const RegBtn = ({ text, ...props }) => {
    return (
        <button
            className="reg-btn"
            {...props}>
            {text}
        </button>
    )
}

export default RegBtn;