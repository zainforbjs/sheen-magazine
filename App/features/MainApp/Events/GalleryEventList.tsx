import LayoutScreen from 'components/LayoutScreen';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import {
  NavigationEvents,
  NavigationPropsTypeEvents
} from 'types/navigation/MainApp/events';
import { ItemGalleryEvent } from 'types/MainApp/Event';
import { scenesButton } from 'navigation/MainApp/events';
import ListPlaceHolder from './components/ListPlaceHolder';
import EventCard from './components/EventCard';
import { t } from 'react-native-tailwindcss';
import { GetEventGallery } from 'api/event';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Loading from 'components/Loading';
import LayoutMiddleAlignScreen from 'components/LayoutMiddleAlignScreen';

type Props = NavigationPropsTypeEvents<'GalleryEventList'>;

type YearGalleryEventListProps = {
  year: string;
  eventGalleries: ItemGalleryEvent[];
  navigation: NativeStackNavigationProp<NavigationEvents, 'GalleryEventList'>;
};

const YearGalleryEventList = ({
  year,
  eventGalleries,
  navigation
}: YearGalleryEventListProps) => {
  const onEventPressed = (id: number) => {
    navigation.navigate('GalleryView', { id });
  };
  return (
    <>
      <Text style={[t.mT4, t.pB4, t.textBase, t.fontBold, t.textBlack]}>
        {year}
      </Text>
      {eventGalleries?.length === 0 ? (
        <ListPlaceHolder placeholderText="No galleries created this year." />
      ) : (
        eventGalleries.map(event => (
          <TouchableOpacity
            key={event.eventId}
            onPress={() => onEventPressed(event.eventId)}
          >
            <EventCard>
              <Text style={[t.fontBold]}>{event.eventTitle}</Text>
              {/* <Text style={[t.textRed600, t.right0]} >View Gallery</Text> */}
              <Text style={[t.textRed600, t.absolute, t.right0, t.p2]}>
                <AntDesignIcon name="right" />
              </Text>
            </EventCard>
          </TouchableOpacity>
        ))
      )}
    </>
  );
};

export default class GalleryEventList extends React.Component<Props> {
  state = {
    eventGalleries: undefined,
    isLoading: false
  };
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    GetEventGallery().then(eventGalleries => {
      this.setState({
        eventGalleries: eventGalleries.eventList,
        isLoading: false
      });
    });
  }

  render(): React.ReactNode {
    const { navigation } = this.props;
    const { eventGalleries, isLoading } = this.state;
    return (
      <>
        <LayoutScreen
          categoryButtons={scenesButton}
          onPressButton={navigation.navigate}
          currentValue="GalleryEventList"
          style={[t.pL4, t.pR4]}
        >
          <LayoutMiddleAlignScreen style={[t.mT1]}>
            {eventGalleries &&
              Object.keys(eventGalleries).map(year => (
                <YearGalleryEventList
                  key={year}
                  year={year}
                  eventGalleries={eventGalleries[year]}
                  navigation={navigation}
                />
              ))}
          </LayoutMiddleAlignScreen>
        </LayoutScreen>
        {isLoading && <Loading />}
      </>
    );
  }
}
