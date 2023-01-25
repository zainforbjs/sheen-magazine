import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Text,
  Linking,
  ImageBackground
} from 'react-native';
import Video from 'react-native-video';
import { t } from 'react-native-tailwindcss';
import { NavigationPropsTypeApp } from 'types/navigation';
import LayoutPopupOverlay from 'components/LayoutPopupOverlay';
import { blue, red, redOverlay, white } from 'styles/colors';
import { bgColor } from 'styles';
import messaging from '@react-native-firebase/messaging';
import ButtonEclipse from 'components/ButtonEclipse';
import { h } from 'styles/size';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NavigationPropsTypeApp<'Home'>;
type State = {
  playVideo: boolean;
  isChecked: boolean;
};

// let timer: any;
export default class Home extends React.Component<Props, State> {
  state: Readonly<State> = {
    playVideo: true,
    isChecked: false
  };
  handleNavigation = () => {
    // if (timer) clearTimeout(timer);
    // this.setState({ playVideo: false });
    this.props.navigation.navigate('MainApp', {
      screen: 'Issues',
      params: { screen: 'Home' }
    });
  };
  componentDidMount() {
    // this.props.navigation.addListener('focus', this.playVideoHandler);
    // if (timer) clearTimeout(timer);
    // timer = setTimeout(() => this.handleNavigation(), 5000);
    if (Platform.OS == 'ios') {
      messaging().setAutoInitEnabled(true);
      messaging()
        .hasPermission()
        .then(enabled => {
          if (enabled === messaging.AuthorizationStatus.AUTHORIZED)
            this.setMessaging();
          else this.requestNotificationPermission();
        })
        .catch(err => console.warn(err));
    } else this.setMessaging();
  }
  componentWillUnmount() {
    // this.props.navigation.removeListener('focus', this.playVideoHandler);
  }

  playVideoHandler = () => {
    this.setState({ playVideo: true });
  };
  requestNotificationPermission = () => {
    messaging()
      .requestPermission()
      .then(res => {
        if (res === messaging.AuthorizationStatus.AUTHORIZED)
          this.setMessaging();
        else if (res === messaging.AuthorizationStatus.DENIED)
          Alert.alert(
            'Sheen Magazine',
            'Please allow app to show notification',
            [
              {
                text: 'OK',
                onPress: this.handleNavigation
              }
            ]
          );
        else this.setMessaging();
      })
      .catch(err => console.warn(err));
  };

  setMessaging = () => {
    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          console.log('fc--,', fcmToken);
          this.notificationListeners();
        } else {
          alert('Could not get fcm token');
        }
      });
  };

  notificationListeners = () => {
    messaging().onMessage(async remoteMessage => {
      console.warn('message recevied');
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('app in backgorund');
      // navigation.navigate('NotificationScreen');
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // if (timer) clearTimeout(timer);
          // navigation.navigate('NotificationScreen');
        }
      });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  };
  render(): React.ReactNode {
    const { isChecked } = this.state;
    return (
      <ImageBackground
        source={require('../assets/SplashBG.png')}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
            // backgroundColor: red
          }}
        >
          <Image source={require('assets/homePageMidleLogo.png')} />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              paddingHorizontal: 30,
              marginBottom: 40
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20
              }}
            >
              <TouchableOpacity
                onPress={() => this.setState({ isChecked: !isChecked })}
              >
                <MaterialCommunityIcons
                  name={
                    isChecked
                      ? 'checkbox-marked-outline'
                      : 'checkbox-blank-outline'
                  }
                  size={24}
                  color={white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    'http://www.sheenmagazine.com/privacy-policy/'
                  )
                }
              >
                <Text
                  style={{
                    color: white,
                    marginLeft: 10,
                    fontWeight: '700',
                    alignItems: 'center'
                  }}
                >
                  I agree to the{' '}
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      fontWeight: 'bold'
                    }}
                  >
                    Terms & Conditions
                  </Text>{' '}
                  by entering this app
                </Text>
              </TouchableOpacity>
            </View>
            <ButtonEclipse
              text={'Continue'}
              disabled={!isChecked}
              style={[h(54), t.bgWhite]}
              textStyle={[{ color: 'red' }]}
              onPress={this.handleNavigation}
            />
          </View>
        </View>
      </ImageBackground>
    );
    // return (
    //   <TouchableOpacity style={t.flex1} onPress={this.handleNavigation}>
    //     <View style={t.flex1}>
    //       <View style={t.flex1}>
    //         {/* <Video
    //           style={StyleSheet.absoluteFill}
    //           source={require('assets/HomePageVideo.mp4')}
    //           repeat={true}
    //           resizeMode="cover"
    //           paused={!this.state.playVideo}
    //         />
    //         <LayoutPopupOverlay style={[bgColor(redOverlay), t.opacity50]}>
    //           <Image source={require('assets/homePageMidleLogo.png')} />
    //         </LayoutPopupOverlay> */}
    //       </View>
    //       <View
    //         style={{
    //           position: 'absolute',
    //           bottom: 0,
    //           width: '100%',
    //           paddingHorizontal: 30,
    //           marginBottom: 40
    //         }}
    //       >
    //         <ButtonEclipse
    //           text={'Continue'}
    //           style={[h(54), t.bgWhite]}
    //           textStyle={[{ color: 'red' }]}
    //         />
    //       </View>
    //     </View>
    //   </TouchableOpacity>
    // );
  }
}
