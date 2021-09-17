export const productReducers = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'ALL_PRODUCTS_REQUEST':
            return {
                loading: true,
                products: []
            }
        case 'ALL_PRODUCTS_SUCCESS':
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount,
                resPerPage: action.payload.resPerPage
            }
        default:
            return state
    }
}

export const productDetailReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case 'PRODUCT_DETAIL_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'PRODUCT_DETAIL_SUCCESS':
            return {
                loading: false,
                product: action.payload
            }
        default:
            return state
    }
}