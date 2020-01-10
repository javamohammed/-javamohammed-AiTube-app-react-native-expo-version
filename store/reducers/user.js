import { SIGNUP, LOGIN, LOGOUT, AUTHENTICATE } from "../actions/user";
const initialState = {
    token: '',
    userId: '',
    email:''
}
export const userReducer = (state =initialState, action ) =>{
        switch (action.type) {
            case SIGNUP:
                return {
                    token:action.token,
                    userId: action.userId,
                    email:action.email
                }
            case LOGIN:
                return {
                    token: action.token,
                    userId: action.userId,
                    email: action.email
                }
            case AUTHENTICATE:
                return {
                    token: action.token,
                    userId: action.userId,
                    email: action.email
                }
            case LOGOUT:
                //console.log("initialState",initialState)
                return initialState
            default:
                return state
        }
}