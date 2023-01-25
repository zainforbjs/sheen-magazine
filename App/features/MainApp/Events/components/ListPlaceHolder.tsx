import React from 'react';
import {Text} from 'react-native';
import {bgColor} from 'styles';
import {t} from 'react-native-tailwindcss';
import {grey} from 'styles/colors';

type ListPlaceHolderProps = {
  placeholderText: string;
}

const ListPlaceHolder = ({placeholderText}: ListPlaceHolderProps) => (
  <Text style={[bgColor(grey), t.pX2, t.pY2]}>{placeholderText}</Text>
);

export default ListPlaceHolder;
