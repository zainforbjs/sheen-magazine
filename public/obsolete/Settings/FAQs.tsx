import React from 'react';
import {Text, View} from 'react-native';
import {t} from 'react-native-tailwindcss';
import LayoutScrollView from 'components/LayoutScrollView';
import Base from 'features/Account/Settings/components/Base';
const mockValue = {
  question:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur mi lectus, vel finibus elit vulputate a. Integer nisl justo.',
};

const mockDataForGrid = new Array(6).fill(mockValue);

const questionList: React.ReactNode[] = mockDataForGrid.map(
  ({question}, index) => (
    <View key={index} style={[t.mY3]}>
      <Text style={[t.textLg, t.fontMedium, t.mB1]}>{`Question ${
        index + 1
      }`}</Text>
      <Text style={[t.fontLight]}>{question}</Text>
    </View>
  ),
);

export default class FQAs extends Base<'FAQs'> {
  render(): React.ReactNode {
    return (
      <LayoutScrollView screenTitle="FQAs">
        <View>{questionList}</View>
      </LayoutScrollView>
    );
  }
}
