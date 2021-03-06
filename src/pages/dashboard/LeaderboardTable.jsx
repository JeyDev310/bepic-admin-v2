/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { TablePanel, UserAvatar, CountryFlag, StartEndDatePicker } from '@/components';
import styles from './DashboardPage.less';
import { getDashboardLeaderboardApi } from '@/services/dashboard';
import { t } from '@/utils/label';

export default () => {
  const columns = [
    {
      title: '#',
      key: 'id',
      render: (_, record) => <span>{record.user.id}</span>,
    },
    {
      title: 'User',
      key: 'sponsor',
      render: (_, record) => (
        <UserAvatar
          image={record.user.image}
          title={`${record.user.first_name} ${record.user.last_name}`}
        />
      ),
    },
    {
      title: 'ID',
      key: 'sponsor',
      render: (_, record) => <span>{record.user.uuid}</span>,
    },
    {
      title: 'Personal Enrollments',
      dataIndex: 'pe',
      key: 'sponsor',
      render: (pe) => <span>{pe}</span>,
    },
    {
      title: 'Country',
      key: 'country',
      render: (_, record) => (
        <CountryFlag
          country={record.user.billing_detail.billing_country}
          title={record.user.billing_detail.billing_country}
        />
      ),
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days'));
  const [endDate, setEndDate] = useState(moment());

  const onGetLeaderboardData = (data) => {
    setLeaderboardData(data);
    setIsLoading(false);
  };

  const onFailLeaderboardData = () => {
    setIsLoading(false);
  };

  const loadLeaderboardData = (dateRange) => {
    setIsLoading(true);
    const params = {
      date_range: dateRange,
    };
    getDashboardLeaderboardApi(params, onGetLeaderboardData, onFailLeaderboardData);
  };

  const onChangeDateRanage = (date) => {
    let startDate0 = moment().subtract(30, 'days');
    let endDate0 = moment();
    if (date) {
      startDate0 = date[0];
      endDate0 = date[1];
    }
    setStartDate(startDate0);
    setEndDate(endDate0);
    const dateRange = `${startDate0.format('YYYY-MM-DD')}|${endDate0.format('YYYY-MM-DD')}`;
    loadLeaderboardData(dateRange);
  };

  useEffect(() => {
    const startDate0 = moment().subtract(30, 'days');
    const endDate0 = moment();
    const dateRange = `${startDate0.format('YYYY-MM-DD')}|${endDate0.format('YYYY-MM-DD')}`;
    loadLeaderboardData(dateRange);
  }, []);

  return (
    <div className={`${styles.leaderboardContainer} leaderboard-panel`}>
      <TablePanel
        data={leaderboardData}
        title={
          t("pages.dashboard.leaderboard","Top 100 Leaderboard")
        }
        columns={columns}
        loading={isLoading}
        toolbar={
          <div className="toolbar-container-for-md-filters">
            <div className="toolbar-sub-container">
              <StartEndDatePicker value={[startDate, endDate]} onChange={onChangeDateRanage} />
            </div>
          </div>
        }
      />
    </div>
  );
};
