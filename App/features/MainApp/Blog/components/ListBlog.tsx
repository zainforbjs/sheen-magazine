import moment from 'moment';
import React from 'react';
import { Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { ListTypeWithOnPress, DetailsId, BlogList } from 'types';
import { ItemBlog } from 'types/MainApp/Blog';
import ImageWithScreen from 'components/ImageWithScreen';
import { aspectRatio, modifierAspectRatio } from 'styles/image';
import { txtColor } from 'styles/text';
import { greyText } from 'styles/colors';
import RenderHtml from 'react-native-render-html';
import { GetPosts } from 'api/blog';
import Loading from 'components/Loading';

type Props = BlogList<ItemBlog, DetailsId>;

export default class ListBlog extends React.Component<Props> {
  state = {
    currentValue: 'All',
    list: [],
    isLoading: false,
    currentPage: 1,
    lastScrollView: 0
  };

  constructor(props: Props) {
    super(props);
  }

  postGet = (
    url: string | null = null,
    page: number = 1,
    scrollValue: number = 0
  ) => {
    const { list } = this.state;
    this.setState({ isLoading: true });
    let newUrl = '?page=' + page;
    if (url) newUrl = newUrl + '&categories[0]=' + url;
    GetPosts(newUrl)
      .then((newList: ItemBlog[]) => {
        console.log('list updated');
        this.setState({
          list: list.concat(newList),
          isLoading: false,
          currentPage: page + 1,
          lastScrollView: scrollValue
        });
      })
      .catch(err => {
        console.warn('err==>', err);
        this.setState({ list: [], isLoading: false });
      });
  };

  async componentDidMount() {
    this.postGet();
  }

  onEndReached = ({ distanceFromEnd }) => {
    const { currentPage, currentValue } = this.state;
    this.postGet(
      currentValue != 'All' ? currentValue : null,
      currentPage,
      -distanceFromEnd
    );
  };
  render(): React.ReactNode {
    const { onPressItem } = this.props;
    const { list, isLoading } = this.state;
    return (
      <>
        <FlatList
          data={list}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.3}
          extraData={list}
          renderItem={({
            item: {
              id,
              date,
              title: { rendered: title },
              jetpack_featured_media_url
            },
            index
          }) => (
            <TouchableOpacity
              key={index}
              onPress={() => onPressItem && onPressItem({ id })}
            >
              <View style={[t.flex, t.flexRow, t.mB1]}>
                <View style={[t.flex1, t.flex, t.p2]}>
                  <ImageWithScreen
                    styles={[aspectRatio(modifierAspectRatio), t.roundedLg]}
                    imageUri={jetpack_featured_media_url}
                    loaderShow={true}
                  />
                </View>

                <View
                  style={[t.flex1, t.flex, t.flexCol, t.justifyCenter, t.p2]}
                >
                  <View>
                    <RenderHtml
                      source={{
                        html: title
                      }}
                    />
                  </View>

                  <Text style={[txtColor(greyText), t.textXs]}>
                    {moment(date).format('MMM DD YYYY')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        {isLoading && <Loading />}
      </>
    );
  }
}
