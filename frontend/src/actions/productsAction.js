import axios from 'axios'
export const getAllProducts = (keyword = '', currentPage = 1, price, category) => async (dispatch) => {
    try {
        dispatch({ type: 'ALL_PRODUCTS_REQUEST' })

        let link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`

        if (category) {
            link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`
        }
        await fetch(link)
            .then(response => response.json())
            .then(products => {
                dispatch({
                    type: 'ALL_PRODUCTS_SUCCESS',
                    payload: products
                })
            })
    } catch (error) {
        console.log(error)
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'PRODUCT_DETAIL_REQUEST' })

        const { data } = await axios.get(`http://localhost:5000/api/v1/product/${id}`)
        dispatch({
            type: 'PRODUCT_DETAIL_SUCCESS',
            payload: data.product
        })
    } catch (error) {
        console.log(error)
    }
}