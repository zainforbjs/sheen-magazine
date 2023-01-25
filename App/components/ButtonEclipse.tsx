import React from 'react';
import { TouchableOpacity, Text, TextStyle } from 'react-native';
import { ButtonOnPress, ComponentStyle } from 'types';
import { bgColor } from 'styles';
import { buttonEclipse, buttonEclipseText } from 'styles/buttons';
import { red, white } from 'styles/colors';
import { txtColor } from 'styles/text';
import { t } from 'react-native-tailwindcss';

type Props = ComponentStyle &
  ButtonOnPress & {
    text: string;
    color?: string;
    textColor?: string;
    textStyle?: TextStyle[];
    disabled?: boolean;
  };

export default class ButtonEclipse extends React.Component<Props> {
  render(): React.ReactNode {
    const {
      text,
      onPress,
      color = red,
      textColor = white,
      textStyle = [t.textXs, t.fontBold, t.pX1],
      style = [],
      disabled = false
    } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[bgColor(color), buttonEclipse, ...style]}
      >
        <Text
          style={[txtColor(textColor), buttonEclipseText].concat(textStyle)}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}
