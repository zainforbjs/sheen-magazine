import { URL_WORDPRESS } from 'const/url';
import {
  CategoryBlog,
  ItemBlog,
  CommentBlog,
  TagBlog
} from 'types/MainApp/Blog';
import api from 'api';

export const GetPosts = (url: string | null = null): Promise<ItemBlog[]> => {
  let newUrl = `${URL_WORDPRESS}/posts`;
  if (url) newUrl = newUrl + url;
  console.log('newUrl==>', newUrl);
  return api.Get<ItemBlog[]>(newUrl);
};

export const GetPostDetails = (id: number): Promise<ItemBlog> => {
  return api.Get<ItemBlog>(`${URL_WORDPRESS}/posts/${id}`);
};

export const GetCategories = (): Promise<CategoryBlog[]> => {
  return api.Get<CategoryBlog[]>(`${URL_WORDPRESS}/categories`);
};

export const GetTags = (tagIds: number[]): Promise<TagBlog[]> => {
  const params: Object = {
    include: tagIds.join(',')
  };
  return api.Get(`${URL_WORDPRESS}/tags`, { params });
};

type CommentParams = {
  post: number;
  page?: number;
};
export const GetComments = (params: CommentParams): Promise<CommentBlog[]> => {
  params.page = params.page ?? 1;
  return api.Get(`${URL_WORDPRESS}/comments`, { params });
};
