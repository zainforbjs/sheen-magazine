import AsyncStorage from '@react-native-async-storage/async-storage';
import { DynamicObject } from 'types';
import RNFetchBlob from 'react-native-blob-util';
import { Platform } from 'react-native';

export function ObjectToUrlParams(object: DynamicObject): string {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    );

  return params.length > 0 ? `?${params.join('&')}` : '';
}

export let isAndroid = Platform.OS === 'android';
export const handleDownload = (pdfDetails, navigation) => {
  //AsyncStorage.removeItem('downloadedPDF');
  return new Promise(async (resolveMain, rejectMain) => {
    let downloadedData = await AsyncStorage.getItem('downloadedPDF');
    downloadedData = downloadedData ? JSON.parse(downloadedData) : [];
    let pdfIndex = await downloadedData.findIndex(
      (item, index) => item.issueId === pdfDetails.issueId
    );
    if (pdfIndex != -1)
      return resolveMain({
        url: downloadedData[pdfIndex].url,
        isDownloaded: true
      });
    // return navigation.navigate('ViewIssue', {
    //   url: downloadedData[pdfIndex].url
    // });
    let coverImagePromise = new Promise((resolve, reject) => {
      RNFetchBlob.config({
        fileCache: true
      })
        .fetch('GET', pdfDetails.coverImage)
        .then(res => {
          // console.log('The file saved to ', res.path());
          resolve(res.path());
        })
        .catch(err => {
          console.log('coverImagePromise err==>', err);
          resolve(null);
        });
    });
    let pdfPromise = new Promise((resolve, reject) => {
      RNFetchBlob.config({
        fileCache: true
      })
        .fetch('GET', pdfDetails.url)
        .then(res => {
          // console.log('The file saved to ', res.path());
          resolve(res.path());
        })
        .catch(err => {
          console.log('pdfPromise err==>', err);
          resolve(null);
        });
    });
    Promise.all([coverImagePromise, pdfPromise]).then(async values => {
      console.log(values);
      let coverImageURL = values[0]
        ? isAndroid
          ? 'file://' + values[0]
          : '' + values[0]
        : null;
      let pdfURL = values[1]
        ? isAndroid
          ? 'file://' + values[1]
          : '' + values[1]
        : null;
      let newObject = {
        ...pdfDetails,
        coverImage: coverImageURL,
        url: pdfURL,
        downloadAt: new Date(),
        paid: true
      };
      await AsyncStorage.setItem(
        'downloadedPDF',
        JSON.stringify([...downloadedData, newObject])
      );
      return resolveMain({ url: pdfURL, isDownloaded: false });
      // navigation.navigate('ViewIssue', { url: pdfURL });
    });
  });
};
