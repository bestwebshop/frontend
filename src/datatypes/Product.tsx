import Category from './Category'

interface Product {
    id: number;
    name: String;
    price: number;
    details: String;
    category: Category;
}

export default Product;