import axios from 'axios';
import handler from './handler';
import * as Storage from '@/utils/storage';
import * as AUTHENTICATION from '@/store-namespace/authentication/types';
import { base64Decode } from '@/utils/security';

const ENVIRONMENT = process.env.VUE_APP_STAGE || 'local';
const CONFIG_ENVIRONMENT = require(`@/config/${ENVIRONMENT.toLowerCase()}.json`);

const { apiBaseUrl, apiKey } = CONFIG_ENVIRONMENT.env;

function createResource() {
  const instance = axios.create({
    baseURL: apiBaseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = Storage.getStorage(AUTHENTICATION.TOKEN_NAME);

      if (token) {
        const decodedToken = base64Decode(token);
        config.headers.Authorization = `Bearer ${decodedToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
    },
    (error) => {
      return handler(error);
    }
  );

  return instance;
}

export default createResource();
