import React from 'react';
import { View, StyleSheet } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { ComponentStyle } from 'types';
import { heightPopup, minH } from 'styles/size';

const LayoutPopupOverlay: React.FC<ComponentStyle> = ({
  style = [],
  children,
  innerViewStyle
}: ComponentStyle) => {
  const childrenNode: React.ReactNode = innerViewStyle ? (
    <View style={[t.flex1, minH(heightPopup)].concat(innerViewStyle)}>
      {children}
    </View>
  ) : (
    children
  );

  return (
    <View
      style={[StyleSheet.absoluteFill, t.justifyCenter, t.contentCenter].concat(
        style
      )}
    >
      <View style={[t.flex, t.flexRow, t.contentCenter, t.justifyCenter]}>
        {childrenNode}
      </View>
    </View>
  );
};

export default LayoutPopupOverlay;
