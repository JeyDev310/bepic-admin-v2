/* eslint-disable no-script-url */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { EllipsisOutlined, LoadingOutlined } from '@ant-design/icons';
import { Menu, Dropdown, notification } from '@/components';
import {
  refundOrderApi,
  cancelOrderApi,
  reshipOrderApi,
  chargebackOrderApi,
  flagOrderApi,
  unflagOrderApi,
} from '@/services/userSearch/orderHistory';

export default function ActionBtn(props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const onDonReship = () => {
    notification.success({
      message: 'Success',
      description: 'Order reshipped',
    });
    setIsUpdating(false);
    props.onSearch();
  };
  const onFailReship = () => {
    setIsUpdating(false);
  };
  const handleReship = () => {
    setIsUpdating(true);
    reshipOrderApi(props.userId, props.data.id, onDonReship, onFailReship);
  };

  const onDoneCancel = () => {
    notification.success({
      message: 'Success',
      description: 'Order cancelled',
    });
    setIsUpdating(false);
    props.onSearch();
  };
  const onFailCancel = () => {
    setIsUpdating(false);
  };
  const handleCancel = () => {
    setIsUpdating(true);
    cancelOrderApi(props.userId, props.data.id, onDoneCancel, onFailCancel);
  };

  const onDoneChargeback = () => {
    notification.success({
      message: 'Success',
      description: 'Order chargebacked',
    });
    setIsUpdating(false);
    props.onSearch();
  };
  const onFailChargeback = () => {
    setIsUpdating(false);
  };
  const handleChargeback = () => {
    setIsUpdating(true);
    chargebackOrderApi(props.userId, props.data.id, onDoneChargeback, onFailChargeback);
  };

  const onDoneRefund = () => {
    notification.success({
      message: 'Success',
      description: 'Order refunded',
    });
    setIsUpdating(false);
    props.onSearch();
  };
  const onFailRefund = () => {
    setIsUpdating(false);
  };
  const handleRefund = () => {
    setIsUpdating(true);
    refundOrderApi(props.userId, props.data.id, onDoneRefund, onFailRefund);
  };

  const onDoneFlag = () => {
    notification.success({
      message: 'Success',
      description: 'Order flagged',
    });
    setIsUpdating(false);
    props.onSearch();
  };
  const onFailFlag = () => {
    setIsUpdating(false);
  };
  const handleFlag = () => {
    setIsUpdating(true);
    flagOrderApi(props.userId, props.data.id, onDoneFlag, onFailFlag);
  };

  const onDoneUnflag = () => {
    notification.success({
      message: 'Success',
      description: 'Order unflagged',
    });
    setIsUpdating(false);
    props.onSearch();
  };
  const onFailUnflag = () => {
    setIsUpdating(false);
  };
  const handleUnflag = () => {
    setIsUpdating(true);
    unflagOrderApi(props.userId, props.data.id, onDoneUnflag, onFailUnflag);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a href="javascript:void(0)" onClick={handleReship}>
          Reship
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="javascript:void(0)" onClick={handleCancel}>
          Cancel
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="javascript:void(0)" onClick={handleRefund}>
          Refund
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="javascript:void(0)" onClick={handleChargeback}>
          Chargeback
        </a>
      </Menu.Item>
      {props.data.is_flagged === 2 && (
        <Menu.Item>
          <a href="javascript:void(0)" onClick={handleFlag}>
            Flag
          </a>
        </Menu.Item>
      )}
      {props.data.is_flagged === 1 && (
        <Menu.Item>
          <a href="javascript:void(0)" onClick={handleUnflag}>
            Unflag
          </a>
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} placement="bottomRight">
      {isUpdating ? <LoadingOutlined /> : <EllipsisOutlined style={{ fontSize: 22 }} />}
    </Dropdown>
  );
}
