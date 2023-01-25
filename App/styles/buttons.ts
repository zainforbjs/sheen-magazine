import { TextStyle, ViewStyle } from "react-native";
import { red, white } from "styles/colors";
import { medium } from "styles/size";

export const buttonEclipse: ViewStyle = 
{
	borderRadius: 45,
	flex: 1,
	display: 'flex',
	justifyContent: 'center',
	height: 32
};
export const buttonEclipseText: TextStyle = 
{
	fontSize: medium,
	textAlign: 'center'
};
export const buttonIconSocialMedia: ViewStyle = 
{
	maxWidth: 30,
	aspectRatio: 1
};
export const buttonRoundBox: ViewStyle = 
{
	borderRadius: 8,
	backgroundColor: white
};
export const buttonSaveDetailEvent: ViewStyle = 
{
	paddingVertical: 20,
	backgroundColor: red,
	borderRadius: 50,
	marginVertical: 26
};