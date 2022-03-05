import axios from 'axios';
import endpoint from './endpoint';
import resource from '@/api/resource';

const AxiosCancelToken = axios.CancelToken;
const NAMESPACE = 'REGION';

export default {
  /**
   * @description List all provinces
   * @param {Object} params
   * @returns {Promise}
   */
  province(params) {
    let cancel;
    const CANCEL_TOKEN = `${NAMESPACE}_PROVINCE`;
    const request = resource.get(`${endpoint.region.province}`, {
      params,
      cancelToken: new AxiosCancelToken((cancelRequest) => {
        cancel = cancelRequest;
      }),
    });

    window[CANCEL_TOKEN] = cancel;

    return request;
  },

  /**
   * @description List all cities
   * @param {Object} params
   * @returns {Promise}
   */
  city(params) {
    let cancel;
    const CANCEL_TOKEN = `${NAMESPACE}_CITY`;
    const request = resource.get(`${endpoint.region.city}`, {
      params,
      cancelToken: new AxiosCancelToken((cancelRequest) => {
        cancel = cancelRequest;
      }),
    });

    window[CANCEL_TOKEN] = cancel;

    return request;
  },

  /**
   * @description List all subdistrictS
   * @param {Object} params
   * @returns {Promise}
   */
  subdistrict(params) {
    let cancel;
    const CANCEL_TOKEN = `${NAMESPACE}_SUBDISTRICT`;
    const request = resource.get(`${endpoint.region.subdistrict}`, {
      params,
      cancelToken: new AxiosCancelToken((cancelRequest) => {
        cancel = cancelRequest;
      }),
    });

    window[CANCEL_TOKEN] = cancel;

    return request;
  },
};
