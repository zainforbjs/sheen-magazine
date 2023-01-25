import React from 'react';
import { View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { ComponentStyle } from 'types';

export default class LayoutMiddleAlignScreen extends React.Component<ComponentStyle> {
  render(): React.ReactNode {
    const { style = [], innerStyle = [], children } = this.props;
    return (
      <View style={[t.flex, t.flexRow, t.justifyCenter, ...style]}>
        <View style={[t.w11_12].concat(innerStyle)}>{children}</View>
      </View>
    );
  }
}
