import { log } from "shared/system"
import { PlainAction } from "redux-typed-actions"
import { clearAppConfig, saveAppConfig } from "./store"
import { BlankAction, ChangeLanguage, Login, SetAppConfig, SignOut } from "./actions"
import { combineReducers } from "redux"
import { homeReducer } from 'pages/Home/redux/reducer'
const appStateReducer = (
  state: any = {
    config: {},
  },
  action: PlainAction
) => {
  log('\x1b[33m', action.type) // , '\x1b[37m', JSON.stringify(state))
  if (SetAppConfig.is(action)) {
    const config = {
      ...action.payload,
      config: {
        ...state.config,
        ...action.payload.config
      }
    }
    log(`storage gonna save: ${JSON.stringify(config, null, ' ')}`)
    saveAppConfig(config)
    return {
      ...state,
      ...config
    }
  }
  if (BlankAction.is(action)) {
    return {
      ...action.payload,
      config: action.payload.config
    }
  }
  if (SignOut.is(action)) {
    const defaultConfig = {
      config: state.config,
    }
    clearAppConfig(defaultConfig, true)
    return {
      ...defaultConfig
    }
  }
  if (ChangeLanguage.is(action)) {
    saveAppConfig({ config: {language: action.payload} })
    return {
      ...state,
      config: {
        language: action.payload
      }
    }
  }
  if (Login.is(action)) {
    return { ...state, isLogged: true }
  }
  return state
}
export const mapReducers = combineReducers({
  rootApp: appStateReducer,
  homeStore: homeReducer
})