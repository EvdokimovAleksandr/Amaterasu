import { createAction } from '.'

export const GET_LIST_ACTION_YM = 'GET_LIST_ACTION_YM'
export const RESPONSE_LIST_LIKED_YM = 'RESPONSE_LIST_LIKED_YM'
export const CLEAR_DATA_YM = 'CLEAR_DATA_YM'

export const getListActionYm = createAction(GET_LIST_ACTION_YM)
export const responseListLikedYm = createAction(RESPONSE_LIST_LIKED_YM)
export const clearDataYm = createAction(CLEAR_DATA_YM)
