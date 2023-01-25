import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { bgColor, circleStyle } from 'styles';
import { red, white } from 'styles/colors';
import { large, medium, small, xLarge, xxxLarge } from 'styles/size';
import { txtColor, txtSize } from 'styles/text';

export default class ButtonRound extends React.Component {
  render() {
    const {
      text = '',
      onPress,
      size = xLarge,
      color = red,
      textSize = small,
      textColor = white,
      style = []
    } = this.props;

    let Component = onPress ? TouchableOpacity : View;
    return (
      <Component
        style={[
          bgColor(color),
          t.justifyCenter,
          t.contentCenter,
          // circleStyle(size),
          { borderRadius: 10, paddingHorizontal: 5 },

          ...style
        ]}
        onPress={onPress}
      >
        <Text style={[txtColor(textColor), txtSize(textSize), t.p1]}>
          {text}
        </Text>
      </Component>
    );
  }
}
