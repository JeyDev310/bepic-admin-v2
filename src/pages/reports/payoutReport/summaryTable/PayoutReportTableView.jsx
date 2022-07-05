/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { t } from '@/utils/label';
import { TablePanel, OutlineBtn, Space } from '@/components';
import { asDate, asPrice } from '@/utils/text';
import PayoutReportTableHead from './PayoutReportTableHead';

export default function PayoutReportTableView(props) {
  const columns = [
    {
      title: t('common.table.payoutPeriod', 'Payout Period' ),
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
      title: t('common.table.paidAmount', 'Paid Amount'),
      dataIndex: 'paid_amount',
      key: 'paid_amount',
      render: (text) => <span>{asPrice(text)}</span>
    },
    {
      title: t('common.table.salesAmount', 'Sales Amount' ),
      dataIndex: 'sales_amount',
      key: 'sales_amount',
      render: (text) => <span>{asPrice(text)}</span>
    },
    {
      title: t('common.table.pv', 'PV' ),
      dataIndex: 'pv',
      key: 'pv',
    },
    {
      title: t('common.table.cv', 'CV' ),
      dataIndex: 'cv',
      key: 'cv',
    },
    {
      title: t('common.table.action', 'Action' ),
      dataIndex: 'ofSales',
      key: 'ofSales',
      render: (_, record) => (
        <Space size={10}>
          <OutlineBtn
            success
            loading={props.isLoadingExport && record.id === props.payoutId}
            onClick={() => props.getPayoutCycleReportExport(record.id)}
          >
            Details
          </OutlineBtn>
        </Space>
      ),
    },
  ];
  
  const onPageChange = (page) => {
    const paginationParam = { ...props.paginationParam, currentPage: page };
    props.loadTable(paginationParam, props.searchParam);
  };

  return (<div className="payout-report">
    <TablePanel
      data={props.tableData}
      title={t('pages.reports.payoutReport', 'Payout Report')}
      applyPadding
      columns={columns}
      showSearchIcon
      onSearch={() => {
        console.log("-------->", props.searchParam)
        props.loadTable({
          currentPage: 1,
          perPage: 10,
        }, props.searchParam);
      }}
      toolbar={
        <PayoutReportTableHead
          searchParam={props.searchParam}
          setSearchParam={props.setSearchParam}
        />
      }
      onPageChange={onPageChange}
      paginationParam={props.paginationParam}
      loading={props.isLoading}
    />
  </div>);
}
