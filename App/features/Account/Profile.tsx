import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { NavigationPropsTypeApp } from 'types/navigation';
import { ReduxStateRoot } from 'types/Redux';
import { ReduxStateAccount } from "types/Redux/Account";
import Header from 'components/Header';
import ButtonIconFeather from 'components/ButtonIconFeather';
import FormUserDetails from "features/Account/components/FormUserDetails";
import { MapStateToPropsAuthUser } from 'redux/utilities';
import { greyText } from 'styles/colors';
import { txtColor } from 'styles/text';

type Props = NavigationPropsTypeApp<'MainApp'>;

const Profile: React.FC<Props> = props =>
{
	const { user }: ReduxStateAccount = useSelector<ReduxStateRoot,ReduxStateAccount>(MapStateToPropsAuthUser);

	useEffect(() =>
	{
		if(!user) {
			props.navigation.jumpTo('Account', { screen: 'Home' });
		}
	}, [user, props.navigation]);


	React.useLayoutEffect(() =>
	{
		props.navigation.setOptions({
			header: () => (
				<Header
					headerLeft={
						<ButtonIconFeather
							name="home"
							style={[t.pL5]}
							onPress={() =>
								props.navigation.navigate('MainApp', {
									screen: 'Issues',
									params: { screen: 'Home' },
								})
							}
						/>
					}
				/>
			),
		});
	}, [props.navigation]);


	return (
		<FormUserDetails
			actionText="Save Changes"
			defaultValues={user}
			hidePassword
		>
			<View style={[t.p5]}>
				<Text style={[t.fontBold, t.text2xl]}>My Account</Text>
				<Text style={[t.fontNormal, txtColor(greyText), t.mY2]}>
					You have successfully linked your account for your paid subscription.
				</Text>
			</View>
		</FormUserDetails>
	); 
};

export default Profile;
