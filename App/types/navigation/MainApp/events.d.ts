import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { DetailsId } from "types";

export type NavigationEvents = 
{
  Home: undefined;
  DetailEvent: DetailsId;
  GalleryEventList: undefined; 
  GalleryView: DetailsId;
};
export type NavigationPropsTypeEvents<RouteName extends keyof NavigationEvents> = NativeStackScreenProps<NavigationEvents, RouteName>;
