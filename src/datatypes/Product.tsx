import Category from './Category';

interface Product {
  id: number;
  name: string;
  price: number;
  details: string;
  category: Category;
}

export default Product;