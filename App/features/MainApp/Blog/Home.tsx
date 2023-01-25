import React from 'react';
import { t } from 'react-native-tailwindcss';
import { CategoryBlog, ItemBlog } from 'types/MainApp/Blog';
import { GetCategories, GetPosts } from 'api/blog';
import { NavigationPropsTypeBlog } from 'types/navigation/MainApp/blog';
import { DetailsId, ScreenButtonNormal } from 'types';
import Loading from 'components/Loading';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ImageWithScreen from 'components/ImageWithScreen';
import { aspectRatio, modifierAspectRatio } from 'styles/image';
import RenderHTML from 'react-native-render-html';
import { txtColor } from 'styles/text';
import moment from 'moment';
import { black, greyText, greyTransparent, red } from 'styles/colors';
import ButtonEclipse from 'components/ButtonEclipse';

type Props = NavigationPropsTypeBlog<'Home'>;
type State = {
  currentValue: string;
  list: ItemBlog[];
  categories: ScreenButtonNormal[];
  isLoading: boolean;
  loadMoreLoading: boolean;
  currentPage: number;
};

export default class Home extends React.Component<Props, State> {
  state: State = {
    currentValue: 'All',
    list: [],
    categories: [],
    isLoading: false,
    currentPage: 1,
    loadMoreLoading: false
  };

  constructor(props: Props) {
    super(props);
  }

  postGet = (url: string | null = null, page: number = 1) => {
    const { list } = this.state;
    let newUrl = '?page=' + page;
    if (url) newUrl = newUrl + '&categories[0]=' + url;
    GetPosts(newUrl)
      .then((newList: ItemBlog[]) => {
        console.log('list updated');
        this.setState({
          list: list.concat(newList),
          isLoading: false,
          currentPage: page + 1,
          loadMoreLoading: false
        });
      })
      .catch(err => {
        console.warn('err==>', err);
        this.setState({ list: [], isLoading: false, loadMoreLoading: false });
      });
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    this.postGet();
    GetCategories().then((categories: CategoryBlog[]) => {
      const scenesButton: ScreenButtonNormal[] = categories.map(
        ({ name, id }) => ({
          label: name.replace('amp;', ''),
          comparisonValue: id.toString()
        })
      );
      this.setState({ categories: scenesButton });
    });
  }

  render(): React.ReactNode {
    const { navigation } = this.props;
    const {
      list,
      currentPage,
      currentValue,
      categories,
      isLoading,
      loadMoreLoading
    } = this.state;
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View style={[t.mB2, t.mT2]}>
          <View style={[t.flex, t.flexRow, t.justifyBetween, t.mB2, t.pX4]}>
            <Text style={[t.fontBlack, t.text2xl, t.fontSemibold]}>
              Latest Post
            </Text>
          </View>
          <View style={[t.flex, t.flexRow, t.justifyCenter]}>
            <View style={[t.mT2]}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((val, index) => (
                  <ButtonEclipse
                    text={val.label}
                    color={
                      val.comparisonValue == currentValue
                        ? undefined
                        : greyTransparent
                    }
                    textColor={
                      val.comparisonValue == currentValue ? undefined : black
                    }
                    onPress={() => {
                      this.setState({
                        currentValue: val.comparisonValue,
                        list: []
                      });
                      this.postGet(val.comparisonValue);
                    }}
                    style={[t.mX1, t.pX4]}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
        <FlatList
          data={list}
          extraData={list}
          ListFooterComponent={() =>
            list.length > 0 && (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center'
                }}
              >
                <ButtonEclipse
                  color={red}
                  text={loadMoreLoading ? 'Loading' : 'Load More'}
                  textStyle={[t.textSm]}
                  disabled={loadMoreLoading}
                  style={[
                    t.pX1,
                    t.mB4,
                    t.mT3,
                    t.pX5,
                    {
                      width: '30%',
                      height: 40
                    }
                  ]}
                  onPress={() => {
                    this.setState({ loadMoreLoading: true });
                    this.postGet(
                      currentValue != 'All' ? currentValue : null,
                      currentPage
                    );
                  }}
                />
              </View>
            )
          }
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
              onPress={(): void => navigation.navigate('Post', { id })}
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
                    <RenderHTML
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
        <View style={[t.flex1, t.h6]} />
      </View>
    );
  }
}
