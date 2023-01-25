import api from 'api';
import { Platform } from 'react-native';
import {
  ItemLivestream,
  ServerResponseLivestreamActiveBroadcast,
  ServerResponseLivestreamApplicationId
} from 'types/MainApp/Livestream';

export const GetAppId = async (): Promise<string | undefined> => {
  const appId: string | undefined = Platform.select({
    ios: 'aieqWtOSVnqravQhpapykw',
    android: '80Lb7IHDKRkR9DBgKPxKRw',
    web: 'jB2lPy8knaSHUSOubmvyFg'
  });

  const response: ServerResponseLivestreamApplicationId = await {
    message: 'Retrieved application id with success.',
    applicationId: appId
  };

  return response.applicationId;
};

export const GetActiveBroadcast = async (): Promise<ItemLivestream> => {
  try {
    const response: ServerResponseLivestreamActiveBroadcast =
      await api.Get<ServerResponseLivestreamActiveBroadcast>(
        `${URL_VIDEOS}/getActiveBroadcast`
      );
    return {
      ...response.payload,
      created: response.createdAt
    };
  } catch (error: Error | any) {
    throw new Error(error);
  }
};
