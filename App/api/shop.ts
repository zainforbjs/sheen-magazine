import api from 'api';
import { NEW_SHOPIFY_URL_BASE, URL_ISSUES } from 'const/url';
import { ServerResponse } from 'types';
import {
  Collect,
  Collection,
  CollectionResponse,
  ProductResponseType
} from 'types/MainApp/shop';
export interface ICollectionView {
  label: string;
  comparisonValue: string;
  collection_id: number;
}
type ProductResponse = ServerResponse & {
  products: ProductResponseType[];
};

type ProductDetailResponse = ServerResponse & {
  product: ProductResponseType;
};

type CollectionsList = ServerResponse & {
  collects: Collect[];
};

export const GetProducts = async (url: string = ""): Promise<ProductResponseType[]> => {
  let newURL = NEW_SHOPIFY_URL_BASE + "/products.json";
  if (url) newURL = NEW_SHOPIFY_URL_BASE + url;
  const response: ProductResponse = await api.Get<ProductResponse>(
    newURL,
    {
      headers: {
        'X-Shopify-Access-Token': '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'
      }
    }
  );
  return response.products;
};

export const GetProductDetail = async (
  productId: number
): Promise<ProductResponseType> => {
  const response: ProductDetailResponse = await api.Get<ProductDetailResponse>(
    `${NEW_SHOPIFY_URL_BASE}/products/${productId}.json`,
    {
      headers: {
        'X-Shopify-Access-Token': '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'
      }
    }
  );
  return response.product;
};

export const GetCollectsList = async (): Promise<ICollectionView[]> => {
  const response: CollectionsList = await api.Get<CollectionsList>(
    `${NEW_SHOPIFY_URL_BASE}/custom_collections.json`,
    {
      headers: {
        'X-Shopify-Access-Token': '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'
      }
    }
  );
  let allCollections: ICollectionView[] = [];
  await Promise.all(
    response.custom_collections.map(async collect => {
      //   let collectionDetails = await GetCollectionDetail(collect.collection_id);
      if (collect)
        allCollections.push({
          comparisonValue: collect.title,
          label: collect.title,
          collection_id: collect.id
        });
    })
  );

  return allCollections;
};

export const GetCollectionDetail = async (
  collectionId: number
): Promise<Collection> => {
  const response: CollectionResponse = await api.Get<CollectionResponse>(
    `${NEW_SHOPIFY_URL_BASE}/collections/${collectionId}.json`,
    {
      headers: {
        'X-Shopify-Access-Token': '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'
      }
    }
  );

  return response.collection;
};
