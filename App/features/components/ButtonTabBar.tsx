import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Component, ReactNode } from 'react';
import { t } from 'react-native-tailwindcss';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { xLarge } from 'styles/size';
import { red } from 'styles/colors';

export default class ButtonTabBar extends Component<
  BottomTabBarButtonProps & {
    title: string;
    iconName?: string;
  }
> {
  render(): ReactNode {
    let style: ViewStyle[] = [this.props.style, t.flex, t.flexCol];
    let color: string | undefined = undefined;
    if (this.props.accessibilityState?.selected) {
      style.push(t.borderT4, t.borderRed700);
      color = red;
    }

    return (
      <TouchableOpacity {...this.props} style={style}>
        <Icon
          name={this.props.iconName || 'help'}
          size={xLarge}
          color={color}
        />
        <Text style={{ color }}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}
