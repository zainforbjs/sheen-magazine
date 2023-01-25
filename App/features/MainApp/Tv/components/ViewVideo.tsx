import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Modal from 'react-native-modal';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import { t } from 'react-native-tailwindcss';
import { paramsGetListDefault } from 'const';
import { DetailsId, ListTypeWithOnPress, WatchVideoProps } from 'types';
import { NavigationPropsTypeApp } from 'types/navigation';
import {
  NavigationPropsTypeTv,
  NavigationTv
} from 'types/navigation/MainApp/tv';
import { ItemVideo, ParamsGetListVideo } from 'types/MainApp/Tv';
import LayoutMiddleAlignScreen from 'components/LayoutMiddleAlignScreen';
import ImageWithScreen from 'components/ImageWithScreen';
import Header from 'components/Header';
import ButtonIconFeather from 'components/ButtonIconFeather';
import ListVideo from 'features/MainApp/Tv/components/ListVideo';
import { GetVideos } from 'api/videos';
import { bgColor, flex } from 'styles';
import { aspectRatio, modifierImageScrollViewAspectRatio } from 'styles/image';
import { txtColor } from 'styles/text';
import { large, medium } from 'styles/size';
import {
  greyText,
  grey,
  red,
  greyTransparent,
  greyLight,
  white
} from 'styles/colors';

type Props = CompositeScreenProps<
  NavigationPropsTypeTv<keyof NavigationTv>,
  NavigationPropsTypeApp<'MainApp'>
> & {
  heading: string;
  title: string;
  length: string;
  thumbnailUri: string;
  description: string;
  totalViews?: number;
  createdAt: string;
  categories: string[];
  displayVideo: boolean;
  categoryLabel: string;
  SetDisplayVideo: (displayVideo: boolean) => void;
};

type State = ListTypeWithOnPress<ItemVideo, WatchVideoProps>;

export default class ViewVideo extends React.Component<Props, State> {
  state: Readonly<State> = {
    list: []
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
        />
      )
    });
    const categoriesVideos: string = props.categories.join(', ').trim();
    if (categoriesVideos) {
      let params: ParamsGetListVideo = cloneDeep(paramsGetListDefault);
      params.categories = categoriesVideos;
      this._loadVideos(params);
    }
  }

  _loadVideos(params) {
    GetVideos(params).then(list => {
      this.setState({ list });
    });
  }

  onPressItem = ({ id, categoryLabel }: WatchVideoProps): void => {
    this.props.navigation.push('WatchVideo', { id, categoryLabel });
  };

  render(): React.ReactNode {
    const {
      heading,
      title,
      length,
      thumbnailUri,
      description,
      createdAt,
      totalViews,
      displayVideo,
      SetDisplayVideo,
      categoryLabel,
      children
    } = this.props;

    const { list } = this.state;

    return (
      <View
        style={{
          flex: 1
        }}
      >
        <ScrollView style={[bgColor(grey)]}>
          <LayoutMiddleAlignScreen>
            <View style={[t.mT1, t.pL1]}>
              <Text
                style={[
                  t.text2xl,
                  t.fontBlack,
                  t.fontSemibold,
                  t.textBlack,
                  t.mT2,
                  t.mB1
                ]}
              >
                {heading}
              </Text>
            </View>
            <View style={[t.mT3, t.bgWhite, t.roundedLg]}>
              <View>
                <ImageWithScreen
                  styles={[
                    t.wFull,
                    aspectRatio(modifierImageScrollViewAspectRatio),
                    t.roundedLg
                  ]}
                  imageUri={thumbnailUri}
                />
                <View
                  style={[
                    StyleSheet.absoluteFill,
                    t.roundedLg,
                    t.bgBlack,
                    t.opacity50
                  ]}
                />
                <View
                  style={[
                    StyleSheet.absoluteFill,
                    t.roundedLg,
                    t.flex,
                    t.flexRow,
                    t.justifyCenter,
                    t.contentCenter
                  ]}
                >
                  <View style={[t.contentCenter, t.justifyCenter]}>
                    <TouchableOpacity
                      style={[bgColor(red), t.pY2, t.pX4, t.roundedLg]}
                      onPress={() => SetDisplayVideo(true)}
                    >
                      <AntDesignIcon
                        name="caretright"
                        color={white}
                        size={large}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={[t.p2]}>
                <View style={[t.flex, t.flexRow]}>
                  <Text
                    style={[
                      flex(3),
                      t.textBase,
                      t.fontSemibold,
                      t.mB3,
                      t.textBlack
                    ]}
                  >
                    {title}
                  </Text>
                  <Text style={[t.flex1, t.textBase, t.textRight]}>
                    {length}
                  </Text>
                </View>
                <View style={[t.flex, t.flexRow, t.justifyBetween]}>
                  <TouchableOpacity
                    style={[
                      bgColor(red),
                      t.mR1,
                      t.flexGrow,
                      t.justifyCenter,
                      t.rounded
                    ]}
                  >
                    <Text style={[t.textCenter, t.textWhite]}>
                      {categoryLabel}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      bgColor(greyTransparent),
                      t.mX1,
                      t.p1,
                      t.rounded,
                      t.flex,
                      t.flexRow
                    ]}
                  >
                    <AntDesignIcon
                      name="eye"
                      style={[t.mX1]}
                      color={greyLight}
                      size={large}
                    />
                    <Text style={[t.mX1, t.textSm, t.fontLight]}>
                      {totalViews}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      bgColor(greyTransparent),
                      t.mX1,
                      t.pY1,
                      t.pX2,
                      t.rounded,
                      t.flex,
                      t.justifyCenter,
                      t.flexGrow
                    ]}
                  >
                    <View style={[t.flex, t.flexRow, t.justifyCenter]}>
                      <AntDesignIcon
                        style={[t.mR3]}
                        name="clockcircleo"
                        color={greyLight}
                        size={medium}
                      />
                      <Text style={[t.textXs, t.fontLight]}>
                        {moment(createdAt).format('ll')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Text style={[t.mT2, t.textXs, t.textBlack]}>
                  {description}
                </Text>
              </View>
            </View>
            {Boolean(list.length) && (
              <>
                <Text
                  style={[
                    t.mT4,
                    t.pL2,
                    t.textSm,
                    t.fontBold,
                    txtColor(greyText)
                  ]}
                >
                  More Videos from {categoryLabel}
                </Text>
                <ListVideo
                  list={list}
                  onPressItem={props =>
                    this.onPressItem({ ...props, categoryLabel })
                  }
                />
              </>
            )}
          </LayoutMiddleAlignScreen>
        </ScrollView>
        <Modal isVisible={displayVideo} coverScreen backdropOpacity={1}>
          <View style={[t.flex1]}>{children}</View>
        </Modal>
      </View>
    );
  }
}
