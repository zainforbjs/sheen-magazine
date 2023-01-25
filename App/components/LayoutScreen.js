import React from 'react';
import { Text, View, FlatList, Alert } from 'react-native';
import { t } from 'react-native-tailwindcss';
import ScrollBar from 'components/ScrollBar';
import { bgColor } from 'styles';
import { dust } from 'styles/colors';
import ButtonEclipse from 'components/ButtonEclipse';
import { h, w } from 'styles/size';

export default class LayoutScreen extends React.Component {
  render() {
    const {
      categoryButtons,
      onPressButton,
      currentValue,
      screenTitle,
      screenActionTitle,
      onPressActionButton,
      scrollable = true,
      style = [],
      onRefresh = () => null,
      refreshing = false
    } = this.props;
    const screenButtonsWithOnPress = categoryButtons.map(
      ({ label, comparisonValue }) => ({
        label,
        comparisonValue,
        onPress: () => onPressButton(comparisonValue)
      })
    );

    return (
      <FlatList
        data={[]}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListHeaderComponent={() => (
          <>
            <View style={[t.mB2, t.mT2]}>
              {screenTitle && (
                <View
                  style={[t.flex, t.flexRow, t.justifyBetween, t.mB2, t.pX4]}
                >
                  <Text style={[t.fontBlack, t.text2xl, t.fontSemibold]}>
                    {screenTitle}
                  </Text>
                  {screenActionTitle && (
                    <ButtonEclipse
                      text={screenActionTitle}
                      textStyle={[t.textSm]}
                      style={[h(35), { flex: 0.6 }]}
                      onPress={onPressActionButton}
                    />
                  )}
                </View>
              )}
              <View style={[t.flex, t.flexRow, t.justifyCenter]}>
                <View style={[t.mT2]}>
                  <ScrollBar
                    screenButtons={screenButtonsWithOnPress}
                    currentValue={currentValue}
                  />
                </View>
              </View>
            </View>
            {this.props.children}
            <View style={[t.flex1, t.h6]} />
          </>
        )}
      />
    );
  }
}
