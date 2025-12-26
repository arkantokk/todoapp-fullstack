export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!email) return "Email can't be empty";
    if (!re.test(String(email).toLowerCase())) return "Not correct email";
    
    return ""; 
};


export const validatePassword = (password) => {
    if (!password) return "Password can't be empty";
    if (password.length < 5) return "Password has to be more than 5 symbols";
    
    return "";
};

export const validateUsername = (username) => {
    if (!password) return "Username can't be empty";
    if (password.length < 4 || password.length > 9) return "Username has to be more than 3 symbols and less than 9";
    
    return "";
};