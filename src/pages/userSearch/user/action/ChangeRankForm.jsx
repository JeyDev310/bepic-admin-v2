import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { Select, Row, Col, OutlineBtn, notification, Popconfirm } from '@/components';
import styles from './UserActionSubPage.less';
import { changeUserRankApi } from '@/services/userSearch/action';
import { loadRankOptionsApi } from '@/services/common';

export default function ChangeRankForm(props) {
  const [rankId, setRankId] = useState(1);
  const [rankOptions, setRankOptions] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const onDoneUpdate = () => {
    notification.success({
      message: 'Success',
      description: 'Rank updated',
    });
    setIsUpdating(false);
  };
  const onFailUpdate = () => {
    setIsUpdating(false);
  };
  const handleUpdate = () => {
    setIsUpdating(true);
    changeUserRankApi(props.userData.id, { rank_id: rankId }, onDoneUpdate, onFailUpdate);
  };

  const onGetRanks = (data) => {
    setRankOptions(data.map((el) => ({ value: el.id, label: el.name })));
  };

  useEffect(() => {
    if (props.userData) {
      setRankId(props.userData.rank_id);
    }
  }, [props.userData]);

  useEffect(() => {
    loadRankOptionsApi(onGetRanks);
  }, []);

  return (
    <div className={styles.payoutContainer}>
      <Row gutter={[24, 0]}>
        <Col>
          <div className={`${styles.inputContainer}`}>
            <div className={`${styles.inputLabel}`}>Change Rank</div>
            <Select
              className={`${styles.statusInput}`}
              value={rankId}
              onChange={(v) => setRankId(v)}
              options={rankOptions}
            />
          </div>
        </Col>
        <Col>
          <div className={`${styles.statusBtn}`}>
            <Popconfirm onConfirm={handleUpdate}>
              <OutlineBtn
                className={`${styles.button} mb-12`}
                loading={isUpdating}
                disabled={isUpdating}
              >
                {t('pages.userSearch.saveBtn', 'Save')}
              </OutlineBtn>
            </Popconfirm>
          </div>
        </Col>
      </Row>
    </div>
  );
}
