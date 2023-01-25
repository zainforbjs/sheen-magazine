import React from 'react';
import {Falsy, RecursiveArray, RegisteredStyle, TouchableOpacity, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ButtonOnPress, ComponentStyle } from "types";
import {bgColor, circleStyle} from 'styles';
import {red, white} from 'styles/colors';
import {sizeButtonIconStandard} from 'styles/size';

type Props = ComponentStyle & ButtonOnPress &  
{
  iconName: string;
  size?: number;
  color?: string;
  iconColor?: string;
};

export default class ButtonIconCircleIonicons extends React.Component<Props> {
  render(): React.ReactNode {
    const {
      iconName,
      onPress = () => undefined,
      size = sizeButtonIconStandard,
      color = red,
      iconColor = white,
      style = [], 
    } = this.props;
    let touchableOpacityStyle : RecursiveArray<Falsy | ViewStyle | RegisteredStyle<ViewStyle>> = [bgColor(color), circleStyle(size)]; 
    touchableOpacityStyle = touchableOpacityStyle.concat(style); 
    return (
      <TouchableOpacity
        style={touchableOpacityStyle}
        onPress={onPress}>
        <Icon name={iconName} size={size} color={iconColor} />
      </TouchableOpacity>
    );
  }
}
