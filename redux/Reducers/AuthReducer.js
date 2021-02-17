import React from 'react';
import {AUTH_ACTION} from '../Actions/ActionType'

const initialState={
    Token:"",
    Userdetails:[]
}

export const AuthReducer=(state=initialState, action)=>{
    console.log(">>>>>>>", console.log(action))
    switch (action.type) {
        case AUTH_ACTION.TOKEN_SAVE:
            console.log("Timer Data Reducer");
            return {
                ...state,
                Token:action.payload
           
            }
            case AUTH_ACTION.SAVE_USER_DETAILS:
                console.log("Timer Data Reducer");
                return {
                    ...state,
                    Userdetails:action.payload
               
                }
            
            case "persist/REHYDRATE":
                if(action.payload!=undefined){
            return {
                ...state,
                ...action.payload.AuthReducer

            }
        }
        else{
            return {
                ...state
            }
        }
        default:
            return{
                ...state
            }

}
}