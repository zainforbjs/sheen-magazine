import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { black, red } from 'styles/colors';
import { txtColor } from 'styles/text';

export default function RadioButton({
  isChecked,
  listItem,
  onRadioButtonPress
}) {
  const _renderCheckedView = () => {
    return isChecked ? (
      <View style={[styles.radioButtonIconInnerIcon]} />
    ) : null;
  };

  return (
    <TouchableOpacity
      style={[styles.mainContainer, isChecked && styles.selectedMain]}
      onPress={onRadioButtonPress}
    >
      <View
        style={[styles.radioButtonIcon, isChecked && styles.selectedButtonIcon]}
      >
        {_renderCheckedView()}
      </View>
      <View style={[styles.radioButtonTextContainer]}>
        <Text
          style={[
            styles.radioButtonText,
            t.fontBold,
            isChecked ? txtColor(red) : txtColor(black)
          ]}
        >
          {listItem.localizedTitle}
        </Text>
        <Text
          style={[
            styles.radioButtonText,
            styles.radioButtonTextLabel,
            isChecked ? txtColor(red) : txtColor(black)
          ]}
        >
          {listItem.vendorProductId}
        </Text>
      </View>
      <View
        style={[
          styles.radioButtonTextContainer,
          isChecked ? txtColor(red) : txtColor(black)
        ]}
      >
        <Text
          style={[
            t.textRight,
            styles.radioButtonText,
            styles.radioButtonTextPrice,
            isChecked ? txtColor(red) : txtColor(black)
          ]}
        >
          ${listItem.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  selectedMain: {
    backgroundColor: 'rgba(237, 33, 36, 0.1)',
    borderColor: '#ED2124'
  },
  mainContainer: {
    width:"100%",
    height: 60,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectedButtonIcon: {
    backgroundColor: '#ED2124'
  },
  radioButtonIcon: {
    backgroundColor: '#D9D9D9',
    height: 14,
    width: 14,
    borderRadius: 14,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedradioButtonIconInnerIcon: {
    // borderColor: '#ED2124'
  },
  radioButtonIconInnerIcon: {
    height: 14,
    width: 14,
    // backgroundColor: '#FFF',
    borderRadius: 10
    // borderWidth: 3,
    // borderColor: 'white'
  },
  radioButtonTextContainer: {
    //flex: 1,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10
  },
  radioButtonText: {
    fontSize: 18
  },
  radioButtonTextPrice: {
    fontWeight: '700',
    fontSize: 31
  },
  radioButtonTextLabel: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 12
  },
  radioButtonTextTitle: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 12
  }
});
