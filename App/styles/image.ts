import {ImageStyle, ViewStyle} from 'react-native';

export const aspectRatio = (number?: number): ViewStyle & ImageStyle => ({
  aspectRatio: number ?? 1,
});
export const imagePoster: ImageStyle = {
  width: '95%',
  height: 'auto',
};
export const modifierAspectRatio: number = 1.5;
export const modifierImageViewer: number = 0.55; 
export const modifierImageScrollView: number = 2 / 3;
export const modifierImageScrollViewAspectRatio = 2;
