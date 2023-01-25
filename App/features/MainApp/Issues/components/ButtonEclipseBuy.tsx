import React from 'react';
import { TouchableOpacity, Text, TextStyle, View } from 'react-native';
import { ButtonOnPress, ComponentStyle } from 'types';
import { bgColor } from 'styles';
import { buttonEclipseBuy, buttonEclipseBuyText } from 'styles/buttons';
import { red, white } from 'styles/colors';
import { txtColor } from 'styles/text';
import { t } from 'react-native-tailwindcss';

type Props = ComponentStyle &
  ButtonOnPress & {
    textLeft: string;
    textRight: string;
    color?: string;
    textColor?: string;
    textStyle?: TextStyle[];
  };

export default class ButtonEclipseBuy extends React.Component<Props> {
  render(): React.ReactNode {
    const {
      textLeft,
      textRight,
      onPress,
      color = red,
      textColor = white,
      textStyle = [t.textBase, t.fontBold, t.pX1],
      style = []
    } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[bgColor(color), buttonEclipseBuy, ...style]}
      >
        <View style={[t.flex, t.flex1, t.flexRow]}>
          <View style={[t.flex1]}>
            <Text
              style={[txtColor(textColor), buttonEclipseBuyText].concat(
                textStyle
              )}
            >
              {textLeft}
            </Text>
          </View>

          <View style={[t.flex1]}>
            <Text
              style={[txtColor(textColor), buttonEclipseBuyText].concat(
                textStyle
              )}
            >
              {textRight}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
