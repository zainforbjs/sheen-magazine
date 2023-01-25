import React from 'react';
import {NavigationPropsType} from 'types/navigation/MainApp';
import NavigationStacks from 'components/NavigationStacks';
import tvScene from 'navigation/MainApp/tv';

type Props = NavigationPropsType<'Tv'>;

export default class TvSreen extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <NavigationStacks
        initialRouteName="Home"
        screenOptions={{header: () => null}}
        navigationRoutes={tvScene}
      />
    );
  }
}
