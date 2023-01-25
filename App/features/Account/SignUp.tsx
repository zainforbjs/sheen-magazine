import React, { useEffect } from 'react';
import { Text, Alert } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { NavigationPropsTypeAccount } from 'types/navigation/Account';
import Header from 'components/Header';
import ButtonIconFeather from 'components/ButtonIconFeather';
import FormUserDetails from 'features/Account/components/FormUserDetails';
import { ActionSignUp } from 'redux/actions/account';
import { greyText } from 'styles/colors';
import { txtColor } from 'styles/text';
import { useSelector } from 'react-redux';
import { ReduxStateRoot } from 'types/Redux';
import { ReduxStateAccountProps } from 'types/Redux/Account';
import { MapStateToPropsAuth } from 'redux/utilities';

type Props = NavigationPropsTypeAccount<'SignUp'>;

const SignUp: React.FC<Props> = props => {
  const { registerUser }: ReduxStateAccountProps = useSelector<
    ReduxStateRoot,
    ReduxStateAccountProps
  >(MapStateToPropsAuth);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      header: () => (
        <Header
          headerLeft={
            <ButtonIconFeather
              name="home"
              style={[t.pL5]}
              onPress={() => props.navigation.navigate('Home')}
            />
          }
        />
      )
    });
  }, [props.navigation]);

  useEffect(() => {
    if (registerUser) {
      props.navigation.navigate('Home');
    }
  }, [registerUser]);

  // useEffect(() => {
  //   Alert.alert(
  //     'Sheen Magazine',
  //     'We need date of birth and gender for sending customised offers.'
  //   );
  //   return () => null;
  // },[]);

  return (
    <FormUserDetails
      screenTitle="Create an Account"
      actionText="Create an Account"
      Action={ActionSignUp}
      navigation={props.navigation}
      callback={() => {
        Alert.alert(
          'Successfully registered please Login to access your account'
        );
        props.navigation.navigate('Home');
      }}
    >
      <Text style={[t.fontNormal, txtColor(greyText), t.mY2]}>
        Fill out the form below to create an account.
      </Text>
    </FormUserDetails>
  );
};
export default SignUp;
