// import { NavigationActions, StackActions } from 'react-navigation'
// import { combineEpics, ofType } from 'redux-observable'
// import { PlainAction } from 'redux-typed-actions'
// import { Observable, of } from 'rxjs'
// import { catchError, exhaustMap, map } from 'rxjs/operators'
// import { GlobalLoadingSetup, GlobalModalSetup } from 'shared/components'
// import { translate } from 'shared/translate/translate'
// import { LoginFailed, LoginRequest, LoginSuccess } from './actions'

// // app
// const loginRequestEpic$ = (action$: Observable<PlainAction>)=>
//   action$.pipe(
//     ofType(LoginRequest.type),
//     exhaustMap(action => {
//       GlobalLoadingSetup.getLoading().isVisible()
//       return request<any>({
//         method: 'POST',
//         url: 'rest/retailer/auth.html',
//         param: action.payload
//       }).pipe(
//         map((value) => {
//           if ((value as any).jwt) {
//             // login success navigation next screen
//             GlobalLoadingSetup.getLoading().isHide()
//             return LoginSuccess.get(value as any)
//           }
//           // login faild
//           GlobalLoadingSetup.getLoading().isHide()
//           GlobalModalSetup.getGlobalModalHolder().alertMessage(translate('login:title'),
//             (value as any).message)
//           return LoginFailed.get((value as any))
//         }),
//         catchError((error: any) => {
//           GlobalLoadingSetup.getLoading().isHide()
//           return of(LoginFailed.get(error))
//         }
//         )
//       )
//     }))


// export const loginEpics = combineEpics(loginRequestEpic$)
