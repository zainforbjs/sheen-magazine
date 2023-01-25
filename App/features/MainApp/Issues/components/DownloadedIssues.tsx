import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonEclipse from 'components/ButtonEclipse';
import ImageWithScreen from 'components/ImageWithScreen';
import LayoutGrid from 'components/LayoutGrid';
import LayoutMiddleAlignScreen from 'components/LayoutMiddleAlignScreen';
import Loading from 'components/Loading';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { black, red } from 'styles/colors';
import { aspectRatio } from 'styles/image';
import ItemIssue from './ItemIssue';

export default function DownloadedIssues({ navigation, user }) {
  const [list, setList] = useState([]);
  const [latest, setLatest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    AsyncStorage.getItem('downloadedPDF').then(response => {
      let downloadedList = response ? JSON.parse(response) : [];
      setList(downloadedList.slice(1, downloadedList.length));
      setLatest(downloadedList[0]);
      setIsLoading(false);
    });
    return () => {
      setList([]);
      setIsLoading(false);
    };
  }, [navigation]);

  const gridItems: React.ReactNode[] = list?.map((item, index) => {
    let { url, paid, title, dateTitle, coverImage } = item;
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
  const accessToIssue: boolean = Boolean(latest?.paid || user?.isAdmin);
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
                  <ButtonEclipse
                    onPress={() => {
                      // AsyncStorage.removeItem('downloadedPDF');
                      // console.log('latest?.url==>', latest?.url);
                      navigation.navigate('ViewIssue', {
                        url: latest?.url,
                        title: latest?.title,
                        description: latest?.description
                      });
                    }}
                    color={accessToIssue ? black : red}
                    text={'View'}
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
                  />
                </View>
              </View>
            </View>
          )}
          <LayoutGrid items={gridItems} />
        </LayoutMiddleAlignScreen>
      </ScrollView>
      {isLoading && <Loading />}
    </View>
  );
}
