import React, { useState } from 'react';
import { NavigationPropsTypeIssues } from 'types/navigation/MainApp/issues';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { scenesButton } from 'navigation/MainApp/issues';
import Pdf from 'react-native-pdf';
import { ItemIssueType } from "types/MainApp/Issue";
import LayoutScreen from 'components/LayoutScreen';
import LayoutGrid from "components/LayoutGrid";
import LayoutMiddleAlignScreen from "components/LayoutMiddleAlignScreen";
import ButtonEclipse from 'components/ButtonEclipse';
import ItemIssueDownloaded from "features/MainApp/Issues/components/ItemIssueDownloaded";
import ItemIssueDownloadedEmpty from "features/MainApp/Issues/components/ItemIssueDownloadedEmpty";
import { h, sizeButtonIconStandard } from 'styles/size';
import { greyLight } from 'styles/colors';
import { txtColor } from 'styles/text';
import ButtonIconFeather from "components/ButtonIconFeather";

type Props = NavigationPropsTypeIssues<'Download'>;

const Download: React.FC<Props> = props =>
{
	const { navigation } = props; 
	const [isImageViewVisible, setIsImageViewVisible] = useState(false);
	const mockValue : ItemIssueType = {
		dateTitle: 'SEPT/OCT 2021',
		imageUri: 'http://www.sheenmagazine.com/wp-content/uploads/2022/04/jcoplonfeat.png',
	};

	const gridItems: React.ReactNode[] = new Array(13).fill(mockValue).map((props: ItemIssueType) => <ItemIssueDownloaded {...props} onPress={() => setIsImageViewVisible(!isImageViewVisible)} />); 
	
	return (
		<LayoutScreen
			categoryButtons={scenesButton}
			currentValue="Download"
			onPressButton={props.navigation.navigate}
		>
			<LayoutMiddleAlignScreen style={[t.pX5]}>
				<LayoutGrid 
					items=
					{
						gridItems.length == 0 ? new Array(4).fill(<ItemIssueDownloadedEmpty />) : gridItems
					} 
				/>
				{
					gridItems.length==0 && 
					(
						<View style={[t.flex, t.justifyCenter]}>
							<Text style={[t.textCenter, t.fontBlack]}>
								No issues have been downloaded yet.
							</Text>
							<Text style={[t.textCenter, t.pX8, t.mT2, txtColor(greyLight)]}>
								Purchase an issue or a subscription and start adding to your
								library.
							</Text>
						</View>
					)
				}
			</LayoutMiddleAlignScreen>
			{
				gridItems.length == 0 && 
				(
					<View style={[t.flex, t.justifyCenter, t.flexRow, t.mT5]}>
						<View style={[t.flex, t.justifyCenter, t.flexRow, t.w1_2, t.pX6]}>
							<ButtonEclipse
								text="Browse Issues"
								onPress={() => navigation.navigate('Home')}
								style={[h(40)]}
							/>
						</View>
					</View>
				)
			}
			<Modal visible={isImageViewVisible} transparent={true}>
				<View style={[t.flex1, t.bgWhite]}>

					<View style={[StyleSheet.absoluteFill]}>
						<Pdf horizontal style={[StyleSheet.absoluteFill]} source={{uri: "https://sheen-magazine-issues.s3.amazonaws.com/PointsIndicator.pdf", cache: true}} />
					</View>

					<View style={[h(sizeButtonIconStandard)]}>
						<ButtonIconFeather name="x" onPress={() => setIsImageViewVisible(false)} style={[t.pR5, t.selfEnd]} />
					</View>

				</View>
			</Modal>
		</LayoutScreen>
	);
};

export default Download;
