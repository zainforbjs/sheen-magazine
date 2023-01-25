import React from 'react';
import { NavigationPropsType } from 'types/navigation/MainApp';
import NavigationStacks from 'components/NavigationStacks';
import shopScene from 'navigation/MainApp/shop';

type Props = NavigationPropsType<'Shop'>;

export default class ShopSreen extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <NavigationStacks
        initialRouteName="Home"
        screenOptions={{ header: () => null }}
        navigationRoutes={shopScene}
      />
    );
  }
}
