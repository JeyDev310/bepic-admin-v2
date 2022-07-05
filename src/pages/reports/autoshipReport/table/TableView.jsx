import React from 'react';

import { TablePanel } from '@/components';
import { t } from '@/utils/label';
import { asDate, asPrice } from '@/utils/text';

export default function TableView(props) {
  // table columns: date, success_amount, failed_amount, success_pv, failed_pv, success_cv, success_cv, action
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <div>{asDate(text)}</div>,
    },
    {
      title: 'Success amount',
      dataIndex: 'success_amount',
      key: 'success_amount',
      render: (text) => <div>{asPrice(text)}</div>,
    },
    {
      title: 'Failed amount',
      dataIndex: 'failed_amount',
      key: 'failed_amount',
      render: (text) => <div>{asPrice(text)}</div>,
    },
    {
      title: 'Success pv',
      dataIndex: 'success_pv',
      key: 'success_pv',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Failed Pv',
      dataIndex: 'failed_pv',
      key: 'failed_pv',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Success Cv',
      dataIndex: 'success_cv',
      key: 'success_cv',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Failed Cv',
      dataIndex: 'failed_cv',
      key: 'failed_cv',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Action',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <a onClick={() => props.setSelectedDate(text)}>detail</a>,
    },
  ];

  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTable(paginationParam);
  };

  return (
    <TablePanel
      data={props.tableData}
      title={t('autoshipreport', 'Autoship Report')}
      applyPadding
      columns={columns}
      onPageChange={onPageChange}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  );
}
