/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { t } from '@/utils/label';
import { Row, Col, Card, FormItem, Input, Select, TextArea, RichEditor } from '@/components';
import { varOptionsWithDefault } from '@/common/var';
import MultiImagesUploader from './MultiImagesUploader';
import styles from './AddProductPage.less';
import addIcon from '@/assets/icons/addRound.svg';
import removeIcon from '@/assets/icons/deleteRed.svg';

const ProductDetailsForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    path: '',
    short_description: '',
    video_description: '',
    doc_description: '',
    priority: '',
    from_site: '',
    benefits: [],
    details: [],
  });
  const [image, setImage] = useState(undefined);
  // const [thumbnails, setThumbnails] = useState([]);

  const onFormData = (field, value) => {
    if (value !== '') {
      setFormData({
        ...formData,
        [field]: value,
      });
      props.onFormData(field, value);
    }
  };
  const onChangeImage = (files) => {
    let imageData;
    files.map((file) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        imageData = Object.assign(file, {
          preview: fileReader.result,
        });
        props.onFormData('image', imageData);
      };
    });
  };
  // const onChangeThumbnails = (files) => {
  //   const imageDatas = [];
  //   thumbnails.map((el) => {
  //     imageDatas.push({ preview: el.preview, name: el.name });
  //   });
  //   files.map((file) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       imageDatas.push({ preview: fileReader.result, name: file.name });
  //     };
  //   });

  //   setTimeout(() => {
  //     props.onFormData('thumbnails', imageDatas);
  //   }, 1000);
  // };
  const onDeleteImage = () => {
    props.onFormData('image', undefined);
  };
  // const onDeleteThumbnail = (name) => {
  //   const thumbnails0 = thumbnails.filter((el) => el.name !== name);
  //   props.onFormData('thumbnails', thumbnails0);
  // };
  const onArrayData = (field, index, value) => {
    if (value !== ' ') {
      const arrayData = [...formData[field]];
      arrayData[index] = value;
      setFormData({
        ...formData,
        [field]: arrayData,
      });
      props.onFormData(field, arrayData);
    }
  };

  const onAddArrayData = (field) => {
    const arrayData = [...formData[field]];
    arrayData.push('');
    setFormData({
      ...formData,
      [field]: arrayData,
    });
    props.onFormData(field, arrayData);
  };

  const onRemoveArrayData = (field, index) => {
    const arrayData = [...formData[field]];
    arrayData.splice(index, 1);
    setFormData({
      ...formData,
      [field]: arrayData,
    });
    props.onFormData(field, arrayData);
  };

  useEffect(() => {
    if (props.formData) {
      const formData0 = {
        title: props.formData.title,
        path: props.formData.path,
        short_description: props.formData.short_description,
        video_description: props.formData.video_description,
        doc_description: props.formData.doc_description,
        priority: props.formData.priority,
        from_site: props.formData.from_site,
        benefits: props.formData.benefits,
        details: props.formData.details,
        description: props.formData.description,
      };
      setImage(props.formData.image);
      setFormData(formData0);

      // const thumbnails0 = props.formData.thumbnails.map((el) => ({
      //   preview: el.preview,
      //   name: el.name || `fromDb_${el.id}xxx`,
      // }));
      // setThumbnails(thumbnails0);
    }
  }, [props.formData]);

  useEffect(() => {
    if (formData.title) {
      const path = formData.title
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map((x) => x.toLowerCase())
        .join('-');
      setFormData({
        ...formData,
        path,
      });
      props.onFormData('path', path);
    }
  }, [formData.title]);

  return (
    <>
      <div className="product-details-container">
        <Card className={`${styles.card}`}>
          <Row className="mb-15">
            <Col>
              <div className="title">{t('pages.products.productDetails', 'Product Details')}</div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className={`${styles.inputContainer}`}>
                <FormItem
                  label={'* Title'}
                  errorMessages={props.errorMessages.filter((el) => el.type === 'title')}
                >
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={(e) => onFormData('title', e.target.value)}
                  />
                </FormItem>
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className={`${styles.inputContainer}`}>
                <FormItem label={'* Path'}>
                  <Input
                    name="path"
                    value={formData.path}
                    onChange={(e) => onFormData('path', e.target.value)}
                  />
                </FormItem>
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24}>
              <div className={`${styles.inputContainer}`}>
                <FormItem
                  label={'Description (Optional)'}
                  errorMessages={props.errorMessages.filter(
                    (el) => el.type === 'short_description',
                  )}
                >
                  <TextArea
                    rows={3}
                    value={formData.short_description}
                    onChange={(e) => onFormData('short_description', e.target.value)}
                  />
                </FormItem>
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24}>
              <div className={`${styles.inputContainer}`}>
                <FormItem
                  label={'Long Description (Optional)'}
                  errorMessages={props.errorMessages.filter((el) => el.type === 'description')}
                >
                  <RichEditor
                    value={formData.description}
                    onChange={(value) => {
                      props.onFormData('description', value);
                    }}
                  />
                </FormItem>
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24}>
              <div className={`${styles.inputContainer}`}>
                <FormItem
                  label={'Document PDF Link (Optional)'}
                  errorMessages={props.errorMessages.filter((el) => el.type === 'doc_description')}
                >
                  <Input
                    value={formData.doc_description}
                    onChange={(e) => onFormData('doc_description', e.target.value)}
                  />
                </FormItem>
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24}>
              <div className={`${styles.inputContainer}`}>
                <FormItem
                  label={'Vimeo Script (Optional)'}
                  errorMessages={props.errorMessages.filter(
                    (el) => el.type === 'video_description',
                  )}
                >
                  <TextArea
                    rows={3}
                    value={formData.video_description}
                    onChange={(e) => onFormData('video_description', e.target.value)}
                  />
                </FormItem>
                <p className="mb-0 mt-10">Please input vimeo script embed tag like below;</p>
                <p style={{ padding: '4px 8px', backgroundColor: '#ccc' }}>
                  {
                    "<div style='position:relative'><iframe src='https://player.vimeo.com/video/397541181?title=0&byline=0&portrait=0' style='position:absolute;top:0;left:0;width:100%; height:100%' frameborder='0' allow='autoplay; fullscreen; picture-in-picture' allowfullscreen></iframe></div>"
                  }
                </p>
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24}>
              <FormItem errorMessages={props.errorMessages.filter((el) => el.type === 'image')}>
                <MultiImagesUploader
                  size={{ xs: 12, sm: 12, md: 8, lg: 6, xl: 4 }}
                  className="upload-container-product"
                  files={image ? [image] : []}
                  onChangeFile={onChangeImage}
                  onDeleteFile={onDeleteImage}
                  label="Image"
                  width="100%"
                  multiple={false}
                  uploadImageText={'Upload Image'}
                  dragFileText={'Drag file'}
                />
              </FormItem>
            </Col>
          </Row>
          {/*
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24}>
              <FormItem
                errorMessages={props.errorMessages.filter((el) => el.type === 'thumbnails')}
              >
                <MultiImagesUploader
                  size={{ xs: 12, sm: 12, md: 8, lg: 6, xl: 4 }}
                  className="upload-container-product"
                  files={thumbnails}
                  onChangeFile={onChangeThumbnails}
                  onDeleteFile={onDeleteThumbnail}
                  label="Other Images"
                  width="100%"
                />
              </FormItem>
            </Col>
          </Row>
          */}
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <div className={`${styles.inputContainer}`}>
                <FormItem
                  label={'* Priority'}
                  errorMessages={props.errorMessages.filter((el) => el.type === 'priority')}
                >
                  <Input
                    name="priority"
                    onChange={(e) => onFormData('priority', e.target.value)}
                    value={formData.priority}
                    type="number"
                  />
                </FormItem>
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24}>
              <div className={`${styles.inputContainer}`}>
                <FormItem
                  label={'* From Site'}
                  errorMessages={props.errorMessages.filter((el) => el.type === 'from_site')}
                >
                  <Select
                    value={formData.from_site}
                    onChange={(v) => onFormData('from_site', v)}
                    options={varOptionsWithDefault('product.fromSite')}
                  />
                </FormItem>
              </div>
            </Col>
          </Row>
          <Row gutter={[24, 6]}>
            <Col xs={24}>
              <FormItem
                label={
                  <p>
                    Benefits{' '}
                    <img
                      className={styles.rowBtn}
                      src={addIcon}
                      onClick={() => onAddArrayData('benefits')}
                    />
                  </p>
                }
                errorMessages={props.errorMessages.filter((el) => el.type === 'benefits')}
              >
                {formData.benefits.map((el, index) => (
                  <div key={index} className={'mb-5'}>
                    <Input
                      className={styles.rowInput}
                      value={el}
                      onChange={(e) => onArrayData('benefits', index, e.target.value)}
                    />
                    <img
                      className={styles.rowBtn}
                      src={removeIcon}
                      onClick={() => onRemoveArrayData('benefits', index)}
                    />
                  </div>
                ))}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={[24, 6]} className="mt-15">
            <Col xs={24}>
              <FormItem
                label={
                  <p>
                    Details{' '}
                    <img
                      className={styles.rowBtn}
                      src={addIcon}
                      onClick={() => onAddArrayData('details')}
                    />
                  </p>
                }
                errorMessages={props.errorMessages.filter((el) => el.type === 'details')}
              >
                {formData.details.map((el, index) => (
                  <div key={index} className={'mb-5'}>
                    <Input
                      className={styles.rowInput}
                      value={el}
                      onChange={(e) => onArrayData('details', index, e.target.value)}
                    />
                    <img
                      className={styles.rowBtn}
                      src={removeIcon}
                      onClick={() => onRemoveArrayData('details', index)}
                    />
                  </div>
                ))}
              </FormItem>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default ProductDetailsForm;
