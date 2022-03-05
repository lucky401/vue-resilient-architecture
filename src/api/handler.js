/* eslint-disable no-console */
import axios from 'axios';
import * as Storage from '@/utils/storage';
import router from '@/router';

const errorPrefix = '[ERROR] ';
const errorHandler = {
  somethingWrong() {
    console.error(errorPrefix, 'Something wrong');
  },

  badRequest() {
    console.error(errorPrefix, 'Bad Request');
  },

  unauthenticated() {
    console.error(errorPrefix, 'Unauthenticated');

    Storage.clearStorage();

    delete axios.defaults.headers.common.Authorization;

    router.push({ name: 'login' });
  },

  notAuthorize() {
    console.error(errorPrefix, 'Not Authorize');
  },
};

export default (error) => {
  const response = error.response;

  if (
    typeof response === 'undefined' ||
    typeof response.status === 'undefined'
  ) {
    errorHandler.somethingWrong();
    return Promise.reject(error);
  }

  switch (response.status) {
    case 400:
      errorHandler.badRequest();
      break;
    case 401:
      errorHandler.unauthenticated();
      break;
    case 403:
      errorHandler.notAuthorize();
      break;
    case 302:
      errorHandler.unauthenticated();
      break;
    default:
      break;
  }

  return Promise.reject(error);
};
