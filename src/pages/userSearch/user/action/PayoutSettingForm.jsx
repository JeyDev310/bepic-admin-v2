import React, { useState, useEffect } from 'react';
import { Button, OutlineBtn, Popconfirm } from '@/components';
import styles from './UserActionSubPage.less';
import { changePaymentOptionApi } from '@/services/userSearch/action';
import { varOptions } from '@/common/var';

const userIsPayoutAllowedOptions = varOptions('user.isPayoutAllowed');

export default function PayoutSettingForm(props) {
  const [formData, setFormData] = useState({
    is_payout_allowed: 1,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const onDoneUpdate = () => {
    setIsUpdating(false);
    props.getUserDetail();
  };
  const onFailUpdate = () => {
    setIsUpdating(false);
  };
  const handleChange = (isPayoutAllowed) => {
    setIsUpdating(true);
    changePaymentOptionApi(
      props.userData.id,
      { is_payout_allowed: isPayoutAllowed },
      onDoneUpdate,
      onFailUpdate,
    );
  };

  useEffect(() => {
    if (props.userData) {
      setFormData({
        ...formData,
        is_payout_allowed: props.userData.is_payout_allowed,
      });
    }
  }, [props.userData]);

  return (
    <div className={`${styles.payoutContainer}`}>
      <div className={`${styles.label}`}>Payout Availability</div>
      <div className={styles.payoutOptionWrapper}>
        {userIsPayoutAllowedOptions.map((el) => (
          <div key={el.value}>
            {el.value !== formData.is_payout_allowed ? (
              <Popconfirm onConfirm={() => handleChange(el.value)}>
                <OutlineBtn loading={isUpdating} disabled={isUpdating}>
                  {el.label}
                </OutlineBtn>
              </Popconfirm>
            ) : (
              <Button success={el.value === 1} danger={el.value === 2}>
                {el.label}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
