import React from 'react';
import { useWindowDimensions, ScrollView, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import ButtonEclipse from 'components/ButtonEclipse';
import { minW, maxHorizontalScrollBarMember } from 'styles/size';
import { black, greyTransparent } from 'styles/colors';

export default function ScrollBar({ screenButtons, currentValue }) {
  let data = [];
  let data2 = [];
  for (let i = 0; i < screenButtons.length; i++) {
    if (screenButtons[i].label !== 'Home page') {
      data.push(screenButtons[i]);
    } else {
      screenButtons[i].label = 'All';
      data2.push(screenButtons[i]);
    }
  }
  let dataValue = [...data2, ...data];
  const { width: screenWidth } = useWindowDimensions();
  const Wrapper =
    dataValue.length > maxHorizontalScrollBarMember
      ? ({ children }) => <View>{children}</View>
      : React.Fragment;

  return (
    <ScrollView
      horizontal
      contentContainerStyle={[t.flexGrow, t.justifyBetween]}
      style={[t.mX4]}
      showsHorizontalScrollIndicator={false}
    >
      {dataValue.map(({ label, comparisonValue, onPress }, index) => {
        return (
          <Wrapper key={index}>
            <ButtonEclipse
              text={label}
              color={
                comparisonValue == currentValue ? undefined : greyTransparent
              }
              textColor={comparisonValue == currentValue ? undefined : black}
              onPress={onPress}
              style={[t.mX1, t.pX4]}
            />
          </Wrapper>
        );
      })}
    </ScrollView>
  );
}
