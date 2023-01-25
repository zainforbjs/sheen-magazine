import {NavigationScreenConfig} from 'types/navigation';
import {NavigationShop} from 'types/navigation/MainApp/shop';
import Home from 'features/MainApp/Shop/Home';
import ProductDetail from 'features/MainApp/Shop/ProductDetail';
import Cart from 'features/MainApp/Shop/Cart';

const scenes: NavigationScreenConfig<NavigationShop>[] = [
  {
    name: 'Home',
    Component: Home,
  },
  {
    name: 'ProductDetail',
    Component: ProductDetail,
  },
  {
    name: "Cart", 
    Component: Cart
  }
];

export default scenes;
