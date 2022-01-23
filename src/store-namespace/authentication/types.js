const NAMESPACE = 'AUTHENTICATION';

export const TOKEN_NAME = 'SENTINEL_TOKEN';
export const USER_DATA_NAME = 'SENTINEL_USER_DATA';

/** ************************* For Vuex Module Name ***************************************/
export const MODULE_NAME = 'authentication/';
/*******************************************************************************/

/** ************************* For Mutations ***************************************/
export const SET_STATE = `${NAMESPACE}_SET_STATE`;
/*******************************************************************************/

/** ************************* For Actions ****************************************/
export const FETCH_LOGIN = `${NAMESPACE}_FETCH_LOGIN`;
export const FETCH_LOGOUT = `${NAMESPACE}_FETCH_LOGOUT`;
/*******************************************************************************/

/** ************************* For Getters ****************************************/
export const GET_IS_AUTHENTICATED = `${NAMESPACE}_GET_IS_AUTHENTICATED`;
export const GET_TOKEN = `${NAMESPACE}_GET_TOKEN`;
export const GET_USER_DATA = `${NAMESPACE}_GET_USER_DATA`;
/*******************************************************************************/
