import React from 'react';
import { PageContainer, ComingSoon } from '@/components';

const RankReportPage = () => {
  return (
    <PageContainer>
      <div
        style={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'center',
          marginTop: -8
        }}
      >
        <ComingSoon content="COMING SOON" />
      </div>
    </PageContainer>
  );
};

export default RankReportPage;
