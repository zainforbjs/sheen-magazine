import React from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { ItemGalleryEvent } from 'types/MainApp/Event';
import { NavigationPropsTypeEvents } from 'types/navigation/MainApp/events';
import LayoutScreen from 'components/LayoutScreen';
import LayoutMiddleAlignScreen from 'components/LayoutMiddleAlignScreen';
import LayoutGrid from 'components/LayoutGrid';
import ButtonIconCircleIonicons from 'components/ButtonIconCircleIonicons';
import ImageViewer from 'components/ImageViewer';
import { scenesButton } from 'navigation/MainApp/events';
import { aspectRatio } from 'styles/image';
import { GetEventGalleryDetails } from 'api/event';
import Header from 'components/Header';
import ButtonIconFeather from 'components/ButtonIconFeather';
import Loading from 'components/Loading';
import { txtColor } from 'styles/text';
import { greyText } from 'styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HtmlShowModal from 'components/HtmlShowModal';
import ImageWithScreen from 'components/ImageWithScreen';

type Props = NavigationPropsTypeEvents<'GalleryView'>;
type State = {
  eventDetail?: ItemGalleryEvent;
  activeUri: string | undefined;
  imageIndex: string | undefined;
  htmlModalShow: boolean;
};

export default class GalleryView extends React.Component<Props, State> {
  state: State = {
    activeUri: undefined,
    eventDetail: undefined,
    imageIndex: undefined,
    htmlModalShow: false
  };

  constructor(props: Props) {
    super(props);
    this.props.navigation.setOptions({
      header: () => (
        <Header
          headerLeft={
            <ButtonIconFeather
              name="arrow-left"
              style={[t.pL5]}
              onPress={() => this.props.navigation.goBack()}
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
    GetEventGalleryDetails(this.props.route.params.id).then(
      eventDetailWrapper => {
        this.setState({ eventDetail: eventDetailWrapper.eventDetail });
      }
    );
  }

  onPressOption = (key: string) => {
    /**
     * Todo
     * Fetch data filter by option
     */
  };
  render() {
    if (this.state.eventDetail === undefined) {
      return <Loading />;
    }

    let allImages = [];
    const galleryPictures = this.state.eventDetail.eventGallery.map(
      (image, index) => {
        const image1 = { url: image };
        allImages.push(image1);
        return (
          <TouchableOpacity
            onPress={() =>
              this.setState({ activeUri: image, imageIndex: index })
            }
          >
            {/* <Image source={{ uri: image }} style={aspectRatio()} /> */}
            <ImageWithScreen
              styles={aspectRatio()}
              imageUri={image}
              loaderShow={true}
            />
          </TouchableOpacity>
        );
      }
    );

    return (
      <LayoutScreen
        style={[t.flex1]}
        categoryButtons={scenesButton}
        onPressButton={this.props.navigation.navigate}
        currentValue="GalleryEventList"
        scrollable={false}
      >
        <LayoutMiddleAlignScreen>
          <View style={[t.mB3, t.mT3]}>
            <Text style={[t.fontBold]}>{this.state.eventDetail.eventYear}</Text>
            <View
              style={{
                flexDirection: 'row'
              }}
            >
              <View
                style={{
                  flex: 1
                }}
              >
                <Text
                  style={[
                    t.fontSemibold,
                    txtColor(greyText),
                    t.mT1,
                    t.mB2,
                    t.textLg
                  ]}
                >
                  {this.state.eventDetail.eventTitle}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.setState({ htmlModalShow: true })}
                style={{
                  backgroundColor: 'white',
                  height: 40,
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 14
                }}
              >
                <AntDesign name="infocirlceo" color="red" size={15} />
                <Text
                  style={{
                    color: 'red',
                    marginLeft: 6
                  }}
                >
                  Description
                </Text>
              </TouchableOpacity>
            </View>

            <LayoutGrid items={galleryPictures} chunkSize={3} />
          </View>
        </LayoutMiddleAlignScreen>

        {this.state.activeUri && (
          <View
            style={[
              StyleSheet.absoluteFill,
              t.p5,
              { backgroundColor: 'rgba(0,0,0,0.75)' }
            ]}
          >
            <View style={[]}>
              <ImageViewer
                index={this.state.imageIndex}
                allImages={allImages}
                closePopup={() => this.setState({ activeUri: undefined })}
              />
            </View>
            <View style={[t.p3, t.flex, t.flexRow, t.justifyCenter]}>
              <ButtonIconCircleIonicons
                iconName="close"
                onPress={() => this.setState({ activeUri: undefined })}
              />
            </View>
          </View>
        )}
        <HtmlShowModal
          html={this.state.eventDetail?.eventDescription}
          visible={this.state.htmlModalShow}
          handleOK={() => this.setState({ htmlModalShow: false })}
        />
      </LayoutScreen>
    );
  }
}
