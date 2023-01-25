import React from 'react';
import { Text, View, TextInput, Alert } from 'react-native';
import { Controller } from 'react-hook-form';
import { t } from 'react-native-tailwindcss';
import ErrorMessage from 'components/ErrorMessage';
import {
  txtInputRoundCorner,
  dropdownStyle,
  txtSelectRoundCorner,
  txtLabelStyle,
  dropDownTextStyle,
  txtLabelStyles
} from 'styles/text';

export default class FormControlText extends React.Component {
  render() {
    const {
      title = undefined,
      titleStyle = [],
      viewStyle = [t.mT2],
      control,
      rules = {},
      name,
      placeholder = '',
      textStyle = [],
      errors = undefined,
      secureTextEntry = false,
      inlineLabel = false,
      labelText = ''
    } = this.props;

    return (
      <View style={viewStyle}>
        {Boolean(title) && <Text style={titleStyle}>{title}</Text>}
        {inlineLabel && <Text style={[txtLabelStyles]}>{labelText}</Text>}
        <Controller
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={'grey'}
              style={textStyle}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry}
            />
          )}
          name={name}
        />
        {Boolean(errors) && <ErrorMessage errors={errors} name={name} />}
      </View>
    );
  }
}
