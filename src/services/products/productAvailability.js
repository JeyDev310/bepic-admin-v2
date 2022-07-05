import request from '@/utils/request';
import { getToken } from '@/utils/localStorage';

const GET_AUTOSHIP_PRODUCT_ROUTE = 'products/availabilities/autoship';
const GET_ENROLLMENT_PRODUCT_ROUTE = 'products/availabilities/enrollment';
const GET_SHOP_PRODUCT_ROUTE = 'products/availabilities/shop';
const GET_CREDIT_WALLET_PRODUCT_ROUTE = 'products/availabilities/credit_wallet';
const ADD_PPRODUCTS_AVAILABILITY_ROUTE = 'products/availabilities/{kind}';
const DELETE_PPRODUCTS_AVAILABILITY_ROUTE = 'products/availabilities/{kind}/{id}';

export function getAutoshipProductsApi(params, callback, failCallback) {
  return request(GET_AUTOSHIP_PRODUCT_ROUTE, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data)
    } else {
      failCallback()
    }
  }).catch(failCallback)
}

export function getEnrollmentProductsApi(params, callback, failCallback) {
  return request(GET_ENROLLMENT_PRODUCT_ROUTE, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data)
    } else {
      failCallback()
    }
  }).catch(failCallback)
}

export function getShopProductsApi(params, callback, failCallback) {
  return request(GET_SHOP_PRODUCT_ROUTE, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data)
    } else {
      failCallback()
    }
  }).catch(failCallback)
}

export function getCreditWalletProductsApi(params, callback, failCallback) {
  return request(GET_CREDIT_WALLET_PRODUCT_ROUTE, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data)
    } else {
      failCallback()
    }
  }).catch(failCallback)
}

export function addProductsAvailabilityApi(kind, body, callback, failCallback) {
  return request(ADD_PPRODUCTS_AVAILABILITY_ROUTE.replace('{kind}', kind), {
    method: 'POST',
    data: body,
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  }).catch(failCallback)
}

export function deleteProductsAvailabilityApi(kind, id, body, callback, failCallback) {
  return request(DELETE_PPRODUCTS_AVAILABILITY_ROUTE.replace('{kind}', kind).replace('{id}', id), {
    method: 'DELETE',
    data: body,
    headers: { Authorization: `Bearer ${getToken()}` }
  }).then(({ data, response }) => {
    if (response) {
      callback(data)
    } else {
      failCallback()
    }
  }).catch(failCallback)
}
