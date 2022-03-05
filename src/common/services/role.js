import axios from 'axios';
import endpoint from './endpoint';
import resource from '@/api/resource';

const AxiosCancelToken = axios.CancelToken;
const NAMESPACE = 'ROLE';

export default {
  /**
   * @description List all roles
   * @param {Object} params
   * @returns {Promise}
   */
  list(params) {
    let cancel;
    const CANCEL_TOKEN = `${NAMESPACE}_LIST`;
    const request = resource.get(`${endpoint.role}`, {
      params,
      cancelToken: new AxiosCancelToken((cancelRequest) => {
        cancel = cancelRequest;
      }),
    });

    window[CANCEL_TOKEN] = cancel;

    return request;
  },
};
