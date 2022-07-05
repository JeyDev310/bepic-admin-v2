/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { t } from '@/utils/label';
import {
  Col,
  Row,
  PageContainer,
  StartEndDatePicker,
  TablePanel,
  Card,
  LineChart,
} from '@/components';
import styles from './RankTrackersReportPage.less';
import moment from 'moment';

const columns = [
  {
    title: 'Rank',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Nov 2020 Count',
    dataIndex: 'dec_count',
    key: 'dec_count',
  },
  {
    title: 'Nov 2020 Change',
    dataIndex: 'dec_change',
    key: 'dec_change',
  },
  {
    title: 'Jan 2021 Count',
    dataIndex: 'jan_count',
    key: 'jan_count',
  },
  {
    title: 'Jan 2021 Change',
    dataIndex: 'jan_change',
    key: 'jan_change',
  },
  {
    title: 'Total Change',
    dataIndex: 'total_change',
    key: 'total_change',
  },
];

const RankTrackersReportPage = () => {
  const [paginationParam, setPaginationParam] = useState({
    currentPage: 1,
    perPage: 10,
    total: 10,
  });

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateRange, setDateRange] = useState('');

  const onDateChange = (date) => {
    let startDate0 = moment().subtract(30, 'days');
    let endDate0 = moment();
    if (date) {
      startDate0 = date[0];
      endDate0 = date[1];
    }
    setStartDate(startDate0);
    setEndDate(endDate0);
    setDateRange(`${startDate0.format('YYYY-MM-DD')}|${endDate0.format('YYYY-MM-DD')}`);
  };

  const onPageChange = (currentPage) => {
    setPaginationParam({
      ...paginationParam,
      currentPage,
    });
  };

  return (
    <div className="report-rank-tracker">
      <PageContainer>
        <Row gutter={[0, 15]}>
          <Col xs={24} className={styles.rankTrackersTable}>
            <TablePanel
              data={[]}
              title={t('pages.reports.rankTracker', 'Rank Tracker')}
              toolbar={
                <div className="toolbar-container">
                  <div className={`toolbar-sub-container`}>
                    <StartEndDatePicker onChange={onDateChange} value={[startDate, endDate]} />
                  </div>
                </div>
              }
              chart={
                <div className="countryMap">
                  <LineChart data={[]} xField={'monthly'} yField={'change'} seriesField={'name'} />
                </div>
              }
              showSearchIcon
              applyPadding
              onSearch={() => {
                console.log(dateRange);
              }}
              columns={columns}
              onPageChange={onPageChange}
              paginationParam={paginationParam}
            />
          </Col>
        </Row>
      </PageContainer>
    </div>
  );
};

export default RankTrackersReportPage;
