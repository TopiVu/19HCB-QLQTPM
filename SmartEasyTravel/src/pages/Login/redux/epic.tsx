import { SetAppConfig } from 'core/actions'
import { NavigationActions, StackActions } from 'react-navigation'
import { combineEpics, ofType } from 'redux-observable'
import { PlainAction } from 'redux-typed-actions'
import { Observable, of } from 'rxjs'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'shared/api'
import { GlobalLoadingSetup, GlobalModalSetup } from 'shared/components'
import { translate } from 'shared/translate/translate'
import { LoginFailed, LoginRequest, LoginSuccess } from './actions'

// app
const loginRequestEpic$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(LoginRequest.type),
    exhaustMap(action => {
      // GlobalLoadingSetup.getLoading().isVisible()
      return request<any>({
        method: 'POST',
        token: false,
        url: 'auth/login',
        option: {format: 'json'},
        param: action.payload
      }).pipe(
        map((value) => {
          if ((value as any).access_token) {
            // login success navigation next screen
            // GlobalLoadingSetup.getLoading().isHide()
            return LoginSuccess.get(value as any)
          }
          // login faild
          // GlobalLoadingSetup.getLoading().isHide()
          GlobalModalSetup.getGlobalModalHolder().alertMessage('Đăng nhập',
            (value as any).message)
          return LoginFailed.get((value as any))
        }),
        catchError((error: any) => {
          // GlobalLoadingSetup.getLoading().isHide()
          return of(LoginFailed.get(error))
        }
        )
      )
    }))
const setToken$ = (action$: Observable<PlainAction>): Observable<PlainAction> =>
  action$.pipe(
    ofType(LoginSuccess.type),
    map(action => SetAppConfig.get(action.payload))
  )

export const loginEpics = combineEpics(loginRequestEpic$, setToken$)
