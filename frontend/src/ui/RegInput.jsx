const RegInput = ({ value, onChange, id, ...props }) => {
    return (
            <input
                id={id}
                className="regInput"
                value={value}
                onChange={onChange}
                {...props}
            />
            
    )
}

export default RegInput