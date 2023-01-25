import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { t } from 'react-native-tailwindcss';
import { NavigationPropsTypeApp } from 'types/navigation';
import { NavigationPropsType } from 'types/navigation/MainApp';
import Header from 'components/Header';
import NavigationStacks from 'components/NavigationStacks';
import ButtonIconFeather from 'components/ButtonIconFeather';
import blogScene from 'navigation/MainApp/blog';

type Props = CompositeScreenProps<
  NavigationPropsType<'Blog'>,
  NavigationPropsTypeApp<'MainApp'>
>;

export default class BlogSreen extends React.Component<Props> {
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
        navigationRoutes={blogScene}
      />
    );
  }
}
