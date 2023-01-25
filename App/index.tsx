import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import NavigationDrawer from 'components/NavigationDrawer';
import DrawerContentAccount from 'features/components/DrawerContentAccount';
import store from 'redux/store';
import navigation from 'navigation';
import { LogBox } from 'react-native';
import analytics from '@react-native-firebase/analytics';

import { adapty } from 'react-native-adapty';

LogBox.ignoreAllLogs();

export default function App(props: any) {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  React.useEffect(() => {
    try {
      //activateAdapty({ sdkKey: 'public_live_y0d1lQBw.YKIsq5aYYXaEQnz71Bs0' }); // Test APP
      //activateAdapty({ sdkKey: 'public_live_hUdOFVPM.7PHZNsSdj32PkeCi4e0d' });
      adapty.activate('public_live_hUdOFVPM.7PHZNsSdj32PkeCi4e0d');
    } catch (error) {
      console.log('Debug :::> File: index.tsx, Line : 25, error :::>', error);
    }
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current =
              navigationRef?.current.getCurrentRoute().name;
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName =
              navigationRef?.current.getCurrentRoute().name;

            if (previousRouteName !== currentRouteName) {
              await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName
              });
            }
            routeNameRef.current = currentRouteName;
          }}
        >
          <NavigationDrawer
            navigationRoutes={navigation}
            initialRouteName="Home"
            DrawerContent={DrawerContentAccount}
          />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
