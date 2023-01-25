import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { t } from 'react-native-tailwindcss';
import { ReduxStateRoot } from 'types/Redux';
import { NavigationPropsTypeApp } from 'types/navigation';
import { ReduxStateAccountProps } from "types/Redux/Account";
import LayoutScrollView from 'components/LayoutScrollView';
import Header from 'components/Header';
import Loading from 'components/Loading';
import ButtonEclipse from 'components/ButtonEclipse';
import ButtonIconFeather from 'components/ButtonIconFeather';
import FormControlText from "components/FormControlText";
import { MapStateToPropsAuth } from 'redux/utilities';
import { validationRulesUserInformation } from 'features/Account/utilities';
import { h } from 'styles/size';
import { txtColor, txtInputRoundCorner } from 'styles/text';
import { greyText, red } from 'styles/colors';
import { ChangePassword } from 'api/account';

type Props = NavigationPropsTypeApp<'MainApp'>;

const ChangePasswordScreen: React.FC<Props> = (props: Props) => {
	const { control, formState: { errors }, handleSubmit, setError } = useForm({ defaultValues: { password: '', confirmPassword: "" } });
	const { isLoading }: ReduxStateAccountProps = useSelector<ReduxStateRoot, ReduxStateAccountProps>(MapStateToPropsAuth);

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
									params: { screen: 'Home' },
								})
							}
						/>
					}
				/>
			),
		});
	}, [props.navigation]);

	useEffect(() => {
		if (!props.route.params?.token || !props.route.params?.email) props.navigation.navigate("Account", { screen: "ForgotPassword" });
	}, [])

	const onSubmit = ({ password, confirmPassword }) => {
		const { email, token } = props.route.params
		console.log(password + ", " + confirmPassword);
		if (password !== confirmPassword) {
			setError("confirmPassword", { type: 'custom', message: "Password not match!" })
			return null;
		}
		ChangePassword({
			email,
			token,
			password
		})
			.then(response => {
				console.log("RequestChangePassword response==>", typeof response.success)
				if (response.success) {
					props.navigation.navigate('Account', { screen: 'Home' })
				}
				else setError("confirmPassword", { type: 'custom', message: response.message })
			})
			.catch(err => {
				console.log(err)
				setError("confirmPassword", { type: 'custom', message: "Somethings went wrong!" })
			});
	}

	return (
		<>
			<LayoutScrollView screenTitle="Change Password">
				<Text style={[t.fontNormal, txtColor(greyText), t.mY2]}>
					Fill out the form below to create your new password.
				</Text>
				<View>
					<FormControlText
						control={control}
						rules={validationRulesUserInformation?.password}
						name="password"
						placeholder="New Password"
						textStyle={txtInputRoundCorner}
						errors={errors}
						secureTextEntry
					/>
					<FormControlText
						control={control}
						rules={validationRulesUserInformation?.password}
						name="confirmPassword"
						placeholder="Confirm Password"
						textStyle={txtInputRoundCorner}
						errors={errors}
						secureTextEntry
					/>
					<View style={[t.flex, t.justifyStart, t.flexRow, t.mT5]}>
						<ButtonEclipse
							text="Change Password"
							color={red}
							style={[h(54)]}
							onPress={handleSubmit(onSubmit)}
						/>
					</View>
				</View>
			</LayoutScrollView>
			{isLoading && <Loading />}
		</>
	);
};

export default ChangePasswordScreen;
