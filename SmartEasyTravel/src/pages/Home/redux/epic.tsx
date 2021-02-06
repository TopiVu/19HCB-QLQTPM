import { SetAppConfig } from 'core/actions'
import { NavigationActions, StackActions } from 'react-navigation'
import { combineEpics, ofType } from 'redux-observable'
import { PlainAction } from 'redux-typed-actions'
import { Observable, of } from 'rxjs'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'shared/api'
import { GlobalLoadingSetup, GlobalModalSetup } from 'shared/components'
import { translate } from 'shared/translate/translate'
import { GetTour, GetTourFailed, GetTourSuccess } from './actions'

// app
const getTour$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    ofType(GetTour.type),
    exhaustMap(action => {
      // GlobalLoadingSetup.getLoading().isVisible()
      return request<any>({
        method: 'GET',
        token: false,
        url: 'tourist_package/findByName',
        option: { format: 'json' },
        param: action.payload
      }).pipe(
        map((value) => {
          if ((value as any)) {
            // login success navigation next screen
            // GlobalLoadingSetup.getLoading().isHide()
            return GetTourSuccess.get(value as any)
          }
          // login faild
          // GlobalLoadingSetup.getLoading().isHide()
          GlobalModalSetup.getGlobalModalHolder().alertMessage('Thông báo',
            (value as any).message)
          return GetTourFailed.get((value as any))
        }),
        catchError((error: any) => {
          // GlobalLoadingSetup.getLoading().isHide()
          return of(GetTourFailed.get(error))
        }
        )
      )
    }))


export const homeEpics = combineEpics(getTour$,)
