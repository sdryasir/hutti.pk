const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the product Name'],
        trim: true,
        maxLength: [100, 'Product name cannot exeed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter the price of the product'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter the product description']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select aa category'],
        enum: {
            values: [
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
            ],
            message: 'Please select the correct category'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter the seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter the product Stock'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Product', productSchema)