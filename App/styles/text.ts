import { TextStyle } from 'react-native';
import { greyTransparent, transparent, white } from 'styles/colors';
import { medium } from 'styles/size';

export type fontWeightType =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
export const txtColor = (color: string): TextStyle => ({ color: color });
export const txtSize = (size: number): TextStyle => ({ fontSize: size });
export const txtWeight = (weight: fontWeightType): TextStyle => ({
  fontWeight: weight
});

export const txtInputRoundCorner: TextStyle = {
  backgroundColor: greyTransparent,
  borderColor: transparent,
  height: 54,
  // padding: 20,
  paddingHorizontal: 20,
  fontSize: 14,
  borderRadius: 25
};

export const dropDownTextStyle: TextStyle = {
  fontSize: 14
};

export const txtSelectRoundCorner: TextStyle = {
  backgroundColor: greyTransparent,
  borderColor: transparent,
  height: 54,
  padding: 20,
  borderRadius: 25
};
export const dropdownStyle: TextStyle = {
  backgroundColor: greyTransparent,
  borderColor: 'transparent',
  padding: 10,
  borderRadius: 10
};
export const txtInputSharp: TextStyle = {
  backgroundColor: white,
  borderColor: white,
  padding: medium
};

export const txtLabelStyle: TextStyle = {
  marginLeft: 18,
  fontSize: 16,
  color: '#000',
  marginTop: 20,
  fontWeight: '500'
};

export const txtLabelStyles: TextStyle = {
  marginLeft: 18,
  fontSize: 16,
  color: '#000',
  marginTop: 20,
  marginBottom: 10,
  fontWeight: '500'
};
