import React, { Dispatch, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { t } from 'react-native-tailwindcss';
import { ReduxStateRoot } from 'types/Redux';
import { NavigationPropsTypeApp } from 'types/navigation';
import { ActionSignIn } from 'redux/actions/account';
import { ItemUserBasic } from 'types/Account';
import {
  ReduxActionAuthSignIn,
  ReduxStateAccountProps
} from 'types/Redux/Account';
import LayoutScrollView from 'components/LayoutScrollView';
import Header from 'components/Header';
import Loading from 'components/Loading';
import ButtonEclipse from 'components/ButtonEclipse';
import ButtonIconFeather from 'components/ButtonIconFeather';
import FormControlText from 'components/FormControlText';
import { MapStateToPropsAuth } from 'redux/utilities';
import { validationRulesUserInformation } from 'features/Account/utilities';
import { h } from 'styles/size';
import { txtColor, txtInputRoundCorner } from 'styles/text';
import { black, greyText } from 'styles/colors';

type Props = NavigationPropsTypeApp<'MainApp'>;

const Home: React.FC<Props> = (props: Props) => {
  const dispatch: Dispatch<ReduxActionAuthSignIn> =
    useDispatch<Dispatch<ReduxActionAuthSignIn>>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues: { email: '', password: '' } });
  const { user, isLoading }: ReduxStateAccountProps = useSelector<
    ReduxStateRoot,
    ReduxStateAccountProps
  >(MapStateToPropsAuth);

  useLayoutEffect(() => {
    return props.navigation.setOptions({
      header: () => (
        <Header
          headerLeft={
            <ButtonIconFeather
              name="home"
              style={[t.pL5]}
              onPress={() =>
                props.navigation.navigate('MainApp', {
                  screen: 'Issues',
                  params: { screen: 'Home' }
                })
              }
            />
          }
        />
      )
    });
  }, [props.navigation]);

  useEffect(() => {
    const Unsubscribe: () => void = props.navigation.addListener('focus', () =>
      reset()
    );
    return Unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    if (user) {
      reset();
    }
  }, [user]);

  return (
    <>
      <LayoutScrollView screenTitle="Not a subscriber yet?">
        <View style={[t.mT10]}>
          <Text style={[t.fontNormal, txtColor(greyText), t.mY1]}>
            Purchase your first SHEEN Magazine issue or subscription to create
            your account.
          </Text>
          <View style={[t.flex, t.justifyStart, t.flexRow, t.mT3]}>
            <ButtonEclipse
              text="Subscribe for the year"
              style={[h(54)]}
              onPress={() =>
                props.navigation.navigate('Account', { amount: '15' })
              }
            />
            <ButtonEclipse
              text="Subscribe monthly"
              style={[h(54)]}
              onPress={() =>
                props.navigation.navigate('Account', { amount: '4.99' })
              }
            />
          </View>
        </View>
      </LayoutScrollView>
      {isLoading && <Loading />}
    </>
  );
};

export default Home;
