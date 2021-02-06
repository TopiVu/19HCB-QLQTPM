import { combineEpics } from "redux-observable"
import { PlainAction } from "redux-typed-actions"
import { BehaviorSubject, Observable, of } from "rxjs"
import { combineLatest, first, map, mergeMap, tap } from  'rxjs/operators'
import { log } from "shared/system"
import { changeLanguage } from "shared/translate/translate"
import { getAppConfig } from "./store"
import { BlankAction } from './actions'
import {loginEpics} from 'pages/Login/redux/epic'
import { homeEpics } from 'pages/Home/redux/epic'
const getConfig$ = (action$: Observable<PlainAction>) =>
  action$.pipe(
    first(),
    combineLatest(getAppConfig()),
    map(([, storedConfig] : any) => {
      const language = (storedConfig?.config && storedConfig.config.language) || 'vi'
      changeLanguage(language)
      log(
        `storage gonna get ${JSON.stringify(
          {
            ...storedConfig,
            config: {
              ...storedConfig.config,
              language
            }
          },
          null,
          ' '
        )}`
      )
      return BlankAction.get({
        ...storedConfig,
        config: {
          ...storedConfig.config,
          language
        }
      })
    })
  )

const merge$ = combineEpics(getConfig$, loginEpics, homeEpics)
export const epics$ = new BehaviorSubject(merge$)
export const rootEpic = (action$: Observable<PlainAction>, state: {}) => {
  // return action$.pipe(tap(_=>of([])))
 return epics$.pipe(mergeMap((epic: any) => epic(action$, state)))
}
