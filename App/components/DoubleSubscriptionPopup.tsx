import React from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { t } from 'react-native-tailwindcss';
import { ItemUser } from 'types/Account';
import LayoutPopupOverlay from 'components/LayoutPopupOverlay';
import ButtonEclipse from 'components/ButtonEclipse';
import { black, red, white } from 'styles/colors';
import { xxxLarge } from 'styles/size';
import { txtColor, txtSize } from 'styles/text';
import RNIap from 'react-native-iap';
import Loading from './Loading';
import RadioButtonContainer from './RedioButton/RadioButtonContainer';

import { adapty, AdaptyPaywall } from 'react-native-adapty';

type Props = {
  isVisible: boolean;
  description: string;
  price: string;
  period: string;
  price2: string;
  period2: string;
  ActionSubscribe: () => void;
  ActionCancel: () => void;
  user?: ItemUser;
  navigation: NavigationProp<ParamListBase, string, any, any>;
  homeSubscribe: boolean;
  time: string;
  date: Date;
};

type Mystate = {
  loading: boolean;
  currentSelectedItem: number | null;
  paywall: AdaptyPaywall | undefined;
  paid: boolean;
  paidProduct: any;
};
export default class extends React.Component<Props> {
  state: Mystate = {
    loading: false,
    currentSelectedItem: null,
    paywall: undefined,
    paid: false
  };
  async componentDidMount() {
    try {
      // const { paywalls } = await adapty.paywalls.getPaywalls();
      const paywall = await adapty.getPaywall("VideoSubsID");
    //   const products = await adapty.getPaywallProducts(paywall, {
    //     ios: { fetchPolicy: 'wait_for_receipt_validation' },
    // });


      // const bestPaywall = paywalls.find(
      //   (paywall: any) => paywall.developerId === 'testwall'
      // );
      this.setState({
        paywall: undefined
      });

      // let y = await RNIap.initConnection();
      // if (y) {
      //   this.setState(state => ({
      //     loading: false
      //   }));
      // } else {
      //   Alert.alert('Couldnt connect to apple server');
      //   this.setState({ loading: false });
      // }
      // if (Platform.OS === 'android') {
      //   await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
      // } else {
      //   // * WARNING This line should not be included in production code
      //   // This call will call finishTransaction in all pending purchases on every launch,
      //   // effectively consuming purchases that you might not have verified the receipt or given the consumer their product
      //   // TL;DR you will no longer receive any updates from Apple on every launch for pending purchases
      //   await RNIap.clearTransactionIOS();
      // }
    } catch (err) {
      console.log('componentDidMount err==>', err);
      this.setState({ loading: false });
      // console.warn(err.code, err.message);
    }
  }

