import { createAction } from '.'

export const REDIRECT_AUTH_SPOTIFY = 'REDIRECT_AUTH_SPOTIFY'
export const SUCCESS_AUTH_SPOTIFY = 'SUCESS_AUTH_SPOTIFY'
export const POST_TRANSFER_TO_SPOTIFY = 'POST_TRANSFER_TO_SPOTIFY'
export const CLEAR_DATA_SPOTIFY = 'CLEAR_DATA_SPOTIFY'
export const TRANSFER_END = 'TRANSFER_END'

export const redirectAuthSpotify = createAction(REDIRECT_AUTH_SPOTIFY)
export const successAuthSpotify = createAction(SUCCESS_AUTH_SPOTIFY)
export const postTransferToSpotify = createAction(POST_TRANSFER_TO_SPOTIFY)
export const clearDataSpotify = createAction(CLEAR_DATA_SPOTIFY)
export const transferEnd = createAction(TRANSFER_END)
