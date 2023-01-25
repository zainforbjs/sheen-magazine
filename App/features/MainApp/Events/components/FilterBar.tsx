import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {t} from 'react-native-tailwindcss';
import {bgColor} from 'styles';
import * as colors from 'styles/colors';
import {txtColor} from 'styles/text';

type Props = {
  onPressOption: (key: string) => void;
  options?: {id: string; title: string; key: string}[];
};

const listFilterOption = [
  {id: 1, title: 'Years', key: 'Year'},
  {id: 2, title: 'Months', key: 'Month'},
  {id: 3, title: 'Days', key: 'Day'},
  {id: 4, title: 'All Photos', key: 'All'},
];

const FilterBar = (props: Props) => {
  const {onPressOption = () => {}, options = listFilterOption} = props;
  const [activeOptionIndex, setActiveOptionIndex] = useState(0);

  return (
    <View style={[t.absolute, t.bottom0, t.w11_12, t.selfCenter, t.pB3]}>
      <View
        style={[
          t.flexRow,
          t.justifyBetween,
          t.roundedFull,
          bgColor(colors.silver900),
          t.p1,
        ]}>
        {options.map((obj, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={[t.pX5, t.pY2, t.roundedFull, activeOptionIndex === index && bgColor(colors.gray500)]}
            onPress={() => {
              onPressOption(obj.key);
              setActiveOptionIndex(index);
            }}>
            <Text
              style={[
                t.textSm,
                activeOptionIndex === index
                  ? t.textWhite
                  : txtColor(colors.midGray),
              ]}>
              {obj.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FilterBar;
