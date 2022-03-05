import axios from 'axios';
import endpoint from './endpoint';
import resource from '@/api/resource';

const AxiosCancelToken = axios.CancelToken;
const NAMESPACE = 'USER';

export default {
  /**
   * @description List all users
   * @param {Object} params
   * @returns {Promise}
   */
  list(params) {
    let cancel;
    const CANCEL_TOKEN = `${NAMESPACE}_LIST`;
    const request = resource.get(`${endpoint.list}`, {
      params,
      cancelToken: new AxiosCancelToken((cancelRequest) => {
        cancel = cancelRequest;
      }),
    });

    window[CANCEL_TOKEN] = cancel;

    return request;
  },

  /**
   * @description Get user detail
   * @param {Number} id
   * @returns {Promise}
   */
  detail(id) {
    let cancel;
    const CANCEL_TOKEN = `${NAMESPACE}_DETAIL`;
    const request = resource.get(`${endpoint.detail}/${id}`, {
      cancelToken: new AxiosCancelToken((cancelRequest) => {
        cancel = cancelRequest;
      }),
    });

    window[CANCEL_TOKEN] = cancel;

    return request;
  },

  /**
   * @description Create a new user
   * @param {Object} payload
   * @returns {Promise}
   */
  create(payload) {
    let cancel;
    const CANCEL_TOKEN = `${NAMESPACE}_CREATE`;
    const request = resource.post(`${endpoint.create}`, payload, {
      cancelToken: new AxiosCancelToken((cancelRequest) => {
        cancel = cancelRequest;
      }),
    });

    window[CANCEL_TOKEN] = cancel;

    return request;
  },

  /**
   * @description Update user
   * @param {Object} payload
   * @param {Number} id
   * @returns {Promise}
   */
  update(payload, id) {
    let cancel;
    const CANCEL_TOKEN = `${NAMESPACE}_UPDATE`;
    const request = resource.put(`${endpoint.update}/${id}`, payload, {
      cancelToken: new AxiosCancelToken((cancelRequest) => {
        cancel = cancelRequest;
      }),
    });

    window[CANCEL_TOKEN] = cancel;

    return request;
  },

  /**
   * @description Remove user
   * @param {Number} id
   * @returns {Promise}
   */
  remove(id) {
    let cancel;
    const CANCEL_TOKEN = `${NAMESPACE}_REMOVE`;
    const request = resource.remove(`${endpoint.user.remove}/${id}`, {
      cancelToken: new AxiosCancelToken((cancelRequest) => {
        cancel = cancelRequest;
      }),
    });

    window[CANCEL_TOKEN] = cancel;

    return request;
  },
};
