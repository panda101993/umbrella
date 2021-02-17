let newpassword
export function handleValidations(text, type) {


    if (type === 'newpassword') {
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please  enter  new password.'
            }
        }
        else {
            newpassword = text
            return {
                value: text,
                status: true,
                errorText: ''
            }
        }

    }

    else  {
        // console.log("Password==>",password,"Confirm Password==>",text)
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please  enter password again to confirm.'
            }
        } else if (newpassword !== text) {
            return {
                value: text,
                status: false,
                errorText: '*Not matching with password.'
            }
        } else {
            return {
                value: text,
                status:true,
                errorText: ''
            }
        }
    }

}