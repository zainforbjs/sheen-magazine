import React from 'react';
import { Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import Header from 'components/Header';
import LayoutScrollView from 'components/LayoutScrollView';
import ButtonStack from '../public/obsolete/ButtonStack';
import ButtonIconFeather from 'components/ButtonIconFeather';
import Base, { BasePropsSettings } from 'features/Account/Settings/components/Base';
import { buttonRoundBox, separateLine } from 'styles';
import { greyLight, white } from 'styles/colors';
import { txtColor } from 'styles/text';

export default class Settings extends Base<"Home"> 
{
	constructor(props: BasePropsSettings<"Home">)
	{
		super(props);
		const { navigation } = this.props;

		navigation.setOptions({
			header: () => (
				<Header
					headerLeft=
					{
						<ButtonIconFeather
							name="home"
							style={[t.pL5]}
							onPress={() => props.navigation.navigate('MainApp', { screen: "Issues", params: { screen: "Home" } })}
						/>
					}
					headerRight=
					{
						<ButtonIconFeather
							name="menu"
							style={[t.pR5, t.selfEnd]}
							onPress={() => navigation.toggleDrawer()}
						/>
					}
				/>
			),
		});
	}
	render(): React.ReactNode
	{
		return (
			<LayoutScrollView screenTitle="Settings">
				<View>
					<ButtonStack
						text="Clear Downloads"
						onPress={() => this.props.navigation.navigate('ClearDownloads')}
						buttonRightText="Never"
						color={white}
						style={[t.mT5]}
					/>
					<Text style={[t.mT5, t.mL3, t.mB2, txtColor(greyLight), t.uppercase]}>
						Latest Issues
					</Text>
					<View style={[buttonRoundBox]}>
						<ButtonStack
							text="Cellular Data"
							value={true}
							onPress={() => console.log()}
							isSwitch
						/>
						<View style={[separateLine]} />
						<ButtonStack
							text="Wi-Fi"
							value={true}
							onPress={() => console.log()}
							isSwitch
						/>
					</View>
					<Text style={[t.mT3, t.mL3, t.mB2, txtColor(greyLight)]}>
						New issues will auto-download to your device when connected to:
					</Text>
					<ButtonStack
						text="FAQs"
						onPress={() => this.props.navigation.navigate('FAQs')}
						buttonRightText="Never"
						color={white}
						style={[t.mT5]}
						value={true}
					/>
					<ButtonStack
						text="Analytics"
						onPress={() => console.log()}
						isSwitch
						color={white}
						style={[t.mT5]}
						value={false}
					/>
					<Text style={[t.mT3, t.mL3, t.mB2, txtColor(greyLight)]}>
						To help us improve, this app gathers anonymous data using Google
						Analytics. Opt out anytime by switching this toggle and restarting
						the app.
					</Text>
				</View>
			</LayoutScrollView>
		);
	}
}
