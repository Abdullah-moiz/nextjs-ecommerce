import mongoose from "mongoose";
import Category from "./Category";


const ProductSchema = new mongoose.Schema({
    productName : String,
    productDescription :String ,
    productImage : String ,
    productSlug : String,
    productPrice : Number,
    productQuantity : Number,
    productFeatured : Boolean,
    productCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

},{timestamps : true});

const Product = mongoose.models.Product  || mongoose.model('Product', ProductSchema);

export default Product;

