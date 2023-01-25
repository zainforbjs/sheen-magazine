import React from 'react';
import {
  Image,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { t } from 'react-native-tailwindcss';
import { bgColor } from 'styles';
import { h } from 'styles/size';
import { white } from 'styles/colors';
import { useNavigation } from '@react-navigation/native';

type Props = {
  headerLeft?: React.ReactNode;
  logo?: boolean;
  headerRight?: React.ReactNode;
};

export default ({
  headerLeft,
  logo = true,
  headerRight
}: Props): JSX.Element => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <>
      <View style={{ height: insets.top, backgroundColor: white }}>
        <StatusBar
          animated={true}
          backgroundColor={white}
          barStyle={'dark-content'}
        />
      </View>
      <View
        style={[
          t.flex,
          t.flexRow,
          t.justifyBetween,
          t.alignCenter,
          bgColor(white),
          h(70),
          t.pT3
        ]}
      >
        <View style={[t.flex1]}>{headerLeft}</View>
        <View style={[t.flex1]}>
          {logo && (
            <TouchableOpacity onPress={() => navigation.navigate('Issues')}>
              <Image
                source={require('assets/logo.png')}
                style={[t.selfCenter, styles.logo]}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={[t.flex1, t.flexRow, t.alignCenter, t.justifyEnd]}>
          {headerRight}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  logo: {
    maxWidth: 140,
    height: 47
  }
});
