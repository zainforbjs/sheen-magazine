import AsyncStorage from '@react-native-async-storage/async-storage';
import { createThumbnail, Thumbnail } from 'react-native-create-thumbnail';
import { cloneDeep } from 'lodash';
import { URL_VIDEOS } from 'const/url';
import { DATE_FORMAT, paramsGetListDefault } from 'const';
import {
  ParamsGetList,
  ServerResponse,
  SubscriptionCurrentResponse,
  SubscriptionsResponse,
  SubscriptionStatus
} from 'types';
import { CategoryVideo, ItemVideo, ParamsGetListVideo } from 'types/MainApp/Tv';
import api from 'api';
import { Moment } from 'moment';

type VideosResponse = ServerResponse & {
  videos: ItemVideo[];
};

type VideoIdPostType = {
  videoId: number;
};

type VideoViewResponse = ServerResponse & {
  views: number;
};

type VideoResponse = ServerResponse & {
  video: ItemVideo;
};

type CategoryVideoResponse = ServerResponse & {
  categories: CategoryVideo[];
};

export const GetVideoCategories = async (): Promise<CategoryVideo[]> => {
  let endOfPage: boolean = false;
  let params: ParamsGetList = cloneDeep(paramsGetListDefault);
  let currentResult: CategoryVideo[] = [];
  while (!endOfPage) {
    const response: CategoryVideoResponse =
      await api.Get<CategoryVideoResponse>(`${URL_VIDEOS}/getCategories`, {
        params
      });
    if (response.categories.length) {
      currentResult = currentResult.concat(response.categories);
    } else {
      endOfPage = true;
    }
    params.page++;
  }
  return currentResult;
};

const CreateNewVideoThumbnail = async (
  videoId: number,
  url: string
): Promise<string> => {
  try {
    const thumbnail: Thumbnail = await createThumbnail({
      url: url,
      timeStamp: 5000
    });

    if (thumbnail) {
      AsyncStorage.setItem(
        `video-videoId-${videoId}`,
        JSON.stringify(thumbnail)
      );
      return thumbnail.path;
    } else {
      throw Error('create new video thumbnail error');
    }
  } catch (exception: Error | any) {
    return '';
  }
};

export const GetItemVideoThumbnail = async (
  videoId: number,
  url: string
): Promise<string> => {
  try {
    let videoThumbnailString: string =
      (await AsyncStorage.getItem(`video-videoId-${videoId}`)) ?? '';
    if (!videoThumbnailString) {
      videoThumbnailString = await CreateNewVideoThumbnail(videoId, url);
    }
    const videoThumbnailResponse: Thumbnail = JSON.parse(videoThumbnailString);
    return videoThumbnailResponse.path;
  } catch {
    return await CreateNewVideoThumbnail(videoId, url);
  }
};

export const GetVideos = async (
  params: ParamsGetListVideo
): Promise<ItemVideo[]> => {
  params.page = params.page ?? 1;
  const response: VideosResponse = await api.Get<VideosResponse>(
    `${URL_VIDEOS}/getVideos`,
    { params }
  );
  return response.videos;
};

export const LoadVideoById = async (id: number) => {
  UpdateVideoViewById(id);
  return GetVideoById(id);
};

export const UpdateVideoViewById = async (videoId: number): Promise<number> => {
  await api.Put<VideoViewResponse, VideoIdPostType>(
    `${URL_VIDEOS}/updateViews/`,
    { videoId }
  );
  return videoId;
};

export const GetVideoById = async (id: number): Promise<ItemVideo> => {
  const response: VideoResponse = await api.Get<VideoResponse>(
    `${URL_VIDEOS}/getVideo/${id}`
  );
  return response.video;
};

export const GetCurrentVideoSubscription = async (
  userId: number
): Promise<SubscriptionCurrentResponse> => {
  const promiseCurrentSubscription: Promise<SubscriptionsResponse> = api
    .Get<SubscriptionsResponse>(`${URL_VIDEOS}/getSubscriptions`, {
      params: { ...paramsGetListDefault, userId }
    })
    .catch(() => Promise.resolve({ message: '', subscriptions: [] }));
  const promiseSubscriptionStatus: Promise<SubscriptionStatus> = api
    .Get<SubscriptionStatus>(`${URL_VIDEOS}/getSubscriptionStatus`, {
      params: { userId }
    })
    .catch(() => Promise.resolve({ subscriptionStatus: '' }));
  return {
    status: (await promiseSubscriptionStatus).subscriptionStatus,
    subscription: (await promiseCurrentSubscription).subscriptions[0]
  };
};

export const CreateVideoSubscription = async (
  userId: number
): Promise<void> => {
  await api.Post(`${URL_VIDEOS}/createSubscription`, { userId });
};

export const UpdateVideoSubscription = async (
  userId: number,
  startDate: Moment
): Promise<void> => {
  await api.Put(`${URL_VIDEOS}/updateSubscription`, {
    userId,
    startDate: startDate.format(DATE_FORMAT)
  });
};
