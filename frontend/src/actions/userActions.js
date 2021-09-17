import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'LOGIN_REQUEST' })

        const config = {
            'Content-Type': 'application/json'
        }

        const { data } = await axios.post('http://localhost:5000/api/v1/login', { email, password }, config)

        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: 'LOGIN_FAIL',
            payload: error.response.data.message
        })
    }
}


export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: 'REGISTER_USER_REQUEST' })

        const config = {
            'Content-Type': 'multipart/form-data'
        }

        const { data } = await axios.post('http://localhost:5000/api/v1/register', userData, config)

        dispatch({
            type: 'REGISTER_USER_SUCCESS',
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: 'REGISTER_USER_FAIL',
            payload: error.response.data.message
        })
    }
}