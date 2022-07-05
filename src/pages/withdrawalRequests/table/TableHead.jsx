import React, { useState, useEffect } from 'react';
import { Input, Select } from '@/components';
import { varOptions } from '@/common/var';
import ExportBtn from './ExportBtn';
import PayBtn from './PayBtn';

const creditWithdrawRequestStatusOptions = varOptions("creditWithdrawRequest.status")
export default function TableHead(props) {
  const [formData, setFormData] = useState({
    username: '',
    status: '',
  });

  const onFormData = (field, value) => {
    const formData0 = {
      ...formData,
      [field]: value,
    };
    setFormData(formData0);
    const searchParam = {
      ...props.searchParam,
      ...formData0,
    };
    props.handleSearch(searchParam);
  };

  useEffect(() => {
    setFormData({
      username: props.searchParam.username,
      status: props.searchParam.status,
    });
  }, [props.searchParam]);

  return (
    <div className="toolbar-container">
      <div className="toolbar-sub-container">
        <Input
          value={formData.username}
          onChange={(e) => onFormData('username', e.target.value)}
          placeholder={'Username'}
        />
      </div>
      <div className="toolbar-sub-container">
        <Select
          value={formData.status}
          onChange={(v) => onFormData('status', v)}
          options={[{ label: 'All Statuses', value: '' }, ...creditWithdrawRequestStatusOptions]}
          size="middle"
          style={{ minWidth: '162px' }}
        />
      </div>
      <div className="toolbar-sub-container">
        <ExportBtn reloadTable={props.reloadTable} />
      </div>
      <div className="toolbar-sub-container">
        <PayBtn reloadTable={props.reloadTable} />
      </div>
    </div>
  );
}
