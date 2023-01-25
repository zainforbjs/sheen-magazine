import { NavigationScreenConfig } from 'types/navigation';
import { NavigationAccount } from 'types/navigation/Account';
import Profile from 'features/Account/Profile';
import Home from 'features/Account/Home';
import SignUp from 'features/Account/SignUp';
import ForgotPassword from 'features/Account/ForgotPassword';
import ChangePassword from 'features/Account/ChangePassword';
import Subscribe from 'features/Account/Subscribe';
import ForgotPasswordVerification from 'features/Account/ForgetPasswordVerification';

const scenes: NavigationScreenConfig<NavigationAccount>[] = [
  {
    name: 'Home',
    Component: Home
  },
  {
    name: 'SignUp',
    Component: SignUp
  },
  {
    name: 'ForgotPassword',
    Component: ForgotPassword
  },
  {
    name: 'ForgotPasswordVerification',
    Component: ForgotPasswordVerification
  },
  {
    name: 'ChangePassword',
    Component: ChangePassword
  },
  {
    name: 'Profile',
    Component: Profile
  },
  {
    name: 'Subscribe',
    Component: Subscribe
  },
];

export default scenes;