  requestSubscription = async (sku: any) => {
    try {
      console.log(sku);
      RNIap.initConnection().then(res => {
        console.log(res);
        RNIap.requestSubscription(sku)
          .then(reciept => {
            const date = new Date();
            const time = date.getTime();
            const endDate = time + 365 * 24 * 60 * 60 * 1000;
            const reccuring = true;
            const stype = 'Yearly Subscription For Issues';

            console.log(reciept.transactionid);
          })
          .catch(err => console.log(err));
      });
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  requestProduct = async productToBuy => {
    // RNIap.initConnection().then(res => {
    //   console.log(res);
    //   RNIap.requestPurchase('PIP599', false)
    //     .then(x => console.log(x))
    //     .catch(err => console.log(err));
    // });
    alert(productToBuy)
    try {
      const profile =
        await adapty.makePurchase(productToBuy);

        
      console.log(
        'Debug :::> File: index.tsx, Line : 23, receipt, purchaserInfo, product :::>',
        profile
      );
      this.setState({ paid: true });
      this.props.ActionSubscribe();
    } catch (error) {
      console.log('Debug :::> File: index.tsx, Line : 27,  :::>', error);
      // this.setState({ paid: true });
      // this.props.ActionSubscribe();
    }
    // try {
    //   let x = await RNIap.requestSubscription(sku);
    // } catch (err) {
    //   alert(err);
    //   console.log(err)
    // }
  };

  onRadioButtonPress = itemIdx => {
    this.setState({
      currentSelectedItem: itemIdx
    });
  };

  render(): React.ReactNode {
    const {
      isVisible,
      ActionSubscribe,
      ActionCancel,
      description,
      price,
      period,
      period2,
      user,
      navigation,
      homeSubscribe,
      price2
    } = this.props;
    if (this.state.loading) {
      return (
        <View style={{ flex: 1 }}>
          <Loading />
        </View>
      );
    } else {
      return (
        <ReactNativeModal
          isVisible={isVisible}
          coverScreen
          backdropColor={black}
          backdropOpacity={0.5}
        >
          <LayoutPopupOverlay innerViewStyle={[t.bgWhite, t.roundedLg]}>
            <TouchableOpacity
              style={[t.absolute, t.right0, styles.close]}
              onPress={() => ActionCancel()}
            >
              <Text style={[t.textWhite, t.textCenter]}>X</Text>
            </TouchableOpacity>
            <View style={[t.justifyBetween, t.alignCenter, t.pT5, t.pB4]}>
              <Image
                source={require('assets/logo.png')}
                style={[t.selfCenter, styles.logo]}
              />
            </View>
            {!this.state.paid && (
              <View style={[t.pL4, t.pR4]}>
                <Text style={[t.textCenter, t.textLg, styles.description]}>
                  {description}
                </Text>
              </View>
            )}
            {this.state.paid && (
              <View style={[t.pY20, t.pL4, t.pR4]}>
                <Text style={[t.textCenter, t.textLg, styles.description]}>
                  Thank you
                </Text>
              </View>
            )}
            {!this.state.paid && (
              <View style={[t.pL4, t.pR4, t.mY3]}>
                <Text style={[t.flex, t.textCenter, txtColor(black), t.textLg]}>
                  <RadioButtonContainer
                    values={
                      homeSubscribe
                        ? this.state.paywall?.products[0]
                        : this.state.paywall?.products
                    }
                    currentSelectedItem={this.state.currentSelectedItem}
                    onPress={this.onRadioButtonPress}
                  />
                </Text>
              </View>
            )}
            {!this.state.paid && (
              <View style={[t.pL4, t.pR4]}>
                <View
                  style={[
                    t.textCenter,
                    txtColor(black),
                    t.textLg,
                    styles.proceedBtn
                  ]}
                >
                  <ButtonEclipse
                    text="Activate Subscription"
                    onPress={(): void => {
                      const { paywall, currentSelectedItem } = this.state;
                      const selectedProduct =
                        paywall?.products?.[currentSelectedItem];
                      this.requestProduct("Monthly-Video");
                    }}
                  />
                </View>
              </View>
            )}
            <View style={[t.pL4, t.pR4, t.pY3]}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    'http://www.sheenmagazine.com/privacy-policy/'
                  )
                }
              >
                <Text style={[t.textCenter, t.textLg, styles.privacy]}>
                  By activating a subscription, you agree to
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      fontWeight: 'bold'
                    }}
                  >
                    &nbsp;Terms of Use and Privacy Policy
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </LayoutPopupOverlay>
        </ReactNativeModal>
      );
    }
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 180,
    height: 70
  },
  close: {
    right: -10,
    top: -7,
    height: 30,
    width: 30,
    zIndex: 9999,
    borderRadius: 50,
    borderColor: red,
    borderWidth: 2,
    backgroundColor: red,
    justifyContent: 'center'
  },
  proceedBtn: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 44,
    backgroundColor: 'red',
    borderRadius: 10,
    marginTop: '10%'
  },
  parts: {
    marginTop: 15,
    width: 180,
    height: 80
  },
  or: {
    width: '100%',
    position: 'absolute',
    // bottom: -25,
    alignContent: 'center'
  },
  price: {
    fontSize: 40
  },
  unit: {
    fontSize: 12,
    paddingTop: 12
  },
  subscriptionNote: {
    color: '#000'
  },
  description: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 18,
    color: '#727272'
  },
  privacy: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 17,
    color: '#727272'
  }
});
