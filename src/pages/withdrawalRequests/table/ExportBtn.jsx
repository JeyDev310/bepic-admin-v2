import React, { useState } from 'react';
import { Popconfirm, OutlineBtn } from '@/components';
import { t } from '@/utils/label';
import { withdrawRequestExportApi } from '@/services/withdrawRequest';

export default function ExportBtn() {
  const [isUpdating, setIsUpdating] = useState(false);

  const onDoneUpdate = (data) => {
    setIsUpdating(false);
    window.open(data.csv_file, '_target');
  };

  const onFailUpdate = () => {
    setIsUpdating(false);
  };

  const handleExport = () => {
    setIsUpdating(true);
    withdrawRequestExportApi(onDoneUpdate, onFailUpdate);
  };

  return (
    <Popconfirm onConfirm={handleExport}>
      <OutlineBtn loading={isUpdating}>{t('common.label.export', 'Export')}</OutlineBtn>
    </Popconfirm>
  );
}
