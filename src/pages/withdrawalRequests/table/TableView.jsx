/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
import { t } from '@/utils/label';
import { TablePanel, UserAvatar, UserStatusBadge } from '@/components';
// import { withdrawalRequestsData } from '@/common/data/new-withdrawal-requestes';
import { asPrice, asDate } from '@/utils/text';
import { varLabel } from '@/common/var';
import TableHead from './TableHead';
import RejectBtn from './RejectBtn';
import styles from '../WithdrawalRequestsPage.less';

export default function TableView(props) {
  const columns = [
    {
      title: 'User ID',
      key: 'id',
      render: (_, record) => (
        <span>
          <Link style={{ textDecoration: 'underline' }} to="">
            {record.user.id}
          </Link>
        </span>
      ),
    },
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => (
        <span>
          <UserAvatar
            title={`${record.user.first_name} ${record.user.last_name}`}
            image={record.user.image}
          />
        </span>
      ),
    },
    {
      title: 'Username',
      key: 'username',
      render: (_, record) => <span>{record.user.username}</span>,
    },
    {
      title: 'Current Balance',
      key: 'current_balance',
      render: (_, record) => <span>{asPrice(record.user.wallet.current_balance)}</span>,
    },
    {
      title: 'Requested Amount',
      key: 'requested_amount',
      render: (_, record) => <span>{asPrice(record.amount)}</span>,
    },
    {
      title: 'Requested At',
      key: 'requested_at',
      render: (_, record) => <span>{asDate(record.requested_at)}</span>,
    },
    {
      title: 'Paid At',
      key: 'paid_at',
      render: (_, record) => <span>{record.paid_at ? asDate(record.paid_at) : '-'}</span>,
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <UserStatusBadge status={varLabel('creditWithdrawRequest.status', text)} />,
    },

    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex' }}>
          {record.status === 1 && (
            <>
              <RejectBtn data={record} reloadTable={props.reloadTable} />
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className={styles.withdrawalRequests}>
      <TablePanel
        data={props.tableData}
        loading={props.isLoading}
        title={
          t("pages.withdrawalRequests.withdrawalRequests", "Withdrawal Requests")
        }
        columns={columns}
        onPageChange={props.onPageChange}
        paginationParam={props.paginationParam}
        toolbar={
          <TableHead
            searchParam={props.searchParam}
            handleSearch={props.handleSearch}
            reloadTable={props.reloadTable}
          />
        }
      />
    </div>
  );
}
