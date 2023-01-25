import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking
} from 'react-native';
import Image from 'react-native-fast-image';
import { t } from 'react-native-tailwindcss';
import { NavigationPropsTypeEvents } from 'types/navigation/MainApp/events';
import { NavigationPropsTypeApp } from 'types/navigation';
import { DetailItemType } from 'types';
import { DetailEventType } from 'types/MainApp/Event';
import ButtonIconFeather from 'components/ButtonIconFeather';
import Header from 'components/Header';
import TimeInfo from 'features/MainApp/Events/components/TimeInfo';
import RowInfo from 'features/MainApp/Events/components/RowInfo';
import { GetEventDetails } from 'api/event';
import { xLarge } from 'styles/size';
import * as colors from 'styles/colors';
import { txtSize, txtColor } from 'styles/text';
import { bgColor } from 'styles';
import { buttonSaveDetailEvent } from 'styles/buttons';
import { aspectRatio } from 'styles/image';
import moment from 'moment';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import RenderHTML from 'react-native-render-html';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HtmlShowModal from 'components/HtmlShowModal';
import Loading from 'components/Loading';
import ImageWithScreen from 'components/ImageWithScreen';

type Props = CompositeScreenProps<
  NavigationPropsTypeEvents<'DetailEvent'>,
  NavigationPropsTypeApp<'MainApp'>
>;
type State = DetailItemType<DetailEventType>;
export default class DetailEvent extends React.Component<Props, State> {
  addEventToCalendar = (title: any, startDateUTC: any, endDateUTC: any) => {
    console.log(startDateUTC);
    const eventConfig = {
      title: title,
      startDate: moment.utc(startDateUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      endDate: moment.utc(endDateUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      notes: 'Default Event Description'
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then(eventInfo => {
        if (eventInfo.action !== 'CANCELED')
          alert('Event added to your calendar');
      })
      .catch(error => {
        if (error === 'permissionNotGranted')
          Alert.alert('Info', 'Please Give Calender permission to App', [
            {
              text: 'Give Permission',
              onPress: () => {
                Linking.openSettings();
              }
            },
            {
              text: 'Cancel'
            }
          ]);
      });
  };

  state = {
    item: undefined,
    htmlModalShow: false,
    loading: false
  };

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
            <ButtonIconFeather
              name="menu"
              style={[t.pR5, t.selfEnd]}
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          }
        />
      )
    });
  }
  componentDidMount() {
    const { route } = this.props;
    const { id } = route.params;
    this.setState({ loading: false });
    GetEventDetails(id).then(item => {
      this.setState({ item, loading: false });
    });
  }

  render(): React.ReactNode {
    const { item, loading } = this.state;
    if (!item || item.error) return null;

    const {
      eventDetail: {
        eventTitle,
        eventStartDate,
        eventStartTime,
        eventEndTime,
        eventLocation,
        eventAddress,
        eventCoverImage,
        eventDescription,
        eventTicketLink
      }
    } = item;
    const startDateUTC = moment(
      eventStartDate + 'T' + eventStartTime,
      'DD-MM-YYYYTHH:mm:ss.SSS[Z]'
    );
    const endDateUTC = moment(
      eventStartDate + 'T' + eventEndTime,
      'DD-MM-YYYYTHH:mm:ss.SSS[Z]'
    );

    const startDateFormat = (moment(eventStartDate, "DD-MM-YYYY").format("MM-DD-YYYY") || "");

    return (
      <>
        <SafeAreaView style={[t.flex1, t.pX5, bgColor(colors.dust)]}>
          <ScrollView style={t.wFull}>
            <ImageWithScreen
              styles={[
                t.wFull,
                aspectRatio(1.76),
                t.mT5,
                t.mB2,
                t.roundedLg,
                t.bgBlue100
              ]}
              imageUri={eventCoverImage}
              loaderShow={true}
            />
            {/* <Image
              style={[
                t.wFull,
                aspectRatio(1.76),
                t.mT5,
                t.mB2,
                t.roundedLg,
                t.bgBlue100
              ]}
              source={{ uri: eventCoverImage }}
              resizeMode="cover"
            /> */}
            <View
              style={[
                t.flex1,
                {
                  alignItems: 'center'
                }
              ]}
            >
              <TouchableOpacity
                onPress={() =>
                  this.addEventToCalendar(eventTitle, startDateUTC, endDateUTC)
                }
                style={{
                  minWidth: '40%',
                  backgroundColor: 'white',
                  minHeight: 40,
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 20,
                  marginTop: 10
                }}
              >
                <AntDesign name="calendar" color="red" size={15} />
                <Text
                  style={{
                    color: 'red',
                    fontWeight: 'bold',
                    marginLeft: 6
                  }}
                >
                  Add to Calender
                </Text>
              </TouchableOpacity>
            </View>
            <RowInfo
              customDescriptionStyle={txtSize(xLarge)}
              title={'Title'}
              description={eventTitle}
            />
            <RowInfo title={'When'} description={startDateFormat} />
            <RowInfo
              title={'Where'}
              description={eventAddress}
              subDescription={eventLocation}
            />
            <RowInfo title={'Location'} description={eventLocation} />
            <TimeInfo startTime={eventStartTime} endTime={eventEndTime} />
            <RowInfo
              title={'Description'}
              description={<RenderHTML source={{ html: eventDescription }} />}
            />
          </ScrollView>
          <TouchableOpacity
            style={[buttonSaveDetailEvent, t.wFull]}
            onPress={() => Linking.openURL(eventTicketLink)}
          >
            <Text
              style={[
                t.selfCenter,
                t.textBase,
                txtColor(colors.white),
                t.fontBold
              ]}
            >
              Get Tickets
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
        {loading && <Loading />}
      </>
    );
  }
}
