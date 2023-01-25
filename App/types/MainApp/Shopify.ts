type ProductOptions = [
  {
    id: string;
    name: string;
    values: [
      {
        value: string;
        type: {
          name: string;
          kind: string;
        };
      }
    ];
    type: {
      name: string;
      kind: string;
      fieldBaseTypes: {
        name: string;
        values: string;
      };
      implementsNode: boolean;
    };
  }
];

type ProductImages = [
  {
    id: string;
    src: string;
    altText: null;
    width: Number;
    height: Number;
    type: {
      name: string;
      kind: string;
      fieldBaseTypes: {
        altText: string;
        height: string;
        id: string;
        originalSrc: string;
        src: string;
        width: 'Int';
      };
      implementsNode: string;
    };
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    variableValues: {
      first: Number;
    };
  }
];

type ProductType = {
  name: string;
  kind: string;
  fieldBaseTypes: {
    availableForSale: string;
    createdAt: string;
    description: string;
    descriptionHtml: string;
    handle: string;
    id: string;
    images: string;
    onlineStoreUrl: string;
    options: string;
    productType: string;
    publishedAt: string;
    title: string;
    updatedAt: string;
    variants: string;
    vendor: string;
  };
  implementsNode: boolean;
};

type ProductVariants = [
  {
    id: string;
    title: string;
    price: string;
    priceV2: {
      amount: string;
      currencyCode: string;
      type: {
        name: string;
        kind: string;
        fieldBaseTypes: {
          amount: string;
          currencyCode: string;
        };
        implementsNode: boolean;
      };
    };
    weight: Number;
    available: boolean;
    sku: string;
    compareAtPrice: null;
    compareAtPriceV2: null;
    image: {
      id: string;
      src: string;
      altText: null;
      width: Number;
      height: Number;
      type: {
        name: string;
        kind: string;
        fieldBaseTypes: {
          altText: string;
          height: string;
          id: string;
          originalSrc: string;
          src: string;
          width: string;
        };
        implementsNode: boolean;
      };
    };
    selectedOptions: [
      {
        name: string;
        value: string;
        type: {
          name: string;
          kind: string;
          fieldBaseTypes: {
            name: string;
            value: string;
          };
          implementsNode: boolean;
        };
      }
    ];
    unitPrice: null;
    unitPriceMeasurement: {
      measuredType: null;
      quantityUnit: null;
      quantityValue: Number;
      referenceUnit: null;
      referenceValue: Number;
      type: {
        name: string;
        kind: string;
        fieldBaseTypes: {
          measuredType: string;
          quantityUnit: string;
          quantityValue: string;
          referenceUnit: string;
          referenceValue: string;
        };
        implementsNode: boolean;
      };
    };
    type: {
      name: string;
      kind: string;
      fieldBaseTypes: {
        availableForSale: string;
        compareAtPrice: string;
        compareAtPriceV2: string;
        id: string;
        image: string;
        price: string;
        priceV2: string;
        product: string;
        selectedOptions: string;
        sku: string;
        title: string;
        unitPrice: string;
        unitPriceMeasurement: string;
        weight: string;
      };
      implementsNode: boolean;
    };
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    variableValues: {
      first: Number;
    };
  }
];

export type ItemProduct = {
  id: string;
  availableForSale: boolean;
  createdAt: string;
  updateddAt: string;
  descriptionHtml: string;
  description: string;
  handle: string;
  productType: string;
  title: string;
  vendor: string;
  publishedAt: string;
  onlineStoreUrl: string;
  options: ProductOptions;
  images: ProductImages;
  variants: ProductVariants;
  type: ProductType;
  hasNextPage: {
    value: boolean;
  };
  hasPreviousPage: boolean;
  variableValues: {
    first: Number;
  };
};

export type ItemShop = {
  paymentSettings: {
    enabledPresentmentCurrencies: [
      {
        key: string;
        type: {
          name: string;
          kind: string;
        };
      }
    ];
    type: {
      name: string;
      kind: string;
      fieldBaseTypes: {
        enabledPresentmentCurrencies: string;
      };
      implementsNode: boolean;
    };
  };
  description: string;
  moneyFormat: string;
  name: string;
  primaryDomain: {
    host: string;
    sslEnabled: true;
    url: string;
    type: {
      name: string;
      kind: string;
      fieldBaseTypes: {
        host: string;
        sslEnabled: string;
        url: string;
      };
      implementsNode: boolean;
    };
  };
  type: {
    name: string;
    kind: string;
    fieldBaseTypes: {
      description: string;
      moneyFormat: string;
      name: string;
      paymentSettings: string;
      primaryDomain: string;
      privacyPolicy: string;
      refundPolicy: string;
      termsOfService: string;
    };
    implementsNode: boolean;
  };
};
