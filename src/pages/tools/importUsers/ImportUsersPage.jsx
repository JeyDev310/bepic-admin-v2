/* eslint-disable no-undef */
/* eslint-disable no-empty */
import React from 'react';
import { t } from '@/utils/label';
import { Row, Col, Card, Upload, message, OutlineBtn, PageContainer } from '@/components';
import { UploadOutlined } from '@ant-design/icons';
import styles from './ImportUsersPage.less';
import { getToken } from '@/utils/localStorage'

const ImportUsersPage = () => {
  const props = {
    name: 'import_users_csv',
    action: `${REACT_APP_API_SERVER}/api/admin/import_users`,
    accept: 'application/vnd.ms-excel',
    headers: {
      'authorization': `Bearer ${getToken()}`
    },
    onChange(info) {
      console.log({
        info
      })
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <PageContainer>
      <div className="page-content tools-container" style={{ marginTop: -8 }}>
        <Card className={`${styles.card}`}>
          <Row className="mb-12">
            <Col span={24}>
              <h4 className={`${styles.title}`}>
                {t("pages.news.importUsers", "Import Users")}
              </h4>
            </Col>
          </Row>
          <Row className="mt-4 d-flex align-items-center justify-content-start">
            <Col xs={24} sm="auto">
              <p className="mb-0">
                {t("pages.news.importText", "You can download the example csv file.")}{' '}
                <a
                  className="download-link"
                  href="https://mlmprotec-demo-assets.s3-us-west-2.amazonaws.com/sample_downloads/import_users.csv"
                >
                  {t("pages.news.clickDownload", "Click here to download.")}
                </a>
              </p>
            </Col>
          </Row>
          <Row className="mt-12 d-flex align-items-center justify-content-start">
            <Col xs={24} sm="auto">
              <Upload {...props} className="user-upload-list-container">
                <OutlineBtn icon={<UploadOutlined />}>Click to Upload</OutlineBtn>
              </Upload>
            </Col>
          </Row>
        </Card>
      </div>
    </PageContainer>
  );
};

export default ImportUsersPage;
