import React, { useState } from 'react';
import { Popconfirm, OutlineBtn } from '@/components';
import { t } from '@/utils/label';
import { withdrawRequestPayApi } from '@/services/withdrawRequest';

export default function PayBtn(props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const onDoneUpdate = () => {
    props.reloadTable();
    setIsUpdating(false);
  };

  const onFailUpdate = () => {
    setIsUpdating(false);
  };

  const handlePay = () => {
    setIsUpdating(true);
    withdrawRequestPayApi(onDoneUpdate, onFailUpdate);
  };

  return (
    <Popconfirm onConfirm={handlePay}>
      <OutlineBtn loading={isUpdating}>{t('common.label.pay', 'Pay')}</OutlineBtn>
    </Popconfirm>
  );
}
