import i18next from 'i18next'
import { reactI18nextModule } from 'react-i18next'

import * as language from './source'



i18next
  .use('vi')
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'vi',
    resources: language,
    ns: ['common'],
    defaultNS: 'common',
    debug: false,
    // cache: {
    //   enabled: true
    // },
    interpolation: {
      escapeValue: false
    }
  })

export function translate(path: string, option?: any): string {
  return i18next.t(path, option)
}
export function changeLanguage(alias: string): void {
  console.log('log_', alias)
  i18next.changeLanguage(alias)
}
export default i18next
