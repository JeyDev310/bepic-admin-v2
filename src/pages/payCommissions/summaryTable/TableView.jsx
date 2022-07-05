/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';
import { TablePanel, Popconfirm, OutlineBtn } from '@/components';
import { asPrice, asDate } from '@/utils/text';
import TableHead from './TableHead';

export default function TableView(props) {

  const columns = [
    {
      title: t('common.table.payoutPeriod', 'Payout Period'),
      dataIndex: 'from',
      key: 'from',
      render: (_, record) => <span>{`${asDate(record.from)} ~ ${asDate(record.to)}`}</span>,
    },
    {
      title: t('common.table.paidDate', 'Paid Date' ),
      dataIndex: 'paid_at',
      key: 'paid_at',
      render: (text) => <span>{asDate(text)}</span>,
    },
    {
      title: t('common.table.paidAmount', 'Paid Amount' ),
      dataIndex: 'paid_amount',
      key: 'paid_amount',
      render: (text) => <span>{asPrice(text)}</span>
    },
    {
      title: t('common.table.salesAmount', 'Sales Amount'),
      dataIndex: 'sales_amount',
      key: 'sales_amount',
      render: (text) => <span>{asPrice(text)}</span>
    },
    {
      title: t('common.table.pv','PV'),
      dataIndex: 'pv',
      key: 'pv',
    },
    {
      title: t('common.table.cv', 'CV' ),
      dataIndex: 'cv',
      key: 'cv',
    },{
      title: t('common.table.action', 'Action'),
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        return (
          <span>
            <Popconfirm
              title={'Are you sure ?'}
              onConfirm={() => props.payCommission(id)}
              okText="Yes"
              placement="top"
              cancelText="No"
            >
              <OutlineBtn loading={props.isLoadingPay && id === props.payoutId} style={{ marginRight: 10 }}>Pay</OutlineBtn>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTable(paginationParam, props.searchParam);
  };

  return (
    <TablePanel
      data={props.tableData}
      title={t('pages.payCommission.payCommissionLabel', 'Pending Payouts')}
      toolbar={
        <TableHead
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
          paginationParam={props.paginationParam}
          loadTable={props.loadTable}
        />
      }
      applyPadding
      columns={columns}
      onPageChange={onPageChange}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  );
}
