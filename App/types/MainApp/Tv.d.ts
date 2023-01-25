import { ParamsGetList, ServerResponse } from 'types';

export type CategoryVideo = {
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
};

export type DetailItemVideo = ServerResponse & {
  video: ItemVideo;
};

export type ItemVideo = {
  title: string;
  thumbnail: string;
  url: string;
  description: string;
  totalViews: number;
  author: string;
  isAvailableForSale: boolean;
  myVideo: boolean;
  createdAt: string;
  updatedAt: string;
  videoId: number;
  length: string;
  categories: string[];
};

export type ParamsGetListVideo = ParamsGetList & {
  author?: string;
  title?: string;
  categories?: string;
};
