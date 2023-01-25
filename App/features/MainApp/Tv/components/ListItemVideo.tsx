import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { t } from 'react-native-tailwindcss';
import { DetailsId } from 'types';
import { ItemVideo } from 'types/MainApp/Tv';
import { GetItemVideoThumbnail } from 'api/videos';
import { bgColor, flex } from 'styles';
import { black, green, greyText, orange, red } from 'styles/colors';
import { aspectRatio, modifierImageScrollViewAspectRatio } from 'styles/image';
import { large, w } from 'styles/size';
import { txtColor } from 'styles/text';
import { BackgroundImage } from 'react-native-elements/dist/config';

type Props = ItemVideo & {
  onPressItem?: (detail: DetailsId) => void;
  imageThumbnailMaxWidth: number;
  paid?: boolean;
};

type State = {
  thumbnailUri: string;
};
export default class ListItemVideo extends React.Component<Props, State> {
  render(): React.ReactNode {
    const {
      title,
      thumbnail,
      length,
      paid,
      videoId,
      isAvailableForSale,
      myVideo,
      imageThumbnailMaxWidth,
      onPressItem
    } = this.props;

    const paidVideo: boolean =
      paid === undefined ? !isAvailableForSale || myVideo : paid;
    return (
      <TouchableOpacity
        style={[w(imageThumbnailMaxWidth)]}
        onPress={() => onPressItem && onPressItem({ id: videoId })}
      >
        <View style={[t.m2, t.roundedLg, t.bgWhite]}>
          <Image
            source={{ uri: thumbnail }}
            style={[
              aspectRatio(modifierImageScrollViewAspectRatio),
              t.roundedTLg
            ]}
          />

          <View style={[t.flex, t.flexRow]}>
            <View style={[flex(3), t.flex, t.flexCol, t.p1]}>
              <Text
                style={[t.textBlack, t.fontSemibold, t.p1]}
                numberOfLines={1}
              >
                {title}
              </Text>
              <Text style={[txtColor(greyText), t.textXs, t.pL1]}>
                {length}
              </Text>
            </View>
            <View style={[t.flex1, t.justifyEnd]}>
              <View
                style={[bgColor(paidVideo ? black : '#FF0000'), styles.rbr]}
              >
                <FontAwesome5Icon
                  style={[t.textWhite, t.textCenter, t.roundedBrLg, t.p2]}
                  size={large}
                  name={paidVideo ? 'play' : 'dollar-sign'}
                />
                {/* </View> */}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  rbr: {
    borderBottomRightRadius: 10
  }
});
