import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { Row, Col, LineChart, Select } from '@/components';
import styles from './RankTrackersReportPage.less';

export default () => {
  const [data, setData] = useState([]);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch(() => {});
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  return (
    <>
      <Row className={`${styles.rankTrackerContainer}`}>
        <Col xs={24} md={24} lg={12}>
          <div className={`${styles.title}`}>
            {t("pages.reports.chartRank", "Chart Rank")}
          </div>
        </Col>
        <Col xs={24} md={24} lg={12}>
          <div className={`toolbar-container ${styles.rankTrackerBtnContainer}`}>
            <div className={`toolbar-sub-container ${styles.selectContainer}`}>
              <Select placeholder="All" className={styles.selectBox} size="medium" />
            </div>
          </div>
        </Col>
      </Row>

      <Row gutter={[0, 0]}>
        <Col span={24}>
          <LineChart data={data} xField={'year'} yField={'gdp'} seriesField={'name'} />
        </Col>
      </Row>
    </>
  );
};
