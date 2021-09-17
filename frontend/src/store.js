import { productReducers, productDetailReducer } from './reducers/productReducers'
import { authReducer } from './reducers/userReducers'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    products: productReducers,
    productDetails: productDetailReducer,
    auth: authReducer
})

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(reducer, composedEnhancer)
export default store