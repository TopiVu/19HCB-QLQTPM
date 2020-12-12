import { defineAction } from 'redux-typed-actions'
export const SetAppConfig = defineAction<any>('SET_APP_CONFIG')
export const BlankAction = defineAction<any>('BLANK_ACTION')
export const Login = defineAction<any>('LOGIN')
export const SignOut = defineAction<any>('SIGNOUT')
export const ChangeLanguage = defineAction<any>('CHANGE_LANGUAGE')