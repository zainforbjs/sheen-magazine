import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import useTimer from 'easytimer-react-hook';
import Timer from 'easytimer.js';
import { t } from 'react-native-tailwindcss';
import { DetailsId } from 'types';
import { NavigationPropsTypeApp } from 'types/navigation';
import { NavigationPropsTypeTv } from 'types/navigation/MainApp/tv';
import { ReduxStateRoot } from 'types/Redux';
import { ItemLivestream } from 'types/MainApp/Livestream';
import Header from 'components/Header';
import ButtonIconFeather from 'components/ButtonIconFeather';
import ButtonIconCircleIonicons from 'components/ButtonIconCircleIonicons';
import ButtonRound from 'components/ButtonRound';
import ViewVideo from 'features/MainApp/Tv/components/ViewVideo';
import { GetActiveBroadcast } from 'api/livestream';
import { black, white } from 'styles/colors';

import { MapStateToPropsLivestream } from 'redux/utilities';

type PlayerAction = {
  play: () => void;
  stop: () => void;
};

type OwnProps = CompositeScreenProps<
  NavigationPropsTypeTv<'LivestreamUser'>,
  NavigationPropsTypeApp<'MainApp'>
>;
type Props = OwnProps & {
  applicationId?: string;
  timer: Timer;
};
type State = {
  displayVideo: boolean;
  currentLivestream:
    | undefined
    | {
        title: string;
        author: string;
        resourceUri: string;
        thumbnailUri: string;
        createdAt: Date;
        categories: string[];
        description: string;
      };
};

class LivestreamUser extends React.Component<Props, State> {
  state: Readonly<State> = {
    displayVideo: false,
    currentLivestream: undefined
  };
  playerRef: React.RefObject<PlayerAction>;
  constructor(props: Props) {
    super(props);
    const { navigation } = props;
    navigation.setOptions({
      header: () => (
        <Header
          headerLeft={
            <ButtonIconFeather
              name="arrow-left"
              style={[t.pL5]}
              onPress={() => navigation.goBack()}
            />
          }
        />
      )
    });
    this.playerRef = React.createRef<PlayerAction>();
    GetActiveBroadcast().then((itemLivestream: ItemLivestream) =>
      this.setState({
        currentLivestream: {
          title: itemLivestream.title,
          author: itemLivestream.author,
          resourceUri: itemLivestream.resourceUri,
          thumbnailUri: itemLivestream.preview,
          createdAt: new Date(itemLivestream.created),
          categories: [itemLivestream.customData.categories ?? ''],
          description: itemLivestream.customData.description ?? ''
        }
      })
    );
  }

  render(): React.ReactNode {
    const { displayVideo, currentLivestream } = this.state;
    const { applicationId } = this.props;

    if (!currentLivestream) {
      return null;
    }

    const RNBambuserPlayer = require('react-native-bambuser-player');

    return (
      <ViewVideo
        {...this.props}
        categories={currentLivestream.categories}
        heading="SHEEN Talk Live Videos"
        displayVideo={displayVideo}
        SetDisplayVideo={(displayVideo: boolean): void =>
          this.setState({ displayVideo })
        }
        thumbnailUri={currentLivestream.thumbnailUri}
        length=""
        title={currentLivestream.title}
        description={currentLivestream.description}
        createdAt={currentLivestream.createdAt.toDateString()}
      >
        <RNBambuserPlayer
          style={StyleSheet.absoluteFill}
          applicationId={applicationId}
          resourceUri={currentLivestream.resourceUri}
          ref={this.playerRef}
        />
        <View style={[StyleSheet.absoluteFill]}>
          <ButtonIconCircleIonicons
            iconName="close"
            color={white}
            iconColor={black}
            style={[t.absolute, t.top0, t.right0]}
            onPress={() => this.setState({ displayVideo: false })}
          />
          <View style={[t.absolute, t.bottom0, t.right0, t.wFull]}>
            <View style={[t.flex, t.flexRow, t.justifyCenter]}>
              <ButtonRound
                // text={isLivestream ? "Live" : ""}
                size={60}
                onPress={() => this.playerRef.current?.play()}
              />
            </View>
            {/* <View style={[t.mB3]}>
						<Text style={[t.textWhite, t.textRight, t.pX2]}>{timer.getTimeValues().toString()}</Text>
					</View> */}
          </View>
        </View>
      </ViewVideo>
    );
  }
}

export default function (props: OwnProps): JSX.Element {
  const applicationId: string | undefined = useSelector<
    ReduxStateRoot,
    string | undefined
  >(MapStateToPropsLivestream);
  const [timer] = useTimer();
  return (
    <LivestreamUser {...props} applicationId={applicationId} timer={timer} />
  );
}
