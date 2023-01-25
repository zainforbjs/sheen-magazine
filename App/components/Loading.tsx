import React from 'react';
import { BarIndicator } from 'react-native-indicators';
import { View } from 'react-native';
import { loadingBox, loadingContainer } from 'styles';
import { red } from 'styles/colors';

export default class Loading extends React.Component {
  render() {
    return (
      <View style={[loadingContainer]}>
        <View style={[loadingBox]}>
          <BarIndicator color={red} />
        </View>
      </View>
    );
  }
}
