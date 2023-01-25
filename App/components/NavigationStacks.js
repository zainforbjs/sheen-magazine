import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default class NavigationStacks extends React.Component {
  render() {
    const { screenOptions, initialRouteName, navigationRoutes } = this.props;
    const { Navigator, Screen } = createNativeStackNavigator();
    return (
      <Navigator
        screenOptions={screenOptions}
        initialRouteName={initialRouteName}
      >
        {navigationRoutes.map(({ name, Component }) => (
          <Screen key={name} name={name} component={Component} />
        ))}
      </Navigator>
    );
  }
}
