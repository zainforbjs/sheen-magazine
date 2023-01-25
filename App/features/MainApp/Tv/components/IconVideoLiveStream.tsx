import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ReduxStateRoot } from "types/Redux";
import { ButtonOnPress } from 'types';
import { ReduxStateAccount } from "types/Redux/Account";
import Icon from 'react-native-vector-icons/Ionicons';
import { grey, red } from 'styles/colors';
import { t } from 'react-native-tailwindcss';
import { connect } from "react-redux";
import { MapStateToPropsAuthUser } from "redux/utilities";

type Props = ReduxStateAccount & ButtonOnPress;
class IconVideoLiveStream extends React.Component<Props> 
{
	render(): React.ReactNode
	{
		const { onPress, user } = this.props;
		if((!user))
		{
			return null; 
		}
		const Wrapper: React.FC = onPress
			? ({ children }) => (
				<TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
			)
			: React.Fragment;
		return (
			<Wrapper>
				<Icon
					name="videocam"
					color={onPress ? grey : red}
					size={29}
					style={[t.pL8, t.pT1]}
				/>
			</Wrapper>
		);
	}
}

export default connect<ReduxStateAccount, null, ButtonOnPress, ReduxStateRoot>(MapStateToPropsAuthUser)(IconVideoLiveStream); 