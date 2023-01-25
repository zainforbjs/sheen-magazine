import React, { useEffect } from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { View, Text, ScrollView } from 'react-native';
import moment from 'moment';
import { t } from 'react-native-tailwindcss';
import { NavigationPropsTypeApp } from 'types/navigation';
import { NavigationPropsTypeIssues } from 'types/navigation/MainApp/issues';
import Header from 'components/Header';
import LayoutMiddleAlignScreen from 'components/LayoutMiddleAlignScreen';
import ButtonIconFeather from 'components/ButtonIconFeather';
import ButtonEclipseBuy from 'features/MainApp/Issues/components/ButtonEclipseBuy';
import ItemIssueThumbnail from 'features/MainApp/Issues/components/ItemIssueThumbnail';
import { black } from 'styles/colors';
import { txtColor } from 'styles/text';

type Props = CompositeScreenProps<
  NavigationPropsTypeIssues<'SubscriptionPurchaseIssues'>,
  NavigationPropsTypeApp<'MainApp'>
>;

const SubscriptionPurchaseIssues: React.FC<Props> = props => {
  const {
    navigation,
    route: { params }
  } = props;
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          headerLeft={
            <ButtonIconFeather
              name="arrow-left"
              style={[t.pL5]}
              onPress={() => navigation.navigate('Home')}
            />
          }
          headerRight={
            <ButtonIconFeather
              name="menu"
              style={[t.pR5, t.selfEnd]}
              onPress={() => navigation.toggleDrawer()}
            />
          }
        />
      )
    });
  }, []);

  return (
    <LayoutMiddleAlignScreen>
      <ScrollView>
        <View
          style={[t.mT2, t.flex, t.justifyCenter, t.contentCenter, t.flexRow]}
        >
          <ItemIssueThumbnail pdfUri={params?.url} />
        </View>
        <View style={[t.flex]}>
          <Text style={[t.textXs, txtColor(black), t.opacity50]}>
            {params?.dateTitle ?? moment().format('MMM Do YY')}
          </Text>
          <Text style={[t.textXl, t.fontBlack]}>
            {params?.title ?? 'Sheen Magazine'}
          </Text>
          <View
            style={[t.flex, t.justifyStart, t.flexRow, { width: minWidth }]}
          >
            <ButtonEclipseBuy
              textLeft="Subscribe"
              textRight="$15/YR"
              onPress={() => navigation.navigate('SubscriptionIssues')}
            />
          </View>
        </View>
      </ScrollView>
    </LayoutMiddleAlignScreen>
  );
};

export default SubscriptionPurchaseIssues;
