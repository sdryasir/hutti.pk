import React, { useState, useEffect } from 'react'
import MetaData from './layout/MetaData'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../actions/productsAction'
import Product from './product/Product'
import Loader from './layout/Loader'

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range);

function Home({ match }) {

    const [currentPage, setCurrentPage] = useState(1)

    const dispatch = useDispatch()
    const [price, setPrice] = useState([1, 1000])
    const [category, setCategory] = useState('')
    const categories = [
        'Electronics',
        'Health & Beauty',
        'Fasion',
        'Babies & Toys',
        'Stationary',
        'Groceries',
        'Sports 7 Outdoor',
        'Headphones',
        'Accessories',
        'Cameras',
        'Laptops',
        'Food'
    ]

    const { loading, products, resPerPage, productCount } = useSelector(state => state.products)


    const keyword = match.params.keyword
    useEffect(() => {
        dispatch(getAllProducts(keyword, currentPage, price, category))
    }, [dispatch, keyword, currentPage, price, category])

    const setCurrentPageNo = function (pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (
        <>
            {loading ? <Loader /> : <>
                <MetaData title={`Buy Everything You Want`} />
                <h1 id="products_heading">Latest Products</h1>
                <section id="products" className=" mt-5">
                    <div className="row">
                        {keyword ? (
                            <>
                                <div className="col-6 col-md-3 mt-3 mb-3">
                                    <div className="px-5">
                                        <Range
                                            marks={{
                                                1: `PKR 1`,
                                                1000: `PKR 1000`
                                            }}
                                            min={1}
                                            max={1000}
                                            defaultValue={[1, 1000]}
                                            tipFormatter={value => `PKR${value}`}
                                            tipProps={{
                                                placement: "top",
                                                visible: true
                                            }}
                                            value={price}
                                            onChange={price => setPrice(price)}
                                        />

                                        <hr className="my-5" />

                                        <h4>Categories</h4>
                                        <ul className="pl-0">
                                            {
                                                categories.map((category => <li key={category} style={{ listStyleType: 'none', cursor: 'pointer' }} onClick={() => setCategory(category)}>{category}</li>))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-6 col-md-9 mt-3 mb-3">
                                    <div className="row">
                                        {products.map((product) => (<Product col={4} key={product._id} product={product} />))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            products.map((product) => (<Product col={3} key={product._id} product={product} />))
                        )}
                    </div>
                </section>

                {resPerPage <= productCount && (
                    <div className="d-flex justify-content-center mt-5">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resPerPage}
                            totalItemsCount={productCount}
                            onChange={setCurrentPageNo}
                            nextPageText={'Next'}
                            prevPageText={'Prev'}
                            firstPageText={'First'}
                            lastPageText={'Last'}
                            itemClass={'page-item'}
                            linkClass={'page-link'}
                        />
                    </div>
                )}
            </>}

        </>
    )
}

export default Home
