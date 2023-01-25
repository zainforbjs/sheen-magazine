import React from 'react';
import { NavigationPropsTypeShop } from 'types/navigation/MainApp/shop';
import Header from 'components/Header';
import { ListType } from 'types';

import LayoutScreen from 'components/LayoutScreen';
import LayoutMiddleAlignScreen from 'components/LayoutMiddleAlignScreen';
import LayoutGrid from 'components/LayoutGrid';
import ItemShopGrid from 'features/MainApp/Shop/components/ItemShopGrid';
import IconCart from 'features/MainApp/Shop/components/IconCart';
import { GetCollectsList, GetProducts, ICollectionView } from 'api/shop';
import { Collect, ProductResponseType } from 'types/MainApp/shop';
import Loading from 'components/Loading';
import { Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

type Props = NavigationPropsTypeShop<'Home'>;

type State = ListType<ProductResponseType> & {
  currentValue: string;
  collects: ICollectionView[];
  isLoading: boolean;
};

export default class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { navigation } = props;
    navigation.setOptions({
      header: () => (
        <Header
          headerRight={<IconCart onPress={() => navigation.navigate('Cart')} />}
        />
      )
    });
  }
  state: Readonly<State> = {
    list: [],
    collects: [],
    currentValue: '',
    isLoading: false
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', this.LoadProducts);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.LoadProducts);
  }

  LoadProducts = () => {
    GetCollectsList().then(collects => {
      this.setState({ collects });
    });
    this.setState({ isLoading: true });
    GetProducts().then(list => this.setState({ list, isLoading: false }));
  };

  render(): React.ReactNode {
    const { list, collects, isLoading, currentValue } = this.state;

    const mockValue = {
      title: 'No rain - No Rainbow',
      imageUri:
        'https://www.roddandgunn.com/on/demandware.static/-/Sites-roddandgunn-master-catalog/default/dw42e712d4/images/005608/PP0354_TRUE-NAVY_FT_LGE.jpg',
      type: 'T-shirt',
      price: 24.57
    };

    const mockDataForGrid = new Array(10).fill(mockValue);

    const gridItems: JSX.Element[] = list.map(
      ({ title, image, product_type, variants, options, id }, index) => (
        <ItemShopGrid
          key={index + ''}
          title={title}
          imageUri={image.src}
          type={
            currentValue && currentValue !== 'Home page'
              ? currentValue
              : 'Clothes'
          }
          price={parseInt(variants?.[0]?.price ?? 0)}
          buttonOnPress={() =>
            this.props.navigation.navigate('ProductDetail', {
              title,
              imageUri: image.src,
              type: product_type
                ? product_type
                : currentValue && currentValue !== 'Home page'
                ? currentValue
                : 'Cloths',
              price: parseInt(variants?.[0]?.price ?? 0),
              productId: id
            })
          }
        />
      )
    );

    // const scenesButton: any[] = [
    //   {
    //     label: 'All',
    //     comparisonValue: 'All'
    //   },
    //   {
    //     label: 'T-Shirt',
    //     comparisonValue: 'T-Shirt'
    //   },
    //   {
    //     label: 'Hoodies',
    //     comparisonValue: 'Hoodies'
    //   },
    //   {
    //     label: 'Accessories',
    //     comparisonValue: 'Accessories'
    //   }
    // ];

    return (
      <>
        <LayoutScreen
          categoryButtons={collects}
          screenTitle="Shop"
          currentValue={this.state.currentValue}
          onPressButton={async (currentValue: string): Promise<void> => {
            this.setState({ currentValue, list: [], isLoading: true });
            let findValue = await collects.find(
              val => val.comparisonValue === currentValue
            );
            let url =
              'collections/' + findValue?.collection_id + '/products.json';
            GetProducts(url).then(list =>
              this.setState({ list, isLoading: false })
            );
          }}
        >
          <LayoutMiddleAlignScreen>
            {gridItems.length > 0 ? (
              <LayoutGrid items={gridItems} />
            ) : (
              <View style={[t.flex]}>
                <Text>no item found</Text>
              </View>
            )}
          </LayoutMiddleAlignScreen>
        </LayoutScreen>
        {isLoading && <Loading />}
      </>
    );
  }
}
