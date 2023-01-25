import React from 'react';
import { Text, View } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { connect } from 'react-redux';
import { t } from 'react-native-tailwindcss';
import { NavigationPropsTypeIssues } from 'types/navigation/MainApp/issues';
import { ListType } from 'types';
import { ReduxStateAccount } from 'types/Redux/Account';
import { ReduxStateRoot } from 'types/Redux';
import { NavigationPropsTypeApp } from 'types/navigation';
import { ItemIssueType } from 'types/MainApp/Issue';
import ButtonEclipse from 'components/ButtonEclipse';
import { MapStateToPropsAuthUser } from 'redux/utilities';
import { bgColor } from 'styles';
import { black, greyTransparent } from 'styles/colors';
import AllIssues from './components/AllIssues';
import DownloadedIssues from './components/DownloadedIssues';
import DoubleSubscriptionPopup from 'components/DoubleSubscriptionPopup';
import { GetCurrentIssueSubscription } from 'api/issues';

type Props = CompositeScreenProps<
  NavigationPropsTypeIssues<'Home'>,
  NavigationPropsTypeApp<'MainApp'>
> &
  ReduxStateAccount;
type State = ListType<ItemIssueType> & {
  activeTab: string;
  subscriptionPopup: boolean;
  subscriptionStatus: string;
};

class Home extends React.Component<Props, State> {
  state: Readonly<State> = {
    activeTab: 'All',
    subscriptionPopup: false,
    subscriptionStatus: ''
  };

  componentDidMount(): void {
    const { user } = this.props;
   
    const userId = user?.userId;
    if (userId) {
      GetCurrentIssueSubscription(userId).then(data => {
        console.log('Debug :::> File: Home.tsx, Line : 43, data :::>', data);
        this.setState({ subscriptionStatus: data.status });
      });
    }
  }

  setSubscriptionPopup(value) {
    this.setState({
      ...this.state,
      subscriptionPopup: value
    });
  }

  render(): React.ReactNode {
    const { navigation, user } = this.props;
    const { activeTab, subscriptionPopup } = this.state;
    return (
      <>
        <View style={[t.p4, t.flex, bgColor('white')]}>
          <View style={[t.flexRow, t.flex, bgColor('white'), t.pB3]}>
            <View style={[t.flex1]}>
              <Text style={[t.fontBlack, t.text2xl, t.fontSemibold]}>
                Issues
              </Text>
            </View>
            <View style={[]}>
              <Text
                style={[
                  t.fontBold,
                  {
                    paddingHorizontal: 10
                  }
                ]}
              >
                {this.state.subscriptionStatus}
              </Text>
            </View>
            {/* <View style={[]}>
              {Boolean(!user?.isAdmin) && (
                <ButtonEclipse
                  text="Extend Subscription"
                  textStyle={[
                    t.fontBold,
                    {
                      paddingHorizontal: 10
                    }
                  ]}
                  onPress={() => this.setState({ subscriptionPopup: true })}
                />
              )}
            </View> */}
          </View>
          <View
            style={[
              t.flexRow,
              {
                alignItems: 'center',
                justifyContent: 'center'
              }
            ]}
          >
            <ButtonEclipse
              text={'All Issues'}
              color={activeTab === 'All' ? undefined : greyTransparent}
              textColor={activeTab == 'All' ? undefined : black}
              style={[t.mX1, t.pX4]}
              onPress={() => this.setState({ activeTab: 'All' })}
            />
            {user?.userId &&
            <ButtonEclipse
              text={'Downloaded'}
              color={activeTab === 'Downloaded' ? undefined : greyTransparent}
              textColor={activeTab == 'Downloaded' ? undefined : black}
              style={[t.mX1, t.pX4]}
              onPress={() => this.setState({ activeTab: 'Downloaded' })}
            />}
          </View>
        </View>

        <DoubleSubscriptionPopup
          isVisible={subscriptionPopup}
          ActionSubscribe={() => {
            this.setSubscriptionPopup(false);
            navigation.navigate('SubscriptionTv');
          }}
          homeSubscribe={true}
          ActionCancel={() => this.setSubscriptionPopup(false)}
          description="To view this issue and gain full access choose a subscription"
          period="Issue"
          price="5.99"
          price2="14.99"
          period2="Year for 6 Issues"
          user={user}
          navigation={navigation}
        />
        {activeTab === 'All' ? (
          <AllIssues navigation={navigation} user={user} />
        ) : (
          <DownloadedIssues navigation={navigation} user={user} />
        )}
      </>
    );
  }
}

export default connect<ReduxStateAccount, null, undefined, ReduxStateRoot>(
  MapStateToPropsAuthUser
)(Home);
