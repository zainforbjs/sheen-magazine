import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AccountScreen from 'features/Account';

import Home from 'features/Home';

export default class NavigationDrawer extends React.Component {
  render() {
    const { navigationRoutes, initialRouteName, DrawerContent } = this.props;
    const { Navigator, Screen } = createDrawerNavigator();
    return (
      <Navigator
        initialRouteName={initialRouteName}
        drawerPosition="right"
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{
          drawerType: 'front',
          headerShown: false,
          swipeEnabled: false
        }}
      >
        {navigationRoutes.map(({ name, Component }) => (
          <Screen key={name} name={name} component={Component} />
        ))}
      </Navigator>
    );
  }
}
