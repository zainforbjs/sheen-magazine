import moment from 'moment';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { t } from 'react-native-tailwindcss';
import { DetailsId, ListTypeWithOnPress } from 'types';
import { ItemEvent } from 'types/MainApp/Event';
import { bgColor, borderRadius, flex } from 'styles';
import { aspectRatio } from 'styles/image';
import { txtColor, txtSize } from 'styles/text';
import { blackDark, grey, red, greyText } from 'styles/colors';
import { xSmall } from 'styles/size';
import ListPlaceHolder from './ListPlaceHolder';
import EventCard from './EventCard';
import * as AddCalendarEvent from 'react-native-add-calendar-event';

type Props = ListTypeWithOnPress<ItemEvent, DetailsId> & {
  actionText: string;
};

type DateBoxProps = {
  onPressItem?: (id: DetailsId) => void;
  eventId: number;
  eventStartDateMoment: moment.Moment;
};
const DateBox = ({
  onPressItem,
  eventId,
  eventStartDateMoment
}: DateBoxProps) => (
  <View style={[t.flex1, t.flex]}>
    <TouchableOpacity
      onPress={() => onPressItem && onPressItem({ id: eventId })}
    >
      <View
        style={[
          t.flex,
          bgColor(blackDark),
          aspectRatio(),
          t.justifyCenter,
          t.contentCenter,
          t.roundedLg
        ]}
      >
        <Text
          style={[
            t.textWhite,
            t.textCenter,
            t.textLg,
            t.uppercase,
            t.fontSemibold
          ]}
        >
          {eventStartDateMoment.format('MMM')}
        </Text>
        <Text style={[t.textWhite, t.textCenter, t.textLg, t.fontSemibold]}>
          {eventStartDateMoment.format('DD')}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default class ListEvent extends React.Component<Props> {
  // constructor (props:any) {
  //   super(props);}
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
        alert('Event added to your calendar');
      })
      .catch(error => {
        alert(error);
      });
  };

  render(): React.ReactNode {
    const { list, actionText, onPressItem } = this.props;
    const eventTitle = 'Default event';
    return list.length === 0 ? (
      <ListPlaceHolder placeholderText="No Events" />
    ) : (
      <>
        {list.map(
          (
            {
              eventId,
              eventTitle,
              eventStartDate,
              eventStartTime,
              eventEndTime,
              eventLocation
            },
            index
          ) => {
            const eventStartDateMoment = moment(eventStartDate, 'DD-MM-YYYY');
            const startDateUTC = moment(
              eventStartDate + 'T' + eventStartTime,
              'DD-MM-YYYYTHH:mm:ss.SSS[Z]'
            );
            const endDateUTC = moment(
              eventStartDate + 'T' + eventEndTime,
              'DD-MM-YYYYTHH:mm:ss.SSS[Z]'
            );
            return (
              <View key={index}>
                <EventCard key={index}>
                  <DateBox
                    eventId={eventId}
                    onPressItem={onPressItem}
                    eventStartDateMoment={eventStartDateMoment}
                  />
                  <View
                    style={[flex(3), t.flex, t.flexCol, t.justifyCenter, t.pL4]}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        onPressItem && onPressItem({ id: eventId })
                      }
                    >
                      <Text style={[t.fontMedium, t.pB1]}>{eventTitle}</Text>
                    </TouchableOpacity>
                    <Text style={[txtColor(greyText), t.pB1]}>
                      <AntDesignIcon name="clockcircleo" /> {eventStartTime} to{' '}
                      {eventEndTime}
                    </Text>
                    <View style={[t.flex, t.flexRow]}>
                      <Text style={[t.flex1, txtColor(greyText)]}>
                        <FontAwesomeIcon name="location-arrow" />{' '}
                        {eventLocation}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.addEventToCalendar(
                            eventTitle,
                            startDateUTC,
                            endDateUTC
                          )
                        }
                        style={[t.flex1, t.flexCol, t.justifyCenter]}
                      >
                        <Text
                          style={[txtColor(red), txtSize(xSmall), t.textRight]}
                        >
                          {actionText}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </EventCard>
              </View>
            );
          }
        )}
      </>
    );
  }
}
