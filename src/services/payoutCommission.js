import request from '@/utils/request';
import { getToken } from '@/utils/localStorage'

const PAYOUT_COMMISSION_ROUTE = 'pay_commission/report';
const PAY_PAYOUT_COMMISSION_ROUTE = 'pay_commission/{id}/pay';

export function getPayoutCommissionApi(params, callback, failCallback) {
  return request(PAYOUT_COMMISSION_ROUTE, {
    method: 'GET',
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(({ data, response }) => {
    if (response) {
      callback(data.data);
    } else {
      failCallback();
    }
  });
}

export function payPayoutCommissionApi(id, callback, failCallback) {
    return request(PAY_PAYOUT_COMMISSION_ROUTE.replace('{id}', id), {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then(({ data, response }) => {
      if (response) {
        callback(data);
      } else {
        failCallback();
      }
    });
  }