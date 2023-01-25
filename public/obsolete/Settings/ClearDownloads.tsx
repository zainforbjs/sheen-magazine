import React from 'react';
import { Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import Icon from 'react-native-vector-icons/Feather';
import RadioButtonRN from 'custom-modules/RadioButtonRN';
import LayoutScrollView from 'components/LayoutScrollView';
import Base from 'features/Account/Settings/components/Base';
import { buttonRoundBox } from 'styles';
import { txtColor } from 'styles/text';
import { green, greyLight } from 'styles/colors';

const data = [
	{
		label: '1 month',
	},
	{
		label: '3 months',
	},
	{
		label: '6 months',
	},
	{
		label: 'Never',
	},
];

export default class ClearDownloads extends Base<'ClearDownloads'> {
	render(): React.ReactNode
	{
		return (
			<LayoutScrollView screenTitle="Settings">
				<View>
					<Text style={[t.mT5, t.mL3, txtColor(greyLight), t.uppercase]}>
						Clear Downloads
					</Text>
					<View style={[buttonRoundBox, t.pY1, t.pB3, t.mT1]}>
						<RadioButtonRN
							data={data}
							box={false}
							boxStyle={[t.pX4]}
							selectedBtn={() => console.log()}
							icon={<Icon name="check" size={25} color={green} />}
						/>
					</View>
				</View>
			</LayoutScrollView>
		);
	}
}
