import { TextStyle, ViewStyle } from 'react-native';
import { blue, grayMedium, grey1, greyText2, greyTransparent, greyTransparentOpacity, red, white } from 'styles/colors';
import { Platform, StatusBar } from 'react-native';

export const separateLine: ViewStyle = 
{
	borderBottomColor: grey1,
	borderBottomWidth: 1
};
export const emptyBox: ViewStyle = 
{
	padding: 5,
	margin: 2,
	borderWidth: 2,
	borderRadius: 3,
	borderColor: greyTransparent,
	borderStyle: 'dashed'
};
export const bgColor = (color: string): ViewStyle => ({ backgroundColor: color });
export const flex = (number?: number): ViewStyle => ({ flex: number ?? 1 });
export const borderRadius = (num: number): ViewStyle => ({
	borderRadius: num
});

export const circleStyle = (size: number): ViewStyle => 
(
	{
		width: size,
		height: size,
		borderRadius: size * 2,
		justifyContent: 'center',
		alignItems: 'center'
	}
);
export const safeAreaView: ViewStyle = 
{
	flex: 1,
	paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	backgroundColor: white
};
export const subscriptionItemView = 
{
	width: 55,
	borderWidth: 1,
	borderColor: blue,
	borderRadius: 3,
	padding: 3
};

export const doubleClickLine = 
{
	width: 6,
	height: 100,
	backgroundColor: white,
	borderTopLeftRadius: 10,
	borderBottomLeftRadius: 5
};
export const greyLabel = 
{
	borderWidth: 1,
	borderRadius: 3,
	borderColor: greyText2,
	paddingHorizontal: 3
};


export const loadingContainer: ViewStyle = 
{
	backgroundColor: greyTransparentOpacity,
	height: '100%',
	width: '100%',
	overflow: 'hidden',
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 1000,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
};

export const loadingBox: ViewStyle = 
{
	width: 100,
	height: 100,
	borderRadius: 10,
	backgroundColor: white
};

export const messageError: TextStyle = 
{
	marginVertical: 5,
	marginLeft: 15,
	color: red
};

export const avatarOveralyContainer: ViewStyle = 
{
	borderWidth: 2,
	borderColor: grayMedium,
};
