import { GetIssues } from 'api/issues';
import ButtonEclipse from 'components/ButtonEclipse';
import DoubleSubscriptionPopup from 'components/DoubleSubscriptionPopup';
import ImageWithScreen from 'components/ImageWithScreen';
import LayoutGrid from 'components/LayoutGrid';
import LayoutMiddleAlignScreen from 'components/LayoutMiddleAlignScreen';
import Loading from 'components/Loading';
import { paramsGetListDefault } from 'const';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { black, red } from 'styles/colors';
import { aspectRatio } from 'styles/image';
import ItemIssue from './ItemIssue';
import { handleDownload } from 'utilities';
import { useSelector, useDispatch } from 'react-redux';
import { is_downloading } from 'redux/actions/downloading';

export default function AllIssues({ navigation, user }) {
  const userData = Object.assign({}, user);
  const [list, setList] = useState([]);
  const [latest, setLatest] = useState(null);
  const [subscriptionPopup, setSubscriptionPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isdownloading =  useSelector((state) => state.downloading.isdownloading);
  const [currentPage, setCurrentPage] = useState(1);
  const [downloading, setDownloading] = useState(false);
  const [temp, setTemp] = useState(false);

  const dispatch = useDispatch();

  console.log("THIS IS MODAL REDUX :",isdownloading )
  useEffect(() => {
    setIsLoading(true);
    let params = cloneDeep(paramsGetListDefault);
    if (user) {
      params.userId = user.userId;
    }
    params.page = currentPage;
    GetIssues(params).then(list => {
      list = list.reverse();
      setList(list.slice(1, list.length));
      setLatest(list[0]);
      setIsLoading(false);
    });
    return () => {
      setList([]);
      setSubscriptionPopup(false);
      setIsLoading(false);
      setCurrentPage(1);
    };
  }, [navigation]);

  const gridItems: React.ReactNode[] = list?.map((item, index) => {
    const { url, paid, title, dateTitle, coverImage } = item;
    return (
      <ItemIssue
        item={item}
        dateTitle={title}
        pdfUri={url}
        coverImage={coverImage}
        paid={paid}
        user={user}
        navigation={navigation}
        ShowSubscribePopup={() =>
          setSubscriptionPopup({ title, url, dateTitle })
        }
      />
    );
  });

  const accessToIssue: boolean = Boolean(
    latest?.paid || user?.isAdmin || temp || false
  );

  // const accessToIssue: boolean = Boolean(
  //   latest?.paid || user?.isAdmin || user !== undefined
  // );

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <ScrollView nestedScrollEnabled={true}>
        <LayoutMiddleAlignScreen>
          {latest && (
            <View
              style={{
                width: '100%',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  width: '70%'
                }}
              >
                <Text
                  style={[
                    t.textSm,
                    t.mT3,
                    t.mB2,
                    t.fontSemibold,
                    {
                      color: 'rgba(0,0,0,0.5)',
                      textTransform: 'uppercase'
                    }
                  ]}
                >
                  {latest?.title}
                </Text>
                <ImageWithScreen
                  styles={[t.wFull, aspectRatio(3 / 4)]}
                  loaderShow={true}
                  imageUri={
                    latest?.coverImage
                      ? latest?.coverImage
                      : 'http://www.sheenmagazine.com/wp-content/uploads/2021/12/cover-1.png'
                  }
                />
                <Text
                  style={[
                    t.text2xl,
                    t.mT2,
                    t.mB1,
                    t.fontSemibold,
                    { color: 'rgb(0,0,0)' }
                  ]}
                >
                  {latest?.description}
                </Text>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'flex-start'
                  }}
                >
                  {/* {console.log('ACCESS TO ISSUE : ' + accessToIssue)} */}
                  <ButtonEclipse
                    disabled={isdownloading}
                    // color={accessToIssue ? black : red}
                    color={accessToIssue ? black : red}
                    textStyle={[t.textXs, t.fontBold, t.pX1]}
                    style={[
                      t.pX1,
                      t.mB4,
                      t.mT3,
                      t.pX5,
                      {
                        minWidth: '40%',
                        height: 30
                      }
                    ]}
                    // text={
                    //   downloading
                    //     ? 'Downloading...'
                    //     : accessToIssue
                    //     ? 'View'
                    //     : 'Subscribe'
                    // }
                    text={
                      isdownloading
                        ? 'Downloading...'
                        : accessToIssue
                        ? 'View'
                        : 'Subscribe'
                    }
                    // onPress={() => {
                    //   if (accessToIssue) {
                    //     Alert.alert(
                    //       'Info',
                    //       'Are you want to download this file(150 MB)',
                    //       [
                    //         {
                    //           text: 'Yes',
                    //           onPress: () => {
                    //             setDownloading(true);
                    //             handleDownload(latest, navigation).then(
                    //               response => {
                    //                 let { url, isDownloaded } = response;
                    //                 setDownloading(false);
                    //                 if (isDownloaded)
                    //                   navigation.navigate('ViewIssue', {
                    //                     url,
                    //                     title: latest?.title
                    //                   });
                    //               }
                    //             );
                    //           }
                    //         },
                    //         {
                    //           text: 'No',
                    //           onPress: () =>
                    //             navigation.navigate('ViewIssue', {
                    //               url: latest?.url,
                    //               title: latest?.title
                    //             })
                    //         }
                    //       ]
                    //     );
                    //   } else setSubscriptionPopup(true);
                    // }}
                    onPress={() => {
                      if (accessToIssue) {
                        Alert.alert(
                          'Info',
                          'Are you want to download this file(150 MB)',
                          [
                            {
                              text: 'Yes',
                              onPress: () => {                          
                                dispatch(is_downloading(true));
                                handleDownload(latest, navigation).then(
                                  response => {
                                    let { url, isDownloaded } = response;
                                    dispatch(is_downloading(false));
                                    if (!isDownloaded)
                                      navigation.navigate('ViewIssue', {
                                        url,
                                        title: latest?.title,
                                        description: latest?.description
                                      });
                                  }
                                );
                              }
                            },
                            {
                              text: 'No',
                              onPress: () =>
                                navigation.navigate('ViewIssue', {
                                  url: latest?.url,
                                  title: latest?.title,
                                  description: latest?.description
                                })
                            }
                          ]
                        );
                      } else setSubscriptionPopup(true);
                    }}
                  />
                </View>
              </View>
            </View>
          )}
          <LayoutGrid items={gridItems} />
        </LayoutMiddleAlignScreen>
      </ScrollView>
      <DoubleSubscriptionPopup
        isVisible={subscriptionPopup}
        ActionSubscribe={() => {
          setSubscriptionPopup(false);
          setTemp(true);
          // navigation.navigate('SubscriptionTv');
        }}
        homeSubscribe={false}
        ActionCancel={() => setSubscriptionPopup(false)}
        description="To view this issue and gain full access choose a subscription"
        period="Issue"
        price="5.99"
        price2="14.99"
        period2="Year for 6 Issues"
        user={user}
        navigation={navigation}
      />
      {isLoading && <Loading />}
    </View>
  );
}