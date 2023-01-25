import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {
  requestPurchase,
  initConnection,
  endConnection
} from 'react-native-iap';
import moment, { Moment } from 'moment';
import { t } from 'react-native-tailwindcss';
import { ReduxStateAccountProps } from 'types/Redux/Account';
import { NavigationBasic } from 'types/navigation';
import {
  SubscribeItem,
  SubscriptionCurrentResponse,
  SubscriptionProduct
} from 'types';
import { ReduxStateAccount } from 'types/Redux/Account';
import { ReduxStateRoot } from 'types/Redux';
import { MapStateToPropsAuth } from 'redux/utilities';
import { ReduxStateSubscription } from 'types/Redux/Subscription';
import Header from 'components/Header';
import LayoutScrollView from 'components/LayoutScrollView';
import ButtonIconFeather from 'components/ButtonIconFeather';
import Loading from 'components/Loading';
import {
  bgColor,
  borderRadius,
  doubleClickLine,
  flex,
  greyLabel,
  subscriptionItemView,
  separateLine
} from 'styles';
import { buttonRoundBox } from 'styles/buttons';
import {
  black,
  blue,
  greyLight,
  greyModal,
  greyText1,
  greyText2,
  greyText3,
  lightGreyLayout,
  red,
  white
} from 'styles/colors';
import { txtColor } from 'styles/text';
import { h, maxW, w } from 'styles/size';

type StateProps = ReduxStateAccount & ReduxStateSubscription;
type Props = NavigationBasic & {
  subscribedItem: SubscribeItem;
  GetCurrentSubscription: (
    userId: number
  ) => Promise<SubscriptionCurrentResponse>;
  CreateSubscription: (userId: number) => Promise<void>;
  UpdateSubscription: (userId: number, startDate: Moment) => Promise<void>;
};

