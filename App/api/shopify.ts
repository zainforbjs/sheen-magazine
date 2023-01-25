import { SHOPIFY_URL_BASE } from 'const/url';
import { ItemProduct, ItemShop } from 'types/MainApp/Shopify';
import api from 'api';

export const GetProducts = (): Promise<ItemProduct[]> => {
  return api.Get<ItemProduct[]>(`${SHOPIFY_URL_BASE}/getProducts`);
};

export const GetShopInfo = (): Promise<ItemShop> => {
  return api.Get<ItemShop>(`${SHOPIFY_URL_BASE}/getShopInfo`);
};

// export const GetCheckout = (checkoutId: string): Promise<CategoryBlog[]> =>
// {
// 	return api.Get<CategoryBlog[]>(`${SHOPIFY_URL_BASE}/getCheckout/${checkoutId}`);
// };

// export const CreateCheckout = (data: {}): Promise<CategoryBlog[]> =>
// {
// 	return api.Post<CategoryBlog[], {}>(`${SHOPIFY_URL_BASE}/createCheckout`, data);
// };

// export const AddLineItem = (data: {}): Promise<CategoryBlog[]> =>
// {
// 	return api.Post<CategoryBlog[], {}>(`${SHOPIFY_URL_BASE}/addLineItem`, data);
// };

// export const RemoveLineItem = (data: {}): Promise<CategoryBlog[]> =>
// {
// 	return api.Post<CategoryBlog[], {}>(`${SHOPIFY_URL_BASE}/removeLineItem`, data);
// };

// export const IncrementLineItem = (data: {}): Promise<CategoryBlog[]> =>
// {
// 	return api.Put<CategoryBlog[], {}>(`${SHOPIFY_URL_BASE}/incrementLineItem`, data);
// };

// export const DecrementLineItem = (data: {}): Promise<CategoryBlog[]> =>
// {
// 	return api.Put<CategoryBlog[], {}>(`${SHOPIFY_URL_BASE}/decrementLineItem`, data);
// };

// export const ProcessCheckout = (data: {}): Promise<CategoryBlog[]> =>
// {
// 	return api.Post<CategoryBlog[], {}>(`${SHOPIFY_URL_BASE}/processCheckouts`, data);
// };
