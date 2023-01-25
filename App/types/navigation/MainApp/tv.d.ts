import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ButtonOnPress, DetailsId, WatchVideoProps } from 'types';

export type NavigationTv = {
  Home: undefined;
  SubscriptionTv: undefined;
  WatchVideo: any;
  LivestreamAdmin: undefined;
  LivestreamUser: {};
};
export type NavigationPropsTypeTv<RouteName extends keyof NavigationTv> =
  NativeStackScreenProps<NavigationTv, RouteName>;
