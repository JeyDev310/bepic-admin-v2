/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
import React, { useState } from 'react';
import { Form, Row, Col, MultiSelect, OutlineBtn, SuccessNotification } from '@/components';
import { countryOptions } from '@/utils/country';
import { addProductsAvailabilityApi } from '@/services/products/productAvailability';
import styles from './EnrollmentSubPage.less';
import { t } from '@/utils/label';

const EnrollmentModalContent = ({ paginationParam, searchParam, loadTable, allProductsOption, toggle }) => {
  const [form] = Form.useForm();
  const layout = {
    wrapperCol: {
      span: 32,
    },
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSaveSuccess = () => {
    SuccessNotification('Successfully Created');
    form.resetFields();
    setIsLoading(false);
    loadTable(paginationParam, searchParam);
    setTimeout(() => {
      toggle()
    }, 2000)
  };
  const onSaveError = () => {
    setIsLoading(false);
  };
  const onFinish = async (values) => {
    setIsLoading(true);
    let formData = new FormData();
    formData.append('kind', 'enrollment');
    values.countries.map((c) => {
      formData.append('countries[]', c);
    });
    values.products.map((c) => {
      formData.append('products[]', c);
    });
    addProductsAvailabilityApi('enrollment', formData, onSaveSuccess, onSaveError);
  };

  const onCancel = () => {
    toggle()
    form.resetFields();
  };

  return (
    <Form {...layout} name="basic" layout="vertical" onFinish={onFinish} form={form}>
      <Row gutter={[15, 0]}>
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <Form.Item
              label={t('common.label.countries', 'Countries')}
              className={styles.formFields}
              name="countries"
              rules={[
                {
                  required: true,
                  message: t(
                    'common.validation.pleaseSelectCountries',
                    'Please Select Countries',
                  ),
                },
              ]}
            >
              <MultiSelect options={countryOptions()} />
            </Form.Item>
          </div>
        </Col>
        <Col xs={24}>
          <div className={`${styles.inputContainer}`}>
            <Form.Item
              label={t('common.label.products', 'Products')}
              className={styles.formFields}
              name="products"
              rules={[
                {
                  required: true,
                  message: t(
                    'common.validation.pleaseSelectProducts',
                    'Please Select Products',
                  ),
                },
              ]}
            >
              <MultiSelect options={allProductsOption || []} />
            </Form.Item>
          </div>
        </Col>
      </Row>
      <Row gutter={[15, 0]} justify="center">
        <Col span={12} className={`${styles.inputBtn}`}>
          <OutlineBtn
            className={styles.actionBtn}
            htmlType="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            {t('common.label.add', 'Add')}
          </OutlineBtn>
        </Col>
        <Col span={12}>
          <OutlineBtn className={styles.actionBtn} htmlType="submit" onClick={onCancel}>
            {t('common.label.cancel', 'Cancel')}
          </OutlineBtn>
        </Col>
      </Row>
    </Form>
  );
};

export default EnrollmentModalContent;
