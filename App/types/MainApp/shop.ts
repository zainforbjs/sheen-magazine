export interface Variant {
  id: any;
  product_id: any;
  title: string;
  price: string;
  sku: string;
  position: number;
  inventory_policy: string;
  compare_at_price?: any;
  fulfillment_service: string;
  inventory_management: string;
  option1: string;
  option2?: any;
  option3?: any;
  created_at: Date;
  updated_at: Date;
  taxable: boolean;
  barcode: string;
  grams: number;
  image_id?: any;
  weight: number;
  weight_unit: string;
  inventory_item_id: any;
  inventory_quantity: number;
  old_inventory_quantity: number;
  requires_shipping: boolean;
  admin_graphql_api_id: string;
}

export interface Option {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

export interface Image {
  id: number;
  product_id: number;
  position: number;
  created_at: Date;
  updated_at: Date;
  alt?: any;
  width: number;
  height: number;
  src: string;
  variant_ids: any[];
  admin_graphql_api_id: string;
}

export interface Image2 {
  id: number;
  product_id: number;
  position: number;
  created_at: Date;
  updated_at: Date;
  alt?: any;
  width: number;
  height: number;
  src: string;
  variant_ids: any[];
  admin_graphql_api_id: string;
}

export interface ProductResponseType {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: Date;
  handle: string;
  updated_at: Date;
  published_at: Date;
  template_suffix: string;
  status: string;
  published_scope: string;
  tags: string;
  admin_graphql_api_id: string;
  variants: Variant[];
  options: Option[];
  images: Image[];
  image: Image2;
}
export interface Collect {
  id: number;
  collection_id: number;
  product_id: number;
  created_at: Date;
  updated_at: Date;
  position: number;
  sort_value: string;
}

export interface Collection {
  id: number;
  handle: string;
  title: string;
  updated_at: Date;
  body_html: string;
  published_at: Date;
  sort_order: string;
  template_suffix: string;
  products_count: number;
  collection_type: string;
  published_scope: string;
  admin_graphql_api_id: string;
}

export interface CollectionResponse {
  collection: Collection;
}
