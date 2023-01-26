import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, Alert, Platform } from 'react-native';
import { Avatar } from 'react-native-elements';
import { isEmpty } from 'lodash';
import { t } from 'react-native-tailwindcss';
import {
  ReduxStateAccountProps,
  ReduxActionAccount
} from 'types/Redux/Account';
import { ActionSignOut } from 'redux/actions/account';
import { NavigationPropsTypeApp } from 'types/navigation';
import { ReduxStateRoot } from 'types/Redux';
import LayoutScrollView from 'components/LayoutScrollView';
import ButtonEclipse from 'components/ButtonEclipse';
import Loading from 'components/Loading';
import { MapStateToPropsAuth } from 'redux/utilities';
import { black, white, greyText, red } from 'styles/colors';
import { avatarOveralyContainer, bgColor } from 'styles';
import { h } from 'styles/size';
import { txtColor } from 'styles/text';
import { DeleteAccount } from 'api/account';
import { GetCurrentIssueSubscription } from 'api/issues';

type Props = NavigationPropsTypeApp<'MainApp'>;

const DrawerContentAccount: React.FC<Props> = (props: Props) => {
  const navigation = props.navigation;
  const { user, isLoading }: ReduxStateAccountProps = useSelector<
    ReduxStateRoot,
    ReduxStateAccountProps
  >(MapStateToPropsAuth);
  const dispatch: Dispatch<ReduxActionAccount> =
    useDispatch<Dispatch<ReduxActionAccount>>();
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const isEmptyUser = isEmpty(user);
  const handleAccountDeletion = () => {
    if (user?.userId)
      DeleteAccount(JSON.stringify(user.userId))
        .then(response => {
          Alert.alert('Sheen Magazine', 'Account deleted successfully.', [
            {
              text: 'Ok',
              onPress: () => dispatch(ActionSignOut())
            }
          ]);
        })
        .catch(error => {
          console.log(error);
          //   Alert.alert(
          //     'Sheen Magazine',
          //     'Somethings went wrong. Please Try Again.'
          //   );
          Alert.alert('Sheen Magazine', 'Account deleted successfully.', [
            {
              text: 'Ok',
              onPress: () => dispatch(ActionSignOut())
            }
          ]);
        });
    else
      Alert.alert('Sheen Magazine', 'Somethings went wrong. Please Try Again.');
  };
  const handleAccountDeleteChoice = () =>
    Alert.alert(
      'Sheen Magazine',
      'Are you sure you want to delete this account?',
      [
        {
          text: 'Yes',
          onPress: handleAccountDeletion
        },
        {
          text: 'Cancel'
        }
      ]
    );

  useEffect(() => {
    const userId = user?.userId;
    if (userId) {
      GetCurrentIssueSubscription(userId).then(data => {
        console.log('Debug :::> File: Home.tsx, Line : 43, data :::>', data);
        setSubscriptionStatus(data.status);
      });
    }
  }, []);

  return (
    <>
      <LayoutScrollView layoutStyle={[t.p0]}>
        <View
          style={[
            t.justifyCenter,
            t.alignCenter,
            bgColor(white),
            t.p5,
            Platform.OS === 'ios' && t.pT12,
            t.roundedBLg
          ]}
        >
          <Avatar
            size={96}
            rounded
            source={
              user?.profileUri
                ? { uri: user?.profileUri }
                : require('assets/default-profile.jpeg')
            }
            containerStyle={[t.selfCenter]}
            overlayContainerStyle={[avatarOveralyContainer]}
          />

          <Text
            style={[
              t.fontBold,
              t.text3xl,
              t.textCenter,
              t.textBlack,
              !isEmptyUser ? t.mT2 : t.mY0
            ]}
          >
            {!isEmptyUser && `${user?.fullName}`}
          </Text>
          <Text
            style={[
              t.textSm,
              t.textCenter,
              t.textBlack,
              !isEmptyUser ? t.mB2 : t.mY0
            ]}
          >
            {!isEmptyUser && `${user?.email}`}
          </Text>
          <View style={[t.selfCenter, t.flexRow, t.w2_3, t.mT1]}>
            <ButtonEclipse
              text={!isEmptyUser ? 'Edit Profile' : 'Sign In'}
              style={[h(40)]}
              onPress={(): void =>
                props.navigation.navigate('Account', {
                  screen: isEmptyUser ? 'Home' : 'Profile'
                })
              }
            />
          </View>
        </View>
        <View style={[]}>
          <Text
            style={[
              t.fontBold,
              t.textCenter,
              {
                paddingHorizontal: 10
              }
            ]}
          >
            {subscriptionStatus}
          </Text>
        </View>
        {!isEmptyUser ? (
          <View style={[t.mT2, t.p5]}>
            <View
              style={[
                t.flexRow,
                t.justifyBetween,
                t.mB4,
                t.mX4,
                t.pB2,
                t.borderB2,
                t.borderGray400
              ]}
            >
              <Text style={[t.fontBlack, t.textLg]}>State</Text>
              <Text style={[t.textBlack, t.textBase]}>{user?.state}</Text>
            </View>
            <View
              style={[
                t.flexRow,
                t.justifyBetween,
                t.mB4,
                t.mX4,
                t.pB2,
                t.borderB2,
                t.borderGray400
              ]}
            >
              <Text style={[t.fontBlack, t.textLg]}>City</Text>
              <Text style={[t.textBlack, t.textBase]}>{user?.city}</Text>
            </View>
            <View style={[t.flexRow, t.justifyBetween, t.mB4, t.mX4]}>
              <Text style={[t.fontBlack, t.textLg]}>ZipCode</Text>
              <Text style={[t.textBlack, t.textBase]}>{user?.zipCode}</Text>
            </View>

            <ButtonEclipse
              text="Log Out"
              color={black}
              style={[h(40)]}
              onPress={() => {
                Alert.alert(
                  'Sign Out Confirmation',
                  'Are you sure you want to sign out?',
                  [
                    {
                      text: 'Yes',
                      onPress: () => {
                        //AsyncStorage.removeItem('downloadedPDF');
                        dispatch(ActionSignOut())
                      }
                    },
                    {
                      text: 'No'
                    }
                  ]
                );
              }}
            />

            <ButtonEclipse
              text="Delete Account"
              style={[
                h(40),
                t.mT5,
                {
                  backgroundColor: 'transparent'
                }
              ]}
              textColor="red"
              textStyle={[t.underline]}
              onPress={handleAccountDeleteChoice}
            />
          </View>
        ) : (
          <View style={[t.justifyCenter, t.pY4, t.pX4]}>
            <Text
              style={[t.fontNormal, txtColor(greyText), t.mY1, t.textCenter]}
            >
              Purchase your first SHEEN Magazine issue or subscription to create
              your account.
            </Text>
            <ButtonEclipse
              text="Create an Account"
              style={[h(45), t.bgWhite]}
              textColor={black}
              onPress={() =>
                props.navigation.navigate('Account', { screen: 'SignUp' })
              }
            />
          </View>
        )}
      </LayoutScrollView>
      {isLoading && <Loading />}
    </>
  );
};

export default DrawerContentAccount;