const Subscription: React.FC<Props> = ({
  navigation,
  subscribedItem,
  GetCurrentSubscription,
  CreateSubscription,
  UpdateSubscription,
  type
}: Props) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [currentSubscription, setCurrentSubscription] = useState<
    SubscribeItem | undefined
  >(undefined);
  const [currentSubscriptionUser, setCurrentSubscriptionUser] = useState<
    SubscriptionCurrentResponse | undefined
  >(undefined);
  const { user, products }: StateProps = useSelector<
    ReduxStateRoot,
    StateProps
  >((state: ReduxStateRoot) => ({
    user: state.account.user,
    products: state.subscription.products
  }));
  const userId = user?.userId;
  const subscriptionForPurchase: SubscriptionProduct | undefined =
    products.find(product => product.type == type);

  const LoadCurrentSubscription: () => void = () =>
    userId &&
    GetCurrentSubscription(userId).then(value =>
      setCurrentSubscriptionUser(value)
    );
  const { isLoading }: ReduxStateAccountProps = useSelector<
    ReduxStateRoot,
    ReduxStateAccountProps
  >(MapStateToPropsAuth);

  const HandleSubscribe = async () => {
    // if(!currentSubscriptionUser || !userId || !subscriptionForPurchase)
    // {
    // 	return;
    // }

    /* mock code */
    if (!currentSubscriptionUser || !userId) {
      return;
    }
    ///////////////////////////////////////////

    try {
      await requestPurchase(type);
    } catch (exception: Error | unknown) {
      const errorMessage: string =
        exception instanceof Error ? exception.message : 'Error with the store';
      // Alert.alert(errorMessage);
      console.log(errorMessage);
      // return;
      // continue for now - will need to find a way to deal with this later
    }

    // const { status, subscription } = currentSubscriptionUser;
    let promiseAction: Promise<void> | undefined = undefined;

    if (!status) {
      promiseAction = CreateSubscription(userId);
    } else if (subscription) {
      const datesCompare: Moment[] = [subscription.endDate, new Date()].map(
        date => moment(date)
      );
      const startDate: Moment = moment.max(datesCompare);
      promiseAction = UpdateSubscription(userId, startDate);
    }

    console.log({ promiseAction });
    promiseAction &&
      promiseAction.then(() => {
        LoadCurrentSubscription();
        Alert.alert('Subscribe Success');
        navigation.navigate('Home');
      });
  };

  useEffect(() => {
    initConnection().then(init => console.log({ init }));
    return () => {
      endConnection();
    };
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          logo={false}
          headerRight={
            <ButtonIconFeather
              name="x"
              onPress={() => navigation.goBack()}
              style={[t.pR5, t.selfEnd]}
            />
          }
        />
      )
    });
  }, [navigation]);

  useEffect(() => {
    const Unsubscribe: () => void = navigation.addListener(
      'focus',
      LoadCurrentSubscription
    );
    return Unsubscribe;
  }, [navigation]);

  useEffect(() => {
    console.log({ userId });
    LoadCurrentSubscription();
    userId &&
      GetCurrentSubscription(userId).then(value =>
        console.log('use effect ', value)
      );
  }, []);

  return (
    <>
      <LayoutScrollView layoutBackgroundColor={lightGreyLayout}>
        <View style={[t.flex, t.flexRow]}>
          <Text
            style={[t.flex1, t.mL3, t.mT2, txtColor(greyLight), t.uppercase]}
          >
            Subscribe
          </Text>
          <Text style={[flex(2), t.mT2, t.textRight]}>
            {subscribedItem.status || currentSubscriptionUser?.status}
          </Text>
        </View>

        <View style={[buttonRoundBox, t.mT2]}>
          <View style={[t.flexRow, t.justifyBetween, t.itemsCenter, t.p4]}>
            <View style={[maxW(screenWidth / 1.6)]}>
              <Text style={[t.fontSemibold, t.capitalize]}>
                {subscribedItem.title}
              </Text>
              <Text style={[txtColor(greyText1), t.mT1]}>
                {subscribedItem.content}
              </Text>
            </View>
            <TouchableOpacity
              style={[t.flex1, t.itemsEnd]}
              onPress={() => {
                if (!user) {
                  navigation.navigate('Account', {
                    screen: 'Auth',
                    params: { screen: 'Home' }
                  });
                  return;
                }
                setCurrentSubscription(subscribedItem);
              }}
            >
              <View style={[subscriptionItemView]}>
                <Text style={[txtColor(blue), t.textCenter]}>
                  $
                  {subscribedItem.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2
                  })}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LayoutScrollView>
      <ReactNativeModal
        isVisible={currentSubscription !== undefined}
        animationIn="slideInUp"
        animationOut="fadeOut"
        backdropColor={black}
        backdropOpacity={0.8}
        onBackdropPress={() => setCurrentSubscription(undefined)}
        style={[t.justifyEnd, t.m0]}
      >
        <View style={[bgColor(greyModal), t.pT5, t.pL5]}>
          <View style={[t.flexRow, t.justifyBetween, t.itemsCenter]}>
            <Text style={[t.textLg, t.fontMedium, t.mB1]}>App Store</Text>
            <TouchableOpacity
              style={[t.pR5]}
              onPress={() => setCurrentSubscription(undefined)}
            >
              <Text style={[txtColor(blue)]}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={[t.flexRow, t.itemsCenter, t.mT5, t.pR5]}>
            <View style={[t.flex1, t.itemsEnd, t.mR3]}>
              <View style={[w(45), h(45), bgColor(red), borderRadius(8)]} />
            </View>
            <View style={flex(3)}>
              <View style={[t.flexRow]}>
                <Text>{currentSubscription?.title}</Text>
                <View style={[greyLabel, t.mL1, t.selfStart]}>
                  <Text style={[txtColor(greyText2)]}>12+</Text>
                </View>
              </View>
              <Text style={[txtColor(greyText3)]}>
                {currentSubscription?.title}
              </Text>
              <Text style={[txtColor(greyText3)]}>In-App Purchase</Text>
            </View>
          </View>
          <View style={[separateLine, t.mY4]} />
          <View style={[t.flexRow, t.itemsCenter, t.pR5]}>
            <View style={[t.flex1, t.itemsEnd, t.mR3]}>
              <Text style={[txtColor(greyText3), t.uppercase]}>Account</Text>
            </View>
            <View style={flex(3)}>
              <Text>{user?.email}</Text>
            </View>
          </View>
          <View style={[separateLine, t.mY4]} />
          <View style={[t.flexRow, t.itemsCenter]}>
            <View style={[t.flex1, t.itemsEnd, t.mR3]} />
            <View style={[t.flexRow, t.justifyBetween, t.pR5, flex(3)]}>
              <Text style={[t.uppercase]}>price</Text>
              <Text style={[t.textLg, t.fontBold]}>
                ${currentSubscription?.price.toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={[separateLine, t.mY4]} />
          <View
            style={[
              t.itemsCenter,
              t.mT5,
              { ...(Platform.OS === 'ios' ? t.mB10 : t.mB5) }
            ]}
          >
            <TouchableOpacity onPress={HandleSubscribe}>
              <Image source={require('assets/slide-button.png')} />
            </TouchableOpacity>
            <Text style={[t.mT2]}>Confirm with Side Button</Text>
          </View>
        </View>
        <View
          style={[
            t.flexRow,
            t.absolute,
            {
              right: 0,
              top: Platform.OS === 'ios' ? screenHeight / 4 : screenHeight / 8
            }
          ]}
        >
          <Text
            style={[txtColor(white), w(90), t.textRight, t.mR2, t.selfCenter]}
          >
            Double Click to Pay
          </Text>
          <View style={[doubleClickLine]} />
        </View>
      </ReactNativeModal>
      {isLoading && <Loading />}
    </>
  );
};

export default Subscription;
