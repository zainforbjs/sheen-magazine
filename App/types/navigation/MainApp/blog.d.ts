import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ButtonOnPress, DetailsId} from 'types';

export type NavigationBlog = {
  Home: undefined;
  Post: DetailsId;
};
export type NavigationPropsTypeBlog<RouteName extends keyof NavigationBlog> = NativeStackScreenProps<NavigationBlog, RouteName>;
