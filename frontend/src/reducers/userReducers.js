export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
        case 'REGISTER_USER_REQUEST':
            return {
                login: true,
                isAuthenticated: false
            }
        case 'LOGIN_SUCCESS':
        case 'REGISTER_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case 'LOGIN_FAIL':
        case 'REGISTER_USER_FAIL':
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        default:
            return state
    }
}