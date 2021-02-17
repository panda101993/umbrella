export function handleOTPValidations(text, type,index,prevInputRef,nextInputRef) {
    console.log("type of ",text, type,index,prevInputRef,nextInputRef)
    if (text === '') {
        prevInputRef.focus();
        return {
            status: false,
            value: text,
            errorText: 'Please enter OTP.'
        }
    } else {
        if (nextInputRef){
            nextInputRef.focus()
            return {
                value: text,
                status: true,
                errorText: ''
            }
        } else {
            return {
                value: text,
                status: true,
                errorText: ''
            }
        }
       
    }

}
