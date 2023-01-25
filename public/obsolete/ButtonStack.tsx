import React from 'react';
import {
  GestureResponderEvent,
  View,
  TouchableOpacity,
  Text,
  ViewStyle,
  Switch,
} from 'react-native';
import {t} from 'react-native-tailwindcss';
import {bgColor, buttonStack} from 'styles';
import {black, lightGreyText, transparent} from 'styles/colors';
import {txtColor} from 'styles/text';
import Icon from 'react-native-vector-icons/Feather';
type Props = {
  text: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  color?: string;
  textColor?: string;
  style?: ViewStyle[];
  buttonRightText?: string;
  isSwitch?: boolean;
  value?: boolean;
};

export default class ButtonStack extends React.Component<Props> {
  state = {isActive: this.props.value};
  render(): React.ReactNode {
    const {
      text,
      onPress,
      textColor = black,
      color = transparent,
      style = [],
      buttonRightText,
      isSwitch,
    } = this.props;
    return !isSwitch ? (
      <TouchableOpacity
        onPress={onPress}
        style={[bgColor(color), buttonStack, ...style]}>
        <View style={[t.flex, t.flexRow, t.justifyBetween, t.alignCenter]}>
          <Text style={[txtColor(textColor), t.selfCenter]}>{text}</Text>
          <View style={[t.flex, t.flexRow, t.alignCenter]}>
            {buttonRightText && (
              <Text style={[t.mR1, txtColor(lightGreyText)]}>
                {buttonRightText}
              </Text>
            )}
            <Icon name={'chevron-right'} color={lightGreyText} size={17} />
          </View>
        </View>
      </TouchableOpacity>
    ) : (
      <View style={[bgColor(color), buttonStack, ...style]}>
        <View style={[t.flex, t.flexRow, t.justifyBetween, t.alignCenter]}>
          <Text style={[txtColor(textColor), t.selfCenter]}>{text}</Text>
          <Switch
            value={this.state.isActive}
            onValueChange={() =>
              this.setState({isActive: !this.state.isActive})
            }
          />
        </View>
      </View>
    );
  }
}
