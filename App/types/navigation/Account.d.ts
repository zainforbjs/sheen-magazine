import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type NavigationAccount = {
  Home: undefined;
  Profile: undefined;
  SignUp: undefined;
  SignOut: undefined;
  ForgotPassword: undefined;
  ForgotPasswordVerification: { email: string };
  ChangePassword: { token: string | undefined };
  Subscribe: undefined;
};
export type NavigationPropsTypeAccount<
  RouteName extends keyof NavigationAccount,
  > = NativeStackScreenProps<NavigationAccount, RouteName>;
