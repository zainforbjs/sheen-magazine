import React, { memo } from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { t } from 'react-native-tailwindcss';
import { paramsGetListDefault } from 'const';
import { ListType, ScreenButtonNormal, WatchVideoProps } from 'types';
import { ReduxStateRoot } from 'types/Redux';
import { ReduxStateAccountProps } from 'types/Redux/Account';
import {
  ReduxDispatchLivestream,
  ReduxStateLivestreamCategories
} from 'types/Redux/Livestream';
import { NavigationPropsTypeApp } from 'types/navigation';
import { NavigationPropsTypeTv } from 'types/navigation/MainApp/tv';
import { ItemVideo, ParamsGetListVideo } from 'types/MainApp/Tv';
import LayoutScreen from 'components/LayoutScreen';
import LayoutMiddleAlignScreen from 'components/LayoutMiddleAlignScreen';
import Header from 'components/Header';
import SubscriptionPopup from 'components/SubscriptionPopup';
import ButtonIconFeather from 'components/ButtonIconFeather';
import Loading from 'components/Loading';
import ListVideo from 'features/MainApp/Tv/components/ListVideo';
import IconVideoLiveStream from 'features/MainApp/Tv/components/IconVideoLiveStream';
import { GetVideos } from 'api/videos';
import { MapDispatchToPropsVideoCategories } from 'redux/utilities';
import { GetActiveBroadcast } from 'api/livestream';
import RenderSection from './components/RenderSection';

type StateProps = ReduxStateLivestreamCategories & ReduxStateAccountProps;
type OwnProps = CompositeScreenProps<
  NavigationPropsTypeTv<'Home'>,
  NavigationPropsTypeApp<'MainApp'>
>;
type Props = OwnProps & StateProps & ReduxDispatchLivestream;
type State = ListType<ItemVideo> & {
  currentValue: string;
  subscriptionPopup: boolean;
  activeBroadcast: boolean;
  loader: boolean;
  activeCategoryLabel: string;
};

const defaultCategories: ScreenButtonNormal = {
  label: 'All',
  comparisonValue: '0'
};

class Home extends React.Component<Props, State> {
  state: Readonly<State> = {
    currentValue: defaultCategories.comparisonValue,
    list: [],
    subscriptionPopup: false,
    activeBroadcast: false,
    loader: false,
    activeCategoryLabel: 'All'
  };
  constructor(props: Props) {
    super(props);
    const { navigation } = this.props;
    navigation.setOptions({
      header: () => (
        <Header
          headerRight={
            <>
              <IconVideoLiveStream
                onPress={() => navigation.navigate('LivestreamAdmin')}
              />
              <ButtonIconFeather
                name="menu"
                style={[t.pR5, t.selfEnd]}
                onPress={() => navigation.toggleDrawer()}
              />
            </>
          }
        />
      )
    });
  }

  componentDidMount() {
    // this.props.navigation.addListener('focus', this.InnitialLoadVideos);
    this.InnitialLoadVideos();
  }

  componentWillUnmount() {
    // this.props.navigation.removeListener('focus', this.InnitialLoadVideos);
  }

  componentDidUpdate(previousProps: Props, previousState: State) {
    if (this.state.currentValue != previousState.currentValue) {
      const category: ScreenButtonNormal | undefined =
        this.props.categories?.find(
          ({ comparisonValue }: ScreenButtonNormal): boolean =>
            this.state.currentValue == comparisonValue
        );
      let params: ParamsGetListVideo = cloneDeep(paramsGetListDefault);
      if (category) {
        params.categories = category.label;
      }
      this.LoadVideos(params);
    }
  }

  InnitialLoadVideos = () => {
    const callback: () => Promise<void> = async () => {
      await GetActiveBroadcast()
        .then(() => this.setState({ activeBroadcast: true }))
        .catch(() => this.setState({ activeBroadcast: false }));
      this.LoadVideos(paramsGetListDefault);
    };
    if (!this.props.categories?.length) {
      this.props.GetVideoCategories(callback());
      return;
    }
    callback();
  };
  LoadVideos = (params: ParamsGetListVideo, callback?: () => void) => {
    const userId: number | undefined = this.props.user?.userId;
    if (userId) {
      params.userId = userId;
    }
    this.setState({ loader: true });
    GetVideos(params)
      .then(list => this.setState({ list, loader: false }, callback))
      .catch(err => this.setState({ loader: false }));
  };

