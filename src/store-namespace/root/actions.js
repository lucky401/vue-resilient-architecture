import * as TYPES from './types';

export default {
  [TYPES.FETCH_ERROR_DETAIL]({ commit, state }, payload) {
    if (!payload) {
      commit(TYPES.SET_STATE, {
        accessor: 'errorMessage',
        value: 'Terjadi kekeliruan pada sistem kami. Silahkan coba lagi.',
      });
    }

    const { data = {}, status, actionName = 'root' } = payload;

    const { error_code, message, errors } = data;

    const messageValue = { ...state.errorMessage };

    if (status === 401 && error_code === 'unauthorized') {
      messageValue[actionName] =
        message || 'Anda tidak memiliki akses untuk melakukan tindakan ini.';
      commit(TYPES.SET_STATE, {
        accessor: 'errorMessage',
        value: messageValue,
      });
    } else if (status === 404) {
      messageValue[actionName] =
        message || 'Data yang Anda minta tidak ditemukan.';
      commit(TYPES.SET_STATE, {
        accessor: 'errorMessage',
        value: messageValue,
      });
    } else if (status === 400) {
      messageValue[actionName] =
        message || 'Terjadi kekeliruan saat memasukan data.';
      commit(TYPES.SET_STATE, {
        accessor: 'errorMessage',
        value: messageValue,
      });

      const errorsValue = { ...state.errors };
      errorsValue[actionName] = errors || {};
      commit(TYPES.SET_STATE, {
        accessor: 'errors',
        value: errorsValue,
      });
    } else if (status === 500) {
      messageValue[actionName] =
        message || 'Terjadi kekeliruan saat memasukan data.';
      commit(TYPES.SET_STATE, {
        accessor: 'errorMessage',
        value: messageValue,
      });
    } else {
      messageValue[actionName] =
        message ||
        'Terjadi suatu kekeliruan pada sistem kami. Silahkan coba lagi.';
      commit(TYPES.SET_STATE, {
        accessor: 'errorMessage',
        value: messageValue,
      });
    }
  },

  [TYPES.FETCH_CLEAR_ERROR_DETAIL]({ commit, state }, payload) {
    if (!payload) return;

    const { actionName = 'root' } = payload;

    const messageValue = { ...state.errorMessage };
    delete messageValue[actionName];
    commit(TYPES.SET_STATE, {
      accessor: 'errorMessage',
      value: messageValue,
    });

    const errorsValue = { ...state.errors };
    delete errorsValue[actionName];
    commit(TYPES.SET_STATE, {
      accessor: 'errors',
      value: errorsValue,
    });
  },
};
