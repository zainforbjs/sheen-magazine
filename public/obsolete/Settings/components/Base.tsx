import React from 'react';
import { CompositeScreenProps } from "@react-navigation/native";
import { t } from 'react-native-tailwindcss';
import { NavigationPropsTypeApp } from 'types/navigation';
import { NavigationSettings, NavigationPropsTypeSettings } from 'types/navigation/Account/settings';
import Header from 'components/Header';
import ButtonIconFeather from 'components/ButtonIconFeather';

export type BasePropsSettings<Routename extends keyof NavigationSettings> = CompositeScreenProps<NavigationPropsTypeSettings<Routename>, NavigationPropsTypeApp<"MainApp">>;

export default class Base<Routename extends keyof NavigationSettings> extends React.Component<BasePropsSettings<Routename>>
{
	constructor(props: BasePropsSettings<Routename>)
	{
		super(props);
		const { navigation } = props;

		navigation.setOptions({
			header: () => (
				<Header
					headerLeft=
					{
						<ButtonIconFeather
							name="arrow-left"
							style={[t.pL5]}
							onPress={() => navigation.goBack()}
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
}
