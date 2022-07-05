/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { OutlineBtn, Col, Row, UserStatusBadge, TablePanel, Space, Popconfirm } from '@/components';
import { asPrice } from '@/utils/text';
import {
  getProductApi,
  // deleteProductApi,
  changeStatusProductApi,
  restoreProductApi,
} from '@/services/products/product';
import { Link } from 'react-router-dom';
import styles from './ProductsPage.less';
import DummyImage from '@/assets/images/download.png';
import { varLabel, varValue } from '@/common/var';

const ProductListTable = ({ searchData }) => {
  const columns = [
    {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (_, record) => (
        <div className={styles.avatarContainer}>
          <div className={styles.avatarImage}>
            <img src={record.image || DummyImage} className={`${styles.productImage}`} />
          </div>
          {record.title}
        </div>
      ),
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Path',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: 'Member Price',
      dataIndex: 'member_price',
      key: 'member_price',
      render: (text) => {
        return <span>{asPrice(text)}</span>;
      },
    },
    {
      title: 'Retail Price',
      dataIndex: 'retail_price',
      key: 'retail_price',
      render: (text) => {
        return <span>{asPrice(text)}</span>;
      },
    },
    {
      title: 'Pv',
      dataIndex: 'pv',
      key: 'pv',
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: 'Cv',
      dataIndex: 'cv',
      key: 'cv',
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: 'Cost',
      dataIndex: 'cost_of_goods',
      key: 'cost_of_goods',
      render: (text) => {
        return <span>{asPrice(text)}</span>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return (
          <UserStatusBadge
            status={view.value === 'deleted' ? 'deleted' : varLabel('product.status', text)}
          />
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space size={10}>
          {view.value === 'deleted' ? (
            <>
              <Popconfirm
                title={'Are you sure ?'}
                onConfirm={() => handleRestore(record.id)}
                okText="Yes"
                placement="top"
                cancelText="No"
              >
                <OutlineBtn loading={isLoadingDelete && record.id === productId} danger>
                  Resotre
                </OutlineBtn>
              </Popconfirm>
            </>
          ) : (
            <>
              {record.status === 1 ? (
                <Popconfirm
                  title={'Are you sure ?'}
                  onConfirm={() => changeActiveState(record.id, record.status)}
                  okText="Yes"
                  placement="top"
                  cancelText="No"
                >
                  <OutlineBtn
                    style={{ minWidth: 100 }}
                    loading={isLoadingStatus && record.id === productId}
                    danger
                  >
                    Deactivate
                  </OutlineBtn>
                </Popconfirm>
              ) : (
                <Popconfirm
                  title={'Are you sure ?'}
                  onConfirm={() => changeActiveState(record.id, record.status)}
                  okText="Yes"
                  placement="top"
                  cancelText="No"
                >
                  <OutlineBtn
                    style={{ minWidth: 100 }}
                    loading={isLoadingStatus && record.id === productId}
                    success
                  >
                    Activate
                  </OutlineBtn>
                </Popconfirm>
              )}
              <Link to={`/products/edit/${record.id}`} className={`ant-btn ${styles.editLink}`}>
                Edit
              </Link>
              {/*
              <Popconfirm
                title={'Are you sure ?'}
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                placement="top"
                cancelText="No"
              >
                <OutlineBtn loading={isLoadingDelete && (record.id === productId)} danger>Delete</OutlineBtn>
              </Popconfirm>
              */}
            </>
          )}
        </Space>
      ),
    },
  ];
  // We can store this object in DB if we want config it like cms
  const headerTab = [
    { value: 'all', label: 'All Products', params: { status: '' } },
    { value: 'active', label: 'Active', params: { status: 1 } },
    { value: 'hidden', label: 'Hidden', params: { status: 2 } },
    { value: 'featured', label: 'Featured', params: { is_featured: 1 } },
    { value: 'bestSeller', label: 'Best Seller', params: { is_best_seller: 1 } },
    { value: 'newArrival', label: 'New Arrival', params: { is_new: 1 } },
    // { value: 'deleted', label: 'Deleted', params: { title: '' } },
  ];
  const [productsData, setProductsData] = useState([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [productId, setProductId] = useState(null);
  const [view, setView] = useState(headerTab[0]);

  const onChangeActiveState = () => {
    setIsLoadingStatus(false);
    setProductId(null);
    search();
  };

  const onFailChangeActiveState = () => {
    setProductId(null);
    setIsLoadingStatus(false);
  };

  const changeActiveState = (product_id, status) => {
    setIsLoadingStatus(true);
    setProductId(product_id);
    changeStatusProductApi(
      product_id,
      {
        status:
          varLabel('product.status', status) === 'active'
            ? varValue('product.status', 'hidden')
            : varValue('product.status', 'active'),
      },
      onChangeActiveState,
      onFailChangeActiveState,
    );
  };

  /*
  const onDeleteProduct = () => {
    setProductId(null)
    setIsLoadingDelete(false);
    search();
  };

  const onFailDeleteProduct = () => {
    setProductId(null)
    setIsLoadingDelete(false);
  };

  const handleDelete = (product_id) => {
    setIsLoadingDelete(true);
    setProductId(product_id)
    deleteProductApi(product_id, onDeleteProduct, onFailDeleteProduct);
  };
  */

  const onRestoreProduct = () => {
    setProductId(null);
    setIsLoadingDelete(false);
    search();
  };

  const onFailRestoreProduct = () => {
    setProductId(null);
    setIsLoadingDelete(false);
  };

  const handleRestore = (product_id) => {
    setIsLoadingDelete(true);
    setProductId(product_id);
    restoreProductApi(product_id, onRestoreProduct, onFailRestoreProduct);
  };

  const handleLoadProduct = (resp) => {
    const { data } = resp;
    setProductsData(data.data);
    setIsLoadingTable(false);
  };

  const onLoadProductFailure = () => {
    setIsLoadingTable(false);
  };

  const search = () => {
    let filter = Object.keys(view.params)
      .map((key) => `filter[${key}]=${view.params[key]}`)
      .join('&');
    if (searchData) {
      filter = `filter[title]=${searchData}&${filter}`;
    }
    let queryParams = '';
    if (view.value === 'deleted') {
      queryParams = 'deleted=1';
    } else {
      queryParams = 'deleted=2';
    }
    setIsLoadingTable(true);
    getProductApi(`?${queryParams}&&${filter}`, handleLoadProduct, onLoadProductFailure);
  };

  useEffect(() => {
    search();
  }, [searchData, view.value]);

  function handleViewChange(value) {
    setView(value);
  }

  const Header = (props) => {
    return (
      <div className="header-tab">
        <div className="tabs">
          {headerTab.map((tab) => (
            <a
              className={props.view.value === tab.value ? 'active' : ''}
              onClick={() => props.handleViewChange(tab)}
              key={tab.value}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </div>
    );
  };
  return (
    <>
      <Row gutter={[24, 0]} className="product-table-container">
        <Col xs={24}>
          <TablePanel
            data={productsData}
            headerTabs={<Header view={view} handleViewChange={handleViewChange} />}
            columns={columns}
            loading={isLoadingTable}
          />
        </Col>
      </Row>
    </>
  );
};

export default ProductListTable;
