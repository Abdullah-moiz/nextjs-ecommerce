import mongoose from 'mongoose';



const CategorySchema = new mongoose.Schema({
    categoryName : String,
    categoryDescription :String ,
    categoryImage : String ,
    categorySlug : String

},{timestamps : true});

const Category = mongoose.models.Categories || mongoose.model('Categories', CategorySchema);

export default Category;