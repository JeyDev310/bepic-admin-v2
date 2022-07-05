import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components';
import SubMenu from './SubMenu';
import InventoryLevelsSubPage from './levels/InventoryLevelsSubPage';
import InventoryLogsSubPage from './logs/InventoryLogsSubPage';
import DailyUnitNumbersSub from './dailyUnitNumbers/DailyUnitNumbersSubPage';
import { getDistCentersApi } from '@/services/distCenters';
import { getProductApi } from '@/services/products/product';

const InventoryPage = () => {
  const [tab, setTab] = useState('Inventory Levels');
  const [isLoading, setIsLoading] = useState(false);
  const [distCenters, setDistCenters] = useState([]);
  const [products, setProducts] = useState([]);
  const onGetDistCenters = (tableData_) => {
    const disCenter = tableData_.data.map((item) => {
      return { value: item.id, label: item.name };
    });
    setDistCenters(disCenter);
    setIsLoading(false);
  };

  const onFailDistCenters = () => {
    setIsLoading(false);
  };

  const loadDistCenters = (param) => {
    setIsLoading(true);
    getDistCentersApi(param, onGetDistCenters, onFailDistCenters);
  };

  const onGetProducts = (tableData_) => {
    const product = tableData_.data.data.map((item) => {
      return { ...item, value: item.id, label: item.title };
    });
    setProducts(product);
  };

  const onFailProducts = () => {};

  const loadProducts = (param) => {
    getProductApi(param, onGetProducts, onFailProducts);
  };

  useEffect(() => {
    loadDistCenters('');
    loadProducts('list');
  }, []);

  return (
    <PageContainer>
      <SubMenu tab={tab} setTab={setTab} />
      {tab === 'Inventory Levels' && (
        <InventoryLevelsSubPage
          distCenters={distCenters}
          isLoading={isLoading}
          products={products}
        />
      )}
      {tab === 'Inventory Logs' && (
        <InventoryLogsSubPage distCenters={distCenters} products={products} />
      )}
      {tab === 'Daily Unit Numbers' && <DailyUnitNumbersSub />}
    </PageContainer>
  );
};

export default InventoryPage;
