import axios from 'axios';
import endpoint from './endpoint';
import resource from '@/api/resource';

const AxiosCancelToken = axios.CancelToken;
const NAMESPACE = 'AUTH';

export default {
  login(payload) {
    let cancel;
    const CANCEL_TOKEN = `${NAMESPACE}_LOGIN`;
    const request = resource.post(`${endpoint.authentication.login}`, payload, {
      cancelToken: new AxiosCancelToken((cancelRequest) => {
        cancel = cancelRequest;
      }),
    });

    window[CANCEL_TOKEN] = cancel;

    return request;
  },

  currentUser() {
    let cancel;
    const CANCEL_TOKEN = `${NAMESPACE}_CURRENT_USER`;
    const request = resource.get(`${endpoint.authentication.currentUser}`, {
      cancelToken: new AxiosCancelToken((cancelRequest) => {
        cancel = cancelRequest;
      }),
    });

    window[CANCEL_TOKEN] = cancel;

    return request;
  },

  logout() {
    let cancel;
    const CANCEL_TOKEN = `${NAMESPACE}_LOGOUT`;
    const request = resource.post(
      `${endpoint.authentication.logout}`,
      {},
      {
        cancelToken: new AxiosCancelToken((cancelRequest) => {
          cancel = cancelRequest;
        }),
      }
    );

    window[CANCEL_TOKEN] = cancel;

    return request;
  },
};
