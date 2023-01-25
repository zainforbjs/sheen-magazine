import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type NavigationShop = 
{
  Home: undefined;
  ProductDetail: DetailsProduct;
  Cart: undefined; 
};
export type NavigationPropsTypeShop<RouteName extends keyof NavigationShop> = NativeStackScreenProps<NavigationShop, RouteName>;
export type DetailsProduct = 
{
  title: string;
  imageUri: string;
  type: string;
  price: number;
  productId:number
};
