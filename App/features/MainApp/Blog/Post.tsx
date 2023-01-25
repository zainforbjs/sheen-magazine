import React from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import {
  View,
  Text,
  ScrollView,
  Linking,
  Platform,
  TouchableOpacity
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Share, { Social } from 'react-native-share';
import moment from 'moment';
import { t } from 'react-native-tailwindcss';
import { NavigationPropsTypeApp } from 'types/navigation';
import { NavigationPropsTypeBlog } from 'types/navigation/MainApp/blog';
import { ItemBlog } from 'types/MainApp/Blog';
import LayoutMiddleAlignScreen from 'components/LayoutMiddleAlignScreen';
import ImageWithScreen from 'components/ImageWithScreen';
import Header from 'components/Header';
import ButtonIconFeather from 'components/ButtonIconFeather';
import { ObjectToUrlParams } from 'utilities';
import { GetPostDetails } from 'api/blog';
import { flex } from 'styles';
import { aspectRatio, modifierAspectRatio } from 'styles/image';
import { txtColor } from 'styles/text';
import { large } from 'styles/size';
import {
  greyText,
  socialMediaFacebookBlue,
  socialMediaTwitterBlue,
  socialMediaPinterestRed
} from 'styles/colors';

type Props = CompositeScreenProps<
  NavigationPropsTypeBlog<'Post'>,
  NavigationPropsTypeApp<'MainApp'>
>;
type State = {
  details: ItemBlog | undefined;
  image: string | null;
};
export default class Post extends React.Component<Props, State> {
  state: Readonly<State> = {
    details: undefined,
    image: null
  };
  constructor(props: Props) {
    super(props);
    const { navigation, route } = props;
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
    const { id } = route.params;
    GetPostDetails(id)
      .then(details => {
        let jetpack_featured_media_url = details?.jetpack_featured_media_url;
        fetch(jetpack_featured_media_url).then(res => {
          if (res.status != 200) {
            this.setState({
              details,
              image:
                "'http://www.sheenmagazine.com/wp-content/uploads/2021/12/cover-1.png'"
            });
          } else {
            this.setState({ details, image: jetpack_featured_media_url });
          }
        });
        // console.log(
        //   'details?._links?.author?.href==>',
        //   details?._links?.author[0]?.href
        // );
        // fetch(details?._links?.author[0]?.href).then(res => {
        //   console.log('res==>', res);
        //   // if (res.status != 200) {
        //   // } else {
        //   //   this.setState({ details, image: jetpack_featured_media_url });
        //   // }
        // });
      })
      .catch(err => {
        console.log('err==>', err.response.data);
      });
  }

  ShareContent = (
    platform: Exclude<Social, Social.FacebookStories | Social.InstagramStories>
  ): void => {
    if (!this.state.details) {
      return;
    }
    Share.shareSingle({
      url: this.state.details?.link,
      social: platform,
      message: this.state.details?.title.rendered
    });
  };

  render(): React.ReactNode {
    const { details, image } = this.state;
    if (!details) {
      return null;
    }
    const {
      title: { rendered: title },
      date,
      content: { rendered: content },
      link
    } = details;
    // let image =
    //   'http://www.sheenmagazine.com/wp-content/uploads/2021/12/cover-1.png';

    return (
      <ScrollView>
        <LayoutMiddleAlignScreen>
          <View style={[t.mT6, t.flex, t.flexRow, t.justifyCenter]}>
            {image && (
              <ImageWithScreen
                styles={[aspectRatio(modifierAspectRatio), t.roundedLg]}
                imageUri={image}
                loaderShow={true}
              />
            )}
          </View>

          <View style={[t.mT1]}>
            {/* <Text  style={[t.text2xl, t.fontBlack, t.fontSemibold, t.textBlack]} >
              {title}
            </Text> */}
            <RenderHtml source={{ html: `<h2>${title}</h2>` }} />
            <Text style={[t.textXs, txtColor(greyText)]}>Author Name: {}</Text>
            <Text style={[t.textXs, txtColor(greyText)]}>
              {moment(date).format('MMM DD YYYY')}
            </Text>
          </View>
          <View style={[t.mT3, t.flex, t.flexRow]}>
            <View style={[t.flex1, t.flex, t.flexRow, t.justifyBetween]}>
              <TouchableOpacity
                onPress={() => {
                  Linking.canOpenURL(
                    'https://www.facebook.com/sharer/sharer.php'
                  );
                  this.ShareContent(Social.Facebook);
                }}
              >
                <MaterialCommunityIcons
                  name="facebook"
                  size={large}
                  color={socialMediaFacebookBlue}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.ShareContent(Social.Twitter)}
              >
                <MaterialCommunityIcons
                  name="twitter"
                  size={large}
                  color={socialMediaTwitterBlue}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (Platform.OS === 'android') {
                    this.ShareContent(Social.Pinterest);
                  } else {
                    const content =
                      'https://pinterest.com/pin/create/button/' +
                      ObjectToUrlParams({ url: link });
                    Linking.openURL(content);
                  }
                }}
              >
                <MaterialCommunityIcons
                  name="pinterest"
                  size={large}
                  color={socialMediaPinterestRed}
                />
              </TouchableOpacity>
            </View>
            <View style={[flex(3)]}>
              <Text style={[t.textRight, txtColor(greyText), t.textXs]}>
                0 Comments
              </Text>
            </View>
          </View>

          <View style={[t.mT3]}>
            <RenderHtml source={{ html: content }} />
          </View>
        </LayoutMiddleAlignScreen>
      </ScrollView>
    );
  }
}
