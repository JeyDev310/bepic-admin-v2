import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { Modal } from 'antd';
import {
  Row, Col, Input, notification
} from '@/components';

import { sendTestSystemEmailApi } from '@/services/emailCampaigns/systemEmails';

const TestSystemEmailModal = ({ isModalVisible, testEmailValue, onFinishTest }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [receiverEmail, setReceiverEmail] = useState('');
  const onSendTestSystemEmail = (res) => {
    notification.success({
      message: t('messages.success', 'Success'),
      description: 'The test email is sent successfully',
    });

    setIsLoading(false);
    onFinishTest(true);
  }

  const onFailSendTestSystemEmail = () => {
    setIsLoading(false);
    onFinishTest(false);
  }

  const handleTest = () => {
    if (receiverEmail === "") return;
    setIsLoading(true);
    sendTestSystemEmailApi(
      {
        system_email_value: testEmailValue,
        receiver_email: receiverEmail
      },
      onSendTestSystemEmail,
      onFailSendTestSystemEmail
    );
  };

  const handleChange = (e) => {
    setReceiverEmail(e.target.value);
  }
  return (
    <>
      <Modal
        loading={isLoading}
        title="System Email Send Test"
        visible={isModalVisible}
        okText="Send Test"
        onOk={handleTest}
        cancelText="Cancel"
        onCancel={() => onFinishTest(false)}
      >
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24}>
            <div>
              <div>* Receiver Email</div>
              <Input
                name="email"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default TestSystemEmailModal;
