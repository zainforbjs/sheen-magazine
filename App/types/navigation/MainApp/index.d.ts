import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NavigationIssues } from 'types/navigation/MainApp/issues';
export type NavigationMainApp = 
{
  Issues: NavigatorScreenParams<NavigationIssues>;
  Events: undefined;
  Shop: undefined;
  Blog: undefined;
  Tv: undefined;
  User: undefined;
};

export type NavigationPropsType<RouteName extends keyof NavigationMainApp> = BottomTabScreenProps<NavigationMainApp, RouteName>;
