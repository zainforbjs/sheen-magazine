import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { t } from 'react-native-tailwindcss';
import { NavigationPropsTypeApp } from 'types/navigation';
import { NavigationPropsType } from 'types/navigation/MainApp';
import eventsScene from 'navigation/MainApp/events';
import NavigationStacks from 'components/NavigationStacks';
import Header from 'components/Header';
import ButtonIconFeather from 'components/ButtonIconFeather';

type Props = CompositeScreenProps<
  NavigationPropsType<'Events'>,
  NavigationPropsTypeApp<'MainApp'>
>;

export default class EventsSreen extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <NavigationStacks
        initialRouteName="Home"
        screenOptions={{
          header: () => (
            <Header
              headerRight={
                <ButtonIconFeather
                  name="menu"
                  style={[t.pR5, t.selfEnd]}
                  onPress={() => this.props.navigation.toggleDrawer()}
                />
              }
            />
          )
        }}
        navigationRoutes={eventsScene}
      />
    );
  }
}
