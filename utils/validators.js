export const isValidEmail = (email) =>{


    if(typeof email !== 'string'){
        return false;
    }
    const atIndex = email.indexOf('@');
    if (atIndex == -1){
        return false; 
    }
    if (atIndex === 0 || atIndex === email.length-1){
        return false; 
    }
    
    const afterAt= email.substring(atIndex+1);
    const dotIndex = afterAt.indexOf('.');

    if (dotIndex == -1){
        return false; 
    }
    if (dotIndex === 0 || dotIndex === afterAt.length - 1){
        return false;}
    return true;
};

export const isValidPhoneNumber = (phoneNumber) => {

    const phoneRegex = /^(\+1)\s(\(\d{3}\))\s(\d{3})-(\d{4})$/;
    return phoneRegex.test(phoneNumber);
};


