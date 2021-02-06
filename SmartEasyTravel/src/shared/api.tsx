import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { store } from 'core/root'
import _ from 'lodash'
import { from, Observable } from 'rxjs'
import { exhaustMap, map, tap } from 'rxjs/operators'
import { DOMAIN, log as SysLog } from './system'
declare interface Dictionary<T> {
  [index: string]: T
}

export class Header {
  private data: Dictionary<string | number>

  constructor(key: Dictionary<string | number> = {}) {
    this.data = {
      // appVersion: DeviceInfo.getVersion(),
      appVersion: '1.0',
      ..._.pickBy(key, _.identity)
    }
  }

  getSnapshot() {
    return this.data
  }

  setHeader(key: Dictionary<string | number>) {
    this.data = { ...this.data, ..._.pickBy(key, _.identity) }
  }
}
interface RequestParam {
  url: string
  method: 'POST' | 'GET' | 'DELETE' | 'PUT'
  token: boolean
  param?: any
  option?: {
    port?: 'API' | 'ELASTIC'
    format?: 'form' | 'json'
  }
}

export function request<T>(param: RequestParam): Observable<T> {
  const headers = new Header()

  let url =  `${DOMAIN}${param.url}`
  const parameters = param.param
  if (param.option && param.option.format === 'json') {
    headers.setHeader({ 'Content-Type': 'application/json' })
    headers.setHeader({ accept: 'application/json' })
  } else {
    headers.setHeader({ 'Content-Type': 'application/x-www-form-urlencoded' })
  }

  const language = (store.getState() as any).rootApp.config.language
  headers.setHeader({ 'Accept-Language': language })

  console.info('Log_header', headers)

  return from(AsyncStorage.getItem('access_token')).pipe(
    tap((value: any) => value && param.token && headers.setHeader({ Authorization: `Bearer ${value}` })),
    exhaustMap(() => {
      return from(
        axios.request({
          url,
          timeout: 30000,
          headers: headers.getSnapshot(),
          method: param.method || 'POST',
          params: parameters,
          ...(param.option && param.option.format === 'json' ? { data: parameters, params: {} } : { params: parameters })
        })
      ).pipe(
        map(result => {
          if (!result.data) {
            // const resetAction = StackActions.reset({
            //   index: 0,
            //   actions: [NavigationActions.navigate({ routeName: 'Auth' })]
            // })
            // store.dispatch(resetAction)
            // store.dispatch(SignOut.get())
          }
          return result.data as any
        }),
        tap(result => logResult(url, parameters, result))
      )
    })
  )
}

function logResult(url: string, parameters: any, result: any) {
  SysLog('=============== REQUEST ===============\n', '\nURL: ', url, '\nParam: ', JSON.stringify(parameters, null, ' '))
  SysLog('=============== RESPONSE ===============\n', JSON.stringify(result, null, ' ') || true, '\n=======================================')
}
