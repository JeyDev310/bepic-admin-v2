/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useIntl } from 'umi';
import { StartEndDatePicker } from '@/components';
import moment from 'moment';
import styles from '../PayCommissionsPage.less';

export default function TableHead(props) {
  const intl = useIntl();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onDateChange = (v) => {
    let dateRange = '';
    if (v) {
      setStartDate(v[0]);
      setEndDate(v[1]);
      dateRange = `${moment(v[0]).format().slice(0, 10)}|${moment(v[1]).format().slice(0, 10)}`;
    } else {
      setStartDate('');
      setEndDate('');
    }
    const searchParam = { ...props.searchParam, date_range: dateRange };
    const paginationParam = { ...props.paginationParam, currentPage: 1 };
    props.setSearchParam(searchParam);
    props.loadTable(paginationParam, searchParam);
  };

  return (
    <div className="toolbar-container">
      <div className={`toolbar-sub-container`}>
        <StartEndDatePicker onChange={onDateChange} startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
}
