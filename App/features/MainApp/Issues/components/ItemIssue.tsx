import React from 'react';
import { Alert, Text, View } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { t } from 'react-native-tailwindcss';
import { NavigationApp } from 'types/navigation';
import { ReduxStateAccount } from 'types/Redux/Account';
import { NavigationIssues } from 'types/navigation/MainApp/issues';
import ButtonEclipse from 'components/ButtonEclipse';
import ItemIssueThumbnail from 'features/MainApp/Issues/components/ItemIssueThumbnail';
import { black, red } from 'styles/colors';
import { handleDownload } from 'utilities';

type Props = ReduxStateAccount & {
  dateTitle?: string;
  coverImage?: string;
  pdfUri: string;
  paid?: boolean;
  OnPressHaveAccess?: any;
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<NavigationIssues, 'Home'>,
    DrawerNavigationProp<NavigationApp, 'MainApp'>
  >;
  ShowSubscribePopup: () => void;
};
export default class ItemIssue extends React.Component<Props> {
  state = {
    loading: false
  };
  OnPressNoAccess = () => {
    //if(!this.props.user)
    //{
    // Alert.alert("POPUP")
    this.props.ShowSubscribePopup();
    // this.props.navigation.navigate("Account", {screen: "Home",route:'Issue'});
    return;
    // }
  };
  OnPressHaveAccess = () => {
    let { navigation, item } = this.props;
    Alert.alert('Info', 'Are you want to download this file(150 MB)', [
      {
        text: 'Yes',
        onPress: () => {
          this.setState({ loading: true });
          handleDownload(item, navigation).then(response => {
            let { url, isDownloaded } = response;
            this.setState({ loading: false });
            if (isDownloaded)
              navigation.navigate('ViewIssue', { url, title: item?.title });
          });
        }
      },
      {
        text: 'No',
        onPress: () => {
          navigation.navigate('ViewIssue', {
            url: item?.url,
            title: item?.title
          });
        }
      }
    ]);
  };
  render(): React.ReactNode {
    const { dateTitle, pdfUri, paid = false, user, coverImage } = this.props;
    const accessToIssue: boolean = Boolean(paid || user?.isAdmin);
    const { loading } = this.state;
    return (
      <View style={[t.flex1]}>
        {Boolean(dateTitle) && (
          <Text
            style={[
              t.textSm,
              t.mT1,
              t.mB1,
              t.fontSemibold,
              {
                color: 'rgba(0,0,0,0.5)',
                textTransform: 'uppercase'
              }
            ]}
          >
            {dateTitle}
          </Text>
        )}
        <ItemIssueThumbnail pdfUri={pdfUri} coverImage={coverImage} />
        <View style={[t.flex, t.flexRow, t.justifyCenter]}>
          <ButtonEclipse
            disabled={loading}
            color={accessToIssue ? black : red}
            text={
              loading ? 'Downloading...' : accessToIssue ? 'View' : 'Subscribe'
            }
            style={[t.pX1, t.mB4, t.mT3, t.pX5]}
            onPress={
              accessToIssue ? this.OnPressHaveAccess : this.OnPressNoAccess
            }
          />
        </View>
      </View>
    );
  }
}
