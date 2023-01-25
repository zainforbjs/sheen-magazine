import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { adapty, AdaptyPaywall } from 'react-native-adapty';

const AdaptyPay: React.FC = () => {
  const [paywall, setPaywall] = useState<AdaptyPaywall | undefined>();

  useEffect(() => {
    async function fetchPaywall() {
      const { paywalls } = await adapty.paywalls.getPaywalls();
      const bestPaywall = paywalls.find(
        paywall => paywall.developerId === 'testWall'
      );
      console.log(
        'Debug :::> File: index.tsx, Line : 18, bestPaywall :::>',
        JSON.stringify(bestPaywall)
      );
      setPaywall(bestPaywall);
    }
    fetchPaywall();
  }, []);

  function renderProducts() {
    if (!paywall) {
      return null;
    }

    return paywall.products.map(product => (
      <Text>{product.vendorProductId}</Text>
    ));
  }

  return <View>{renderProducts()}</View>;
};

export default AdaptyPay;
