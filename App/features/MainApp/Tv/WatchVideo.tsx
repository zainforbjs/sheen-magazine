import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { isEqual } from 'lodash';
import { t } from 'react-native-tailwindcss';
import VideoPlayer from 'custom-modules/CustomVideoPlayer';
import { NavigationPropsTypeApp } from 'types/navigation';
import { NavigationPropsTypeTv } from 'types/navigation/MainApp/tv';
import { ItemVideo } from 'types/MainApp/Tv';
import Header from 'components/Header';
import ButtonIconFeather from 'components/ButtonIconFeather';
import ViewVideo from 'features/MainApp/Tv/components/ViewVideo';
import { LoadVideoById } from 'api/videos';

type Props = CompositeScreenProps<
  NavigationPropsTypeTv<'WatchVideo'>,
  NavigationPropsTypeApp<'MainApp'>
>;
type State = {
  displayVideo: boolean;
  video?: ItemVideo;
  thumbnail: string;
};

export default class WatchVideo extends React.Component<Props, State> {
  state: Readonly<State> = {
    displayVideo: false
  };

  constructor(props: Props) {
    super(props);
    const {
      navigation,
      route: {
        params: { id }
      }
    } = props;
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

    LoadVideoById(id).then(video => this.setState({ video }));
  }

  componentDidMount() {
    const { video } = this.state;
  }
  componentDidUpdate(previousProps: Props, previousState: State) {
    if (!isEqual(previousState.video, this.state.video)) {
      this.componentDidMount();
    }
  }
  render(): React.ReactNode {
    const { video, displayVideo, thumbnail } = this.state;
    const {
      route: {
        params: { categoryLabel }
      }
    } = this.props;
    if (!video) {
      return null;
    }

    return (
      <ViewVideo
        {...this.props}
        thumbnailUri={video.thumbnail}
        heading={categoryLabel}
        categoryLabel={categoryLabel}
        {...video}
        displayVideo={displayVideo}
        SetDisplayVideo={(displayVideo: boolean): void =>
          this.setState({ displayVideo })
        }
      >
        <VideoPlayer
          resizeMode="contain"
          showOnStart={true}
          source={{ uri: video.url }}
          toggleResizeModeOnFullscreen={false}
          tapAnywhereToPause
          onBack={() => this.setState({ displayVideo: false })}
          disableZoom={true}
          disableFullScreen={true}
        />
      </ViewVideo>
    );
  }
}
