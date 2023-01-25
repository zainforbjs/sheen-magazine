import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import {
  Control,
  Controller,
  FieldError,
  useForm,
  UseFormHandleSubmit,
  UseFormReset
} from 'react-hook-form';
import { Dropdown } from 'react-native-element-dropdown';
import Timer from 'easytimer.js';
import useTimer from 'easytimer-react-hook';
import { t } from 'react-native-tailwindcss';
import { ScreenButtonNormal } from 'types';
import { NavigationPropsTypeApp } from 'types/navigation';
import { NavigationPropsTypeTv } from 'types/navigation/MainApp/tv';
import { ReduxStateRoot } from 'types/Redux';
import { ReduxStateLivestreamCategories } from 'types/Redux/Livestream';
import Header from 'components/Header';
import ButtonEclipse from 'components/ButtonEclipse';
import ButtonIconFeather from 'components/ButtonIconFeather';
import IconVideoLiveStream from 'features/MainApp/Tv/components/IconVideoLiveStream';
import LayoutScrollView from 'components/LayoutScrollView';
import FormControlText from 'components/FormControlText';
import ButtonIconCircleIonicons from 'components/ButtonIconCircleIonicons';
import ButtonRound from 'components/ButtonRound';
import ErrorMessage from 'components/ErrorMessage';
import {
  MapStateToPropsLivestream,
  MapStateToPropsVideoCategories
} from 'redux/utilities';
import { dropdownStyle, txtColor, txtInputSharp } from 'styles/text';
import { black, greyText, white } from 'styles/colors';
import { h, xxLarge } from 'styles/size';
import RNBambuserBroadcaster from 'react-native-bambuser-broadcaster';

type BroadcastAction = {
  startBroadcast: () => void;
  stopBroadcast: () => void;
  switchCamera: () => void;
};
type LiveStreamInformation = {
  title: string;
  description: string;
  category: string;
};

type OwnProps = CompositeScreenProps<
  NavigationPropsTypeTv<'LivestreamAdmin'>,
  NavigationPropsTypeApp<'MainApp'>
>;
type Props = OwnProps & {
  applicationId?: string;
  categories?: ScreenButtonNormal[];
  control: Control<LiveStreamInformation>;
  handleSubmit: UseFormHandleSubmit<LiveStreamInformation>;
  errors: {
    [key in keyof LiveStreamInformation]?: FieldError;
  };
  reset: UseFormReset<LiveStreamInformation>;
  timer: Timer;
};

type State = {
  showLiveStream: boolean;
  isLivestream: boolean;
};

class LivestreamAdmin extends React.Component<Props, State> {
  state: Readonly<State> = {
    showLiveStream: false,
    isLivestream: false
  };
  broadcastRef: React.RefObject<BroadcastAction>;
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
          headerRight={
            <>
              <IconVideoLiveStream />
              <ButtonIconFeather
                name="menu"
                style={[t.pR5, t.selfEnd]}
                onPress={() => navigation.toggleDrawer()}
              />
            </>
          }
        />
      )
    });
    this.broadcastRef = React.createRef<BroadcastAction>();
  }

  componentDidUpdate(previousProps: Props, previousState: State) {
    if (
      !this.state.isLivestream &&
      this.state.isLivestream != previousState.isLivestream
    ) {
      this.broadcastRef.current?.stopBroadcast();
      this.props.timer.reset();
      this.props.timer.stop();
    }
    if (
      !this.state.showLiveStream &&
      this.state.showLiveStream != previousState.showLiveStream
    ) {
      this.setState({ isLivestream: false });
    }
  }
  render(): React.ReactNode {
    const { errors, control, applicationId, categories, timer } = this.props;
    const { showLiveStream, isLivestream } = this.state;
    return (
      <>
        <LayoutScrollView screenTitle="New Live Stream">
          <FormControlText
            title="Video Title"
            titleStyle={[txtColor(greyText), t.textXs, t.mT2]}
            control={control}
            name="title"
            textStyle={txtInputSharp}
            errors={errors}
          />
          <FormControlText
            title="Description"
            titleStyle={[txtColor(greyText), t.textXs, t.mT2]}
            control={control}
            name="description"
            textStyle={txtInputSharp}
            errors={errors}
          />

          <View style={[t.mT2]}>
            <Text style={[txtColor(greyText), t.textXs, t.mT2]}>Category</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Dropdown
                  style={txtInputSharp}
                  containerStyle={dropdownStyle}
                  data={categories || []}
                  maxHeight={190}
                  labelField="label"
                  onBlur={onBlur}
                  valueField="label"
                  value={value}
                  onChange={item => onChange(item?.label)}
                />
              )}
              name="category"
            />
            <ErrorMessage errors={errors} name="category" />
          </View>
          <View style={[t.mT4]}>
            <ButtonEclipse
              text="Go live"
              style={[h(xxLarge)]}
              onPress={() => this.setState({ showLiveStream: true })}
            />
          </View>
        </LayoutScrollView>
        <Modal
          isVisible={showLiveStream}
          coverScreen
          backdropColor={black}
          backdropOpacity={1}
        >
          <RNBambuserBroadcaster
            style={StyleSheet.absoluteFill}
            applicationId={applicationId}
            ref={this.broadcastRef}
            onBroadcastError={(errorCode, errorMessage) => {
              console.log('errorMessage==>', errorMessage);
            }}
            onBroadcastStarted={() => {
              console.log('onBroadcastStarted==>');
              this.setState({ isLivestream: true }, timer.start);
            }}
            onBroadcastStopped={() => this.setState({ isLivestream: false })}
          />
          <View style={[StyleSheet.absoluteFill]}>
            <ButtonIconCircleIonicons
              iconName="close"
              color={white}
              iconColor={black}
              style={[t.absolute, t.top0, t.right0]}
              onPress={() =>
                this.setState({ showLiveStream: false, isLivestream: false })
              }
            />
            <View style={[t.absolute, t.bottom0, t.right0, t.wFull]}>
              <View style={[t.flex, t.flexRow, t.justifyCenter]}>
                <ButtonRound
                  text={isLivestream ? 'Stop Live' : 'Go Live'}
                  size={60}
                  onPress={() =>
                    isLivestream
                      ? this.broadcastRef.current?.stopBroadcast()
                      : this.broadcastRef.current?.startBroadcast()
                  }
                />
              </View>
              <View style={[t.mB3]}>
                <Text style={[t.textWhite, t.textRight, t.pX2]}>
                  {timer.getTimeValues().toString()}
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

export default function (props: OwnProps): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LiveStreamInformation>();
  type LiveStreamInformationReduxState = ReduxStateLivestreamCategories & {
    applicationId?: string;
  };
  const { applicationId, categories } = useSelector<
    ReduxStateRoot,
    LiveStreamInformationReduxState
  >((state: ReduxStateRoot) => ({
    ...MapStateToPropsVideoCategories(state),
    applicationId: MapStateToPropsLivestream(state)
  }));
  const [timer] = useTimer();
  return (
    <LivestreamAdmin
      {...props}
      applicationId={applicationId}
      categories={categories}
      timer={timer}
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
      reset={reset}
    />
  );
}
