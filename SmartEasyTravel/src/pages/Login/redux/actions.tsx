import { defineAction } from 'redux-typed-actions'

export const LoginRequest = defineAction<any>('LOGIN_REQUEST')
export const LoginSuccess = defineAction<any>('LOGIN_SUCCESS')
export const LoginFailed = defineAction<any>('LOGIN_FAILED')
