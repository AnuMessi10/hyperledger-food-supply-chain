import {createContext} from 'react';
import {Food} from '../Models/Food';

const ProductContext = createContext<{
  product: Food;
  setProduct: React.Dispatch<React.SetStateAction<Food>>;
}>({
  product: {
    name: '',
    price: 0,
    location: {
      prev: {
        lat: 0,
        lng: 0,
      },
      current: {
        lat: 0,
        lng: 0,
      },
    },
    quantity: '',
    id: '',
    actor: 'PRODUCER',
  },
  setProduct: () => {},
});

export default ProductContext;