  OnPressItemAlreadyPaid = ({ id, categoryLabel }: WatchVideoProps): void =>
    this.props.navigation.navigate('WatchVideo', { id, categoryLabel });
  OnPressItemNotPaid = (): void => this.setState({ subscriptionPopup: true });

  getCategoriesTitle = (
    currentValue: string,
    categoryButtons: Array<ScreenButtonNormal>
  ): string => {
    let filter = categoryButtons.filter(
      item => item.comparisonValue === currentValue
    );
    return filter[0].label;
  };

  render(): React.ReactNode {
    const {
      currentValue,
      list,
      subscriptionPopup,
      activeBroadcast,
      loader,
      activeCategoryLabel
    } = this.state;
    const { navigation, categories, user, isLoading } = this.props;
    const categoryButtons = [defaultCategories].concat(categories || []);

    const listForSale: ItemVideo[] = list.filter(
      video => video.isAvailableForSale && !video.myVideo
    );
    const listForFree: ItemVideo[] = list.filter(
      video => !video.isAvailableForSale
    );
    const listForSaleUserOwned: ItemVideo[] = list.filter(
      video => video.isAvailableForSale && video.myVideo
    );

    return (
      <>
        <LayoutScreen
          screenTitle="SHEEN tv"
          screenActionTitle={activeBroadcast && 'View Live Stream'}
          onPressActionButton={() => navigation.navigate('LivestreamUser', {})}
          categoryButtons={categoryButtons}
          currentValue={currentValue}
          onRefresh={() => this.InnitialLoadVideos()}
          onPressButton={(currentValue: string): void => {
            this.setState({
              currentValue,
              activeCategoryLabel: this.getCategoriesTitle(
                currentValue,
                categoryButtons
              )
            });
          }}
        >
          <LayoutMiddleAlignScreen style={[t.mT1, t.pT1]}>
            {list.length === 0 ? (
              <View style={[t.h40, t.justifyCenter, t.itemsCenter]}>
                <Text>There is no video at the moment!</Text>
              </View>
            ) : (
              <>
                <ListVideo
                  paid={false}
                  list={listForSale}
                  onPressItem={this.OnPressItemNotPaid}
                />
                <ListVideo
                  paid
                  list={listForSaleUserOwned}
                  title="My Video"
                  onPressItem={props =>
                    this.OnPressItemAlreadyPaid({
                      ...props,
                      categoryLabel: activeCategoryLabel
                    })
                  }
                />
                <ListVideo
                  paid
                  list={listForFree}
                  title="Free Video"
                  onPressItem={props =>
                    this.OnPressItemAlreadyPaid({
                      ...props,
                      categoryLabel: activeCategoryLabel
                    })
                  }
                />
                {/* <MemoCategoryButtonsList
                  categoryButtons={categoryButtons}
                  currentValue={currentValue}
                  OnPressItemAlreadyPaid={this.OnPressItemAlreadyPaid}
                /> */}
              </>
            )}
          </LayoutMiddleAlignScreen>
        </LayoutScreen>
        <SubscriptionPopup
          isVisible={subscriptionPopup}
          ActionSubscribe={() => {
            this.setState({ subscriptionPopup: false });
            navigation.navigate('SubscriptionTv');
          }}
          ActionCancel={() => this.setState({ subscriptionPopup: false })}
          description="To view this video and gain full access to our exclusive video streaming content, please subscribe"
          period2="month"
          price2="4.99"
          period="year"
          price="49.99"
          user={user}
          navigation={navigation}
        />
        {(isLoading || loader) && <Loading />}
      </>
    );
  }
}

export default connect<
  StateProps,
  ReduxDispatchLivestream,
  undefined,
  ReduxStateRoot
>(
  (state: ReduxStateRoot) => ({
    categories: state.livestream.categories,
    user: state.account.user,
    isLoading: state.loading.isLoading
  }),
  MapDispatchToPropsVideoCategories
)(Home);

const CategoryButtonsList = ({
  categoryButtons,
  currentValue,
  OnPressItemAlreadyPaid
}) =>
  categoryButtons?.map(
    (item, index) =>
      item.comparisonValue != '0' &&
      (item.comparisonValue === currentValue || currentValue === '0') && (
        <RenderSection
          key={index}
          item={item}
          OnPressItemAlreadyPaid={OnPressItemAlreadyPaid}
        />
      )
  );
const MemoCategoryButtonsList = memo(CategoryButtonsList);
