/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button, PageContainer, SuccessNotification, message } from '@/components';
import ProductDetailsForm from './ProductDetailsForm';
import PricingAndVolumeForm from './PricingAndVolumeForm';
import ShippingForm from './ShippingForm';
import TaxForm from './TaxForm';
import VisibilityForm from './VisibilityForm';
import styles from './AddProductPage.less';
import { createProductApi } from '@/services/products/product';
import { t } from '@/utils/label';

const AddProductPage = ({ history }) => {
  const [formData, setFormData] = useState({
    title: '',
    path: '',
    description: '',
    short_description: '',
    video_description: '',
    doc_description: '',
    benefits: [],
    details: [],
    from_site: '',
    eligible_user_types: '1,2',
    is_featured: 2,
    is_best_seller: 2,
    is_new: 2,
    priority: '',
    image: undefined,
    thumbnails: [],
    retail_price: '',
    member_price: '',
    cost_of_goods: '',
    pv: '',
    cv: '',
    sku: '',
    keep_active_months: '',
    term_length: '',
    autoship_member_price: '',
    autoship_retail_price: '',
    max_order_quantity: '',
    max_autoship_quantity: '',
    max_personal_sales_quantity: '',
    max_total_sales_quantity: '',
    first_order_bonus: '',
    fast_start_bonus: '',
    weight_unit: 1,
    weight_value: '',
    is_digital: 2,
    tax_code: '',
    general_shipping_price: '',
    status: 1,
    shipping_prices: [],
  });

  const [errorMessages, setErrorMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const onFormData = (field, value) => {
    const formData0 = {
      ...formData,
      [field]: value,
    };
    let errorMessage = null;
    if (field === 'title') {
      if (value.length < 4) {
        errorMessage = { type: 'title', message: 'Title should be input at least 4 characters' };
      }
    }
    if (field === 'path') {
      if (value.length < 4) {
        errorMessage = { type: 'path', message: 'Path should be input at least 4 characters' };
      }
    }

    if (field === 'priority') {
      if (!value) {
        errorMessage = { type: 'priority', message: 'Required' };
      }
    }

    if (field === 'from_site') {
      if (!value) {
        errorMessage = { type: 'from_site', message: 'Required' };
      }
    }

    if (field === 'thumbnails') {
      if (!value) {
        errorMessage = { type: 'thumbnails', message: 'Required' };
      }
    }

    if (field === 'image') {
      if (!value) {
        errorMessage = { type: 'image', message: 'Required' };
      }
    }
    if (field === 'retail_price') {
      if (!value) {
        errorMessage = { type: 'retail_price', message: 'Required' };
      }
    }

    if (field === 'member_price') {
      if (!value) {
        errorMessage = { type: 'member_price', message: 'Required' };
      }
    }

    if (field === 'cost_of_goods') {
      if (!value) {
        errorMessage = { type: 'cost_of_goods', message: 'Required' };
      }
    }

    if (field === 'cv') {
      if (!value) {
        errorMessage = { type: 'cv', message: 'Required' };
      }
    }

    if (field === 'pv') {
      if (!value) {
        errorMessage = { type: 'pv', message: 'Required' };
      }
    }

    if (field === 'sku') {
      if (!value) {
        errorMessage = { type: 'sku', message: 'Required' };
      }
    }
    if (field === 'keep_active_months') {
      if (!value) {
        errorMessage = { type: 'keep_active_months', message: 'Required' };
      }
    }
    if (field === 'term_length') {
      if (!value) {
        errorMessage = { type: 'term_length', message: 'Required' };
      }
    }
    if (field === 'autoship_member_price') {
      if (!value) {
        errorMessage = { type: 'autoship_member_price', message: 'Required' };
      }
    }
    if (field === 'autoship_retail_price') {
      if (!value) {
        errorMessage = { type: 'autoship_retail_price', message: 'Required' };
      }
    }
    if (field === 'max_order_quantity') {
      if (!value) {
        errorMessage = { type: 'max_order_quantity', message: 'Required' };
      }
    }
    if (field === 'max_autoship_quantity') {
      if (!value) {
        errorMessage = { type: 'max_autoship_quantity', message: 'Required' };
      }
    }
    if (field === 'max_personal_sales_quantity') {
      if (!value) {
        errorMessage = { type: 'max_personal_sales_quantity', message: 'Required' };
      }
    }
    if (field === 'max_total_sales_quantity') {
      if (!value) {
        errorMessage = { type: 'max_total_sales_quantity', message: 'Required' };
      }
    }
    if (field === 'first_order_bonus') {
      if (!value) {
        errorMessage = { type: 'first_order_bonus', message: 'Required' };
      }
    }
    if (field === 'fast_start_bonus') {
      if (!value) {
        errorMessage = { type: 'fast_start_bonus', message: 'Required' };
      }
    }
    if (errorMessage === null) {
      setErrorMessages([]);
    } else {
      setErrorMessages([errorMessage]);
    }
    setFormData(formData0);
  };

  const onCreateProduct = (res) => {
    SuccessNotification(res.message);
    history.push('/products/list');
    setIsLoading(false);
  };

  const onFailCreateProduct = (data, response) => {
    setIsLoading(false);
  };

  function validateForm() {
    let flag = false;
    let errorMessages0 = [...errorMessages];
    if (formData.title.length < 4) {
      if (errorMessages0.filter((el) => el.type === 'title').length === 0)
        errorMessages0.push({
          type: 'title',
          message: 'Title should be input at least 4 characters',
        });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'title').slice();
    }
    if (formData.path.length < 4) {
      if (errorMessages0.filter((el) => el.type === 'path').length === 0)
        errorMessages0.push({
          type: 'path',
          message: 'Path should be input at least 4 characters',
        });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'title').slice();
    }
    if (!formData.image) {
      if (errorMessages0.filter((el) => el.type === 'image').length === 0)
        errorMessages0.push({ type: 'image', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'image').slice();
    }

    if (!formData.priority) {
      if (errorMessages0.filter((el) => el.type === 'priority').length === 0)
        errorMessages0.push({ type: 'priority', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'priority').slice();
    }

    if (!formData.from_site) {
      if (errorMessages0.filter((el) => el.type === 'from_site').length === 0)
        errorMessages0.push({ type: 'from_site', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'from_site').slice();
    }

    if (!formData.retail_price) {
      if (errorMessages0.filter((el) => el.type === 'retail_price').length === 0)
        errorMessages0.push({ type: 'retail_price', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'retail_price').slice();
    }

    if (!formData.member_price) {
      if (errorMessages0.filter((el) => el.type === 'member_price').length === 0)
        errorMessages0.push({ type: 'member_price', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'member_price').slice();
    }

    if (formData.is_digital === 2) {
      if (!formData.general_shipping_price) {
        if (errorMessages0.filter((el) => el.type === 'general_shipping_price').length === 0)
          errorMessages0.push({ type: 'general_shipping_price', message: 'Required' });
        flag = true;
      } else {
        errorMessages0 = errorMessages0
          .filter((el) => el.type !== 'general_shipping_price')
          .slice();
      }
    }
    if (formData.is_digital === 2) {
      if (!formData.weight_unit) {
        if (errorMessages0.filter((el) => el.type === 'weight_unit').length === 0)
          errorMessages0.push({ type: 'weight_unit', message: 'Required' });
        flag = true;
      } else {
        errorMessages0 = errorMessages0.filter((el) => el.type !== 'weight_unit').slice();
      }
    }
    if (formData.is_digital === 2) {
      if (!formData.weight_value) {
        if (errorMessages0.filter((el) => el.type === 'weight_value').length === 0)
          errorMessages0.push({ type: 'weight_value', message: 'Required' });
        flag = true;
      } else {
        errorMessages0 = errorMessages0.filter((el) => el.type !== 'weight_value').slice();
      }
    }

    if (!formData.cost_of_goods) {
      if (errorMessages0.filter((el) => el.type === 'cost_of_goods').length === 0)
        errorMessages0.push({ type: 'cost_of_goods', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'cost_of_good').slice();
    }

    if (!formData.pv) {
      if (errorMessages0.filter((el) => el.type === 'pv').length === 0)
        errorMessages0.push({ type: 'pv', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'pv').slice();
    }

    if (!formData.cv) {
      if (errorMessages0.filter((el) => el.type === 'cv').length === 0)
        errorMessages0.push({ type: 'cv', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'cv').slice();
    }

    if (!formData.sku) {
      if (errorMessages0.filter((el) => el.type === 'sku').length === 0)
        errorMessages0.push({ type: 'sku', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'sku').slice();
    }

    if (formData.eligible_user_types === '') {
      if (errorMessages0.filter((el) => el.type === 'eligible_user_types').length === 0)
        errorMessages0.push({
          type: 'eligible_user_types',
          message: 'Please select eligible user types at least one.',
        });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'eligible_user_types').slice();
    }

    if (!formData.keep_active_months) {
      if (errorMessages0.filter((el) => el.type === 'keep_active_months').length === 0)
        errorMessages0.push({ type: 'keep_active_months', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'keep_active_months').slice();
    }

    if (!formData.term_length) {
      if (errorMessages0.filter((el) => el.type === 'term_length').length === 0)
        errorMessages0.push({ type: 'term_length', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'term_length').slice();
    }

    if (!formData.autoship_member_price) {
      if (errorMessages0.filter((el) => el.type === 'autoship_member_price').length === 0)
        errorMessages0.push({ type: 'autoship_member_price', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'autoship_member_price').slice();
    }

    if (!formData.autoship_retail_price) {
      if (errorMessages0.filter((el) => el.type === 'autoship_retail_price').length === 0)
        errorMessages0.push({ type: 'autoship_retail_price', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'autoship_retail_price').slice();
    }

    if (!formData.max_order_quantity) {
      if (errorMessages0.filter((el) => el.type === 'max_order_quantity').length === 0)
        errorMessages0.push({ type: 'max_order_quantity', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'max_order_quantity').slice();
    }

    if (!formData.max_autoship_quantity) {
      if (errorMessages0.filter((el) => el.type === 'max_autoship_quantity').length === 0)
        errorMessages0.push({ type: 'max_autoship_quantity', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'max_autoship_quantity').slice();
    }

    if (!formData.max_personal_sales_quantity) {
      if (errorMessages0.filter((el) => el.type === 'max_personal_sales_quantity').length === 0)
        errorMessages0.push({ type: 'max_personal_sales_quantity', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0
        .filter((el) => el.type !== 'max_personal_sales_quantity')
        .slice();
    }

    if (!formData.max_total_sales_quantity) {
      if (errorMessages0.filter((el) => el.type === 'max_total_sales_quantity').length === 0)
        errorMessages0.push({ type: 'max_total_sales_quantity', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0
        .filter((el) => el.type !== 'max_total_sales_quantity')
        .slice();
    }

    if (!formData.first_order_bonus) {
      if (errorMessages0.filter((el) => el.type === 'first_order_bonus').length === 0)
        errorMessages0.push({ type: 'first_order_bonus', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'first_order_bonus').slice();
    }

    if (!formData.fast_start_bonus) {
      if (errorMessages0.filter((el) => el.type === 'fast_start_bonus').length === 0)
        errorMessages0.push({ type: 'fast_start_bonus', message: 'Required' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'fast_start_bonus').slice();
    }

    /*
    let flag2 = false;
    formData.benefits.map((el) => {
      if (el === '') flag2 = true;
    });
    if (formData.benefits.length === 0 || flag2) {
      if (errorMessages0.filter((el) => el.type === 'benefits').length === 0)
        errorMessages0.push({ type: 'benefits', message: 'Please input benefits at least one.' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'benefits').slice();
    }

    flag2 = false;
    formData.details.map((el) => {
      if (el === '') flag2 = true;
    });
    if (formData.details.length === 0 || flag2) {
      if (errorMessages0.filter((el) => el.type === 'details').length === 0)
        errorMessages0.push({ type: 'details', message: 'Please input details at least one.' });
      flag = true;
    } else {
      errorMessages0 = errorMessages0.filter((el) => el.type !== 'details').slice();
    }
    */

    setErrorMessages(errorMessages0);
    return flag;
  }

  const handleSubmit = () => {
    if (validateForm()) {
      if (errorMessages[0]) {
        message.error(errorMessages[0].message);
      }
      return;
    }
    setIsLoading(true);

    let requestData = { ...formData };
    requestData.image = formData.image && formData.image.preview ? formData.image.preview : null;
    let thumbnails = [];
    formData.thumbnails.map((item) => {
      thumbnails.push(item.preview);
    });
    requestData.thumbnails = thumbnails;
    if (formData.benefits.length === 1 && formData.benefits[0] === '') {
      requestData.benefits = [];
    }
    if (formData.details.length === 1 && formData.details[0] === '') {
      requestData.details = [];
    }

    if (!requestData.tax_code) {
      delete requestData.tax_code;
    }
    if (requestData.is_digital === 1 && !requestData.weight_value) {
      delete requestData.weight_value;
      delete requestData.weight_unit;
    }
    if (requestData.is_digital === 1 && !requestData.general_shipping_price) {
      delete requestData.general_shipping_price;
    }
    createProductApi(requestData, onCreateProduct, onFailCreateProduct);
  };

  return (
    <PageContainer isLoading={isLoading}>
      <Row gutter={[15, 15]}>
        <Col xl={18}>
          <Row gutter={[15, 15]} className="product-container">
            <Col span={24}>
              <ProductDetailsForm
                formData={formData}
                onFormData={onFormData}
                errorMessages={errorMessages}
              />
            </Col>
            <Col span={24}>
              <PricingAndVolumeForm
                formData={formData}
                onFormData={onFormData}
                errorMessages={errorMessages}
              />
            </Col>

            <Col span={24}>
              <ShippingForm
                formData={formData}
                onFormData={onFormData}
                errorMessages={errorMessages}
              />
            </Col>
            <Col span={24}>
              <TaxForm formData={formData} onFormData={onFormData} errorMessages={errorMessages} />
            </Col>
          </Row>
        </Col>
        <Col xs={24} xl={6}>
          <Row gutter={[15, 15]} className="product-container">
            <Col span={24}>
              <VisibilityForm
                formData={formData}
                onFormData={onFormData}
                errorMessages={errorMessages}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[15, 15]} className={styles.productActionBtn}>
        <Col xs={24} sm={24} xl={18}>
          <Button type="primary" onClick={handleSubmit} loading={isLoading}>
            {t('pages.products.addProduct', 'Save Product')}
          </Button>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default withRouter(AddProductPage);
