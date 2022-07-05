/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { Link } from 'react-router-dom';
import { t } from '@/utils/label';
import { Row, Col } from '@/components';
import UserSearchInfoCard from './UserSearchInfoCard';
import { varLabel } from '@/common/var';

const UserInfoCard = (props) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <UserSearchInfoCard
            label={t('pages.userSearch.userInfo', 'User Info')}
            columns={[
              {
                title: 'Email:',
                dataIndex: 'email',
                key: 'email',
              },
              {
                title: 'Phone:',
                dataIndex: 'phone',
                key: 'phone',
              },
              {
                title: 'Company Name:',
                dataIndex: 'ownership_name',
                key: 'ownership_name',
              },
              {
                title: 'Enroller',
                key: 'enroller',
                render: ({ data }) =>
                  data && data.sponsor ? (
                    <Link
                      to={`/user/detail/${data.sponsor.id}`}
                    >{`${data.sponsor.first_name} ${data.sponsor.last_name}`}</Link>
                  ) : (
                    '...'
                  ),
              },
              {
                title: 'Parent',
                key: 'parent',
                render: ({ data }) =>
                  data && data.parent ? (
                    <Link
                      to={`/user/detail/${data.parent.id}`}
                    >{`${data.parent.first_name} ${data.parent.last_name}`}</Link>
                  ) : (
                    '...'
                  ),
              },
              {
                title: 'Type',
                key: 'type',
                render: ({ data }) =>
                  data && data.type ? varLabel('user.type', data.type) : '...',
              },
              {
                title: 'PV',
                key: 'pv',
                render: ({ data }) => (
                  <span>{data && data.qualification ? data.qualification.pv : '...'}</span>
                ),
              },
              {
                title: 'GV',
                key: 'gv',
                render: ({ data }) => (
                  <span>{data && data.qualification ? data.qualification.gpv : '...'}</span>
                ),
              },
              {
                title: 'Replicated Website',
                key: 'website',
                render: () => (
                  <a
                    href={`${REACT_APP_ECOMMERCE}/?referer=${
                      props.userData && props.userData.username
                    }`}
                    target="_blank"
                  >
                    <p style={{ textAlign: 'right' }}>
                      {`${REACT_APP_ECOMMERCE}/?referer=${
                        props.userData && props.userData.username
                      }`}
                    </p>
                  </a>
                ),
              },
            ]}
            data={props.userData}
            isLoading={props.isLoading}
          />
        </Col>
      </Row>
    </>
  );
};

export default UserInfoCard;
