import React from 'react';
import NavigationStacks from 'components/NavigationStacks';
import settingsScene from 'navigation/Account/settings';
import {NavigationPropsTypeSettings} from 'types/navigation/Account/settings';

type Props = NavigationPropsTypeSettings<'Home'>;

export default class SettingsScreen extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <NavigationStacks
        initialRouteName="Home"
        screenOptions={{header: () => null}}
        navigationRoutes={settingsScene}
      />
    );
  }
}
