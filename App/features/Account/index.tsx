import React from 'react';
import NavigationStacks from 'components/NavigationStacks';
import accountScene from 'navigation/Account';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import { ReduxStateAccount } from "types/Redux/Account";
import { ReduxStateRoot } from 'types/Redux';
import { MapStateToPropsAuthUser } from 'redux/utilities';
import { NavigationPropsTypeApp } from 'types/navigation';

type Props = NavigationPropsTypeApp<"Account"> & ReduxStateAccount; 

class AuthScreen extends React.Component<Props>
{
	componentDidMount()
	{
		this.props.user && this.props.navigation.navigate("Account", {screen: "Profile"}); 
	}

	componentDidUpdate(previousProps: Props) 
	{
		if(!isEqual(previousProps.user, this.props.user))
		{
			this.componentDidMount(); 
		}
	}
	render() {
		return (
			<NavigationStacks
				initialRouteName={'Home'}
				screenOptions=
				{
					{
						header: () => null
					}
				}
				navigationRoutes={accountScene}
			/>
		);
	}
}

export default connect<ReduxStateAccount, null, undefined, ReduxStateRoot>(MapStateToPropsAuthUser)(AuthScreen);