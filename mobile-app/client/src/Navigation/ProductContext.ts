import {createContext} from 'react';
import {Product} from '../Models/Product';

const ProductContext = createContext<{
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}>({
  product: {
    name: '',
    price: 0,
    location: {
      lat: 0,
      lng: 0,
    },
    quantity: '',
    id: '',
    actor: 'PRODUCER',
  },
  setProduct: () => {},
});

export default ProductContext;
