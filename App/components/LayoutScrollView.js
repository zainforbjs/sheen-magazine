import React from 'react';
import { Text, View, ScrollView, Platform } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { bgColor } from 'styles';
import { dust } from 'styles/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class LayoutScrollView extends React.Component {
  render() {
    const {
      screenTitle,
      layoutStyle = [],
      layoutBackgroundColor = dust
    } = this.props;
    return (
      <KeyboardAwareScrollView style={[bgColor(layoutBackgroundColor)]}
      extraHeight={150}
      >
        <View style={[t.mB2, Platform.OS === 'ios' && t.mT2]}>
          <View style={[t.p5, ...layoutStyle]}>
            {screenTitle && (
              <Text style={[t.fontBold, t.text2xl]}>{screenTitle}</Text>
            )}
            {this.props.children}
          </View>
        </View>
        <View style={[t.flex1, t.h6]} />
      </KeyboardAwareScrollView>
    );
  }
}
