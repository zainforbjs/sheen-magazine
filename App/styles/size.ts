import {ImageStyle, ViewStyle} from 'react-native';

export const xxSmall: number = 9;
export const xSmall: number = 10;
export const small: number = 13;
export const medium: number = 16;
export const large: number = 18;
export const xLarge: number = 24;
export const xxLarge: number = 32;
export const xxxLarge: number = 50;
export const heightPopup: number = 320; 
export const maxHorizontalScrollBarMember: number = 4;
export const sizeButtonIconStandard: number = 30; 
export const w = (size: number | string): ViewStyle & ImageStyle => ({width: size});
export const minW = (size: number): ViewStyle & ImageStyle => ({minWidth: size});
export const maxW = (size: number): ViewStyle & ImageStyle => ({maxWidth: size});

export const h = (size: number): ViewStyle & ImageStyle => ({height: size});
export const minH = (size: number) : ViewStyle & ImageStyle => ({minHeight: size});
export const maxH = (size: number) : ViewStyle & ImageStyle => ({maxHeight: size});