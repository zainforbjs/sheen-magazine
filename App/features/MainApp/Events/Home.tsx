import LayoutScreen from 'components/LayoutScreen';
import React from 'react';
import { Text } from 'react-native';
import moment from 'moment';
import { t } from 'react-native-tailwindcss';
import { NavigationPropsTypeEvents } from 'types/navigation/MainApp/events';
import { DetailsId } from 'types';
import { ListEventType } from 'types/MainApp/Event';
import LayoutMiddleAlignScreen from 'components/LayoutMiddleAlignScreen';
import ListEvent from 'features/MainApp/Events/components/ListEvent';
import { GetPastEvents, GetUpcomingEvents } from 'api/event';
import { scenesButton } from 'navigation/MainApp/events';
import { txtColor } from 'styles/text';
import { greyText } from 'styles/colors';
import Loading from 'components/Loading';

type Props = NavigationPropsTypeEvents<'Home'>;
type State = {
  upcomingEvents?: ListEventType;
  pastEvents?: ListEventType;
  selectedStartDate: null;
  selectedEndDate: null;
  isLoading1: boolean;
  isLoading2: boolean;
};

export default class Home extends React.Component<Props, State> {
  state: Readonly<State> = {
    upcomingEvents: undefined,
    pastEvents: undefined,
    selectedStartDate: null,
    selectedEndDate: null,
    isLoading1: false,
    isLoading2: false
  };

  componentDidMount() {
    this.setState({ isLoading1: true, isLoading2: true });
    GetPastEvents().then(events => {
      this.setState({ pastEvents: events, isLoading1: false });
    });

    GetUpcomingEvents().then(events => {
      this.setState({ upcomingEvents: events, isLoading2: false });
    });
  }
  render(): React.ReactNode {
    const { navigation } = this.props;
    const { isLoading1, isLoading2 } = this.state;

    return (
      <>
        <LayoutScreen
          categoryButtons={scenesButton}
          style={[t.textSm, t.fontBold]}
          onPressButton={navigation.navigate}
          currentValue="Home"
        >
          <LayoutMiddleAlignScreen style={[t.mT1]}>
            <Text style={[t.textBase, t.fontBold, t.textBlack, t.pB2, t.pT2]}>
              {moment().format('dddd, MMMM Do, YYYY')}
            </Text>
            <Text style={[t.textSm, t.mY1, txtColor(greyText), t.pB2]}>
              Upcoming Events
            </Text>
            <ListEvent
              list={this.state.upcomingEvents?.eventList || []}
              actionText="+ Add to calendar"
              onPressItem={(params: DetailsId) => {
                navigation.navigate('DetailEvent', params);
              }}
            />
            <Text style={[t.textSm, t.mY1, txtColor(greyText), t.pB2]}>
              Past Events
            </Text>
            <ListEvent
              list={this.state.pastEvents?.eventList || []}
              actionText="More Details"
              onPressItem={(params: DetailsId) =>
                navigation.navigate('DetailEvent', params)
              }
            />
          </LayoutMiddleAlignScreen>
        </LayoutScreen>
        {(isLoading1 || isLoading2) && <Loading />}
      </>
    );
  }
}
