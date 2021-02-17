import {LOADING_ACTIONS,AUTH_ACTION} from './ActionType';

export const SaveTokenAction=item=>dispatch=>{
   
    console.log("Auth_Action_Middleware==>>token",item);
    dispatch({type:AUTH_ACTION.TOKEN_SAVE, payload:item});

}
export const SaveuserDetails=item=>dispatch=>{
   
    console.log("Auth_Action_Middleware==>>",item);
    dispatch({type:AUTH_ACTION.SAVE_USER_DETAILS, payload:item});

}