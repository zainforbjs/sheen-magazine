import React, { useLayoutEffect } from 'react';
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
import { RequestChangePassword } from 'api/account';

type Props = NavigationPropsTypeApp<'MainApp'>;

const ForgotPassword: React.FC<Props> = (props: Props) => {
	const { control, formState: { errors }, handleSubmit, setError } = useForm({ defaultValues: { email: '' } });
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

	const handleNext = ({ email }) => {
		// props.navigation.navigate('Account', { screen: 'ForgotPasswordVerification', params: { email } })
		RequestChangePassword(email)
			.then(response => {
				console.log("RequestChangePassword response==>", typeof response.success)
				if (response.success) {
					props.navigation.navigate('Account', { screen: 'ForgotPasswordVerification', params: { email } })
				}
				else setError("email", { type: 'custom', message: response.message })
			})
			.catch(err => setError("email", { type: 'custom', message: "Somethings went wrong!" }));
	}

	return (
		<>
			<LayoutScrollView screenTitle="Forgot Password">
				<Text style={[t.fontNormal, txtColor(greyText), t.mY2]}>
					Enter the email address to send change password request.
				</Text>
				<View>
					<FormControlText
						control={control}
						rules={validationRulesUserInformation?.email}
						name="email"
						placeholder="Email"
						textStyle={txtInputRoundCorner}
						errors={errors}
					/>

					<View style={[t.flex, t.justifyStart, t.flexRow, t.mT5]}>
						<ButtonEclipse
							text="Forgot Password"
							color={red}
							style={[h(54)]}
							onPress={handleSubmit(handleNext)}
						/>
					</View>
				</View>
			</LayoutScrollView>
			{isLoading && <Loading />}
		</>
	);
};

export default ForgotPassword;
