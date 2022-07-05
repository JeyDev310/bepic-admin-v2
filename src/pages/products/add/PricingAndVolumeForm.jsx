/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { t } from '@/utils/label';
import { Row, Col, Card, Input, FormItem } from '@/components';
import styles from './AddProductPage.less';

const PricingAndVolumeForm = (props) => {
  const [formData, setFormData] = useState({
    retail_price: '',
    member_price: '',
    cost_of_goods: '',
    cv: '',
    pv: '',
    sku: '',
    keep_active_months: '',
    term_length: '',
    autoship_retail_price: '',
    autoship_member_price: '',
    max_order_quantity: '',
    max_autoship_quantity: '',
    max_personal_sales_quantity: '',
    max_total_sales_quantity: '',
    first_order_bonus: '',
    fast_start_bonus: '',
  });

  const onFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    props.onFormData(field, value);
  };

  useEffect(() => {
    if (props.formData) {
      setFormData({
        retail_price: props.formData.retail_price,
        member_price: props.formData.member_price,
        cost_of_goods: props.formData.cost_of_goods,
        cv: props.formData.cv,
        pv: props.formData.pv,
        sku: props.formData.sku,
        keep_active_months: props.formData.keep_active_months,
        term_length: props.formData.term_length,
        autoship_retail_price: props.formData.autoship_retail_price,
        autoship_member_price: props.formData.autoship_member_price,
        max_order_quantity: props.formData.max_order_quantity,
        max_autoship_quantity: props.formData.max_autoship_quantity,
        max_personal_sales_quantity: props.formData.max_personal_sales_quantity,
        max_total_sales_quantity: props.formData.max_total_sales_quantity,
        first_order_bonus: props.formData.first_order_bonus,
        fast_start_bonus: props.formData.fast_start_bonus,
      });
    }
  }, [props.formData]);

  return (
    <>
      <div className="product-details-container">
        <Card className={`${styles.cards}`}>
          <Row className="mb-15">
            <Col>
              <div className="title">{t('pages.products.pricingVolume', 'Pricing and Volume')}</div>
            </Col>
          </Row>
          <Row gutter={[24, 15]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <FormItem
                label={'* Retail Price'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'retail_price')}
              >
                <Input
                  name="retail_price"
                  type="number"
                  value={formData.retail_price}
                  onChange={(e) => onFormData('retail_price', e.target.value)}
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <FormItem
                label={'* Member Price'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'member_price')}
              >
                <Input
                  name="member_price"
                  type="number"
                  value={formData.member_price}
                  onChange={(e) => onFormData('member_price', e.target.value)}
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <FormItem
                label={'* Cost'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'cost_of_goods')}
              >
                <Input
                  name="cost_of_goods"
                  type="number"
                  value={formData.cost_of_goods}
                  onChange={(e) => onFormData('cost_of_goods', e.target.value)}
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <FormItem
                label={'* PV'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'pv')}
              >
                <Input
                  name="pv"
                  type="number"
                  value={formData.pv}
                  onChange={(e) => onFormData('pv', e.target.value)}
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <FormItem
                label={'* CV'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'cv')}
              >
                <Input
                  name="cv"
                  type="number"
                  value={formData.cv}
                  onChange={(e) => onFormData('cv', e.target.value)}
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <FormItem
                label={'* SKU'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'sku')}
              >
                <Input
                  name="sku"
                  value={formData.sku}
                  onChange={(e) => onFormData('sku', e.target.value)}
                />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={[24, 15]} className={'mt-12 mb-12'}>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <FormItem
                label={'* Keep Active Months'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'keep_active_months')}
              >
                <Input
                  name="keep_active_months"
                  type="number"
                  value={formData.keep_active_months}
                  onChange={(e) => onFormData('keep_active_months', e.target.value)}
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <FormItem
                label={'* Term Length'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'term_length')}
              >
                <Input
                  name="term_length"
                  type="number"
                  value={formData.term_length}
                  onChange={(e) => onFormData('term_length', e.target.value)}
                />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={[24, 15]} className={'mt-12 mb-12'}>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <FormItem
                label={'* Autoship Member Price'}
                errorMessages={props.errorMessages.filter(
                  (el) => el.type === 'autoship_member_price',
                )}
              >
                <Input
                  name="autoship_member_price"
                  type="number"
                  value={formData.autoship_member_price}
                  onChange={(e) => onFormData('autoship_member_price', e.target.value)}
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <FormItem
                label={'* Autoship Retail Price'}
                errorMessages={props.errorMessages.filter(
                  (el) => el.type === 'autoship_retail_price',
                )}
              >
                <Input
                  name="autoship_retail_price"
                  type="number"
                  value={formData.autoship_retail_price}
                  onChange={(e) => onFormData('autoship_retail_price', e.target.value)}
                />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={[24, 15]} className={'mt-12 mb-12'}>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <FormItem
                label={'* Max Order Quantity'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'max_order_quantity')}
              >
                <Input
                  name="max_order_quantity"
                  type="number"
                  value={formData.max_order_quantity}
                  onChange={(e) => onFormData('max_order_quantity', e.target.value)}
                />
                <p>0: No limit</p>
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <FormItem
                label={'* Max Autoship Quantity'}
                errorMessages={props.errorMessages.filter(
                  (el) => el.type === 'max_autoship_quantity',
                )}
              >
                <Input
                  name="max_autoship_quantity"
                  type="number"
                  value={formData.max_autoship_quantity}
                  onChange={(e) => onFormData('max_autoship_quantity', e.target.value)}
                />
                <p>0: No limit</p>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={[24, 15]} className={'mt-12 mb-12'}>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <FormItem
                label={'* Max Personal Sales Quantity'}
                errorMessages={props.errorMessages.filter(
                  (el) => el.type === 'max_personal_sales_quantity',
                )}
              >
                <Input
                  name="max_personal_sales_quantity"
                  type="number"
                  value={formData.max_personal_sales_quantity}
                  onChange={(e) => onFormData('max_personal_sales_quantity', e.target.value)}
                />
                <p>0: No limit</p>
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <FormItem
                label={'* Max Total Sales Quantity'}
                errorMessages={props.errorMessages.filter(
                  (el) => el.type === 'max_total_sales_quantity',
                )}
              >
                <Input
                  name="max_total_sales_quantity"
                  type="number"
                  value={formData.max_total_sales_quantity}
                  onChange={(e) => onFormData('max_total_sales_quantity', e.target.value)}
                />
                <p>0: No limit</p>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={[24, 15]} className={'mt-12 mb-12'}>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <FormItem
                label={'* First Order Bonus'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'first_order_bonus')}
              >
                <Input
                  name="first_order_bonus"
                  type="number"
                  value={formData.first_order_bonus}
                  onChange={(e) => onFormData('first_order_bonus', e.target.value)}
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <FormItem
                label={'* Fast Start Bonus'}
                errorMessages={props.errorMessages.filter((el) => el.type === 'fast_start_bonus')}
              >
                <Input
                  name="fast_start_bonus"
                  type="number"
                  value={formData.fast_start_bonus}
                  onChange={(e) => onFormData('fast_start_bonus', e.target.value)}
                />
              </FormItem>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default PricingAndVolumeForm;
