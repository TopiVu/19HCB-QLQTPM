import { Dimensions } from "react-native"

export const DEVICE_WIDTH = Dimensions.get('window').width
const DESIGN_WIDTH = 375
export const DEVICE_HEIGHT = Dimensions.get('window').height
const DESIGN_HEIGHT = 667
export const ratioW = DEVICE_WIDTH / DESIGN_WIDTH
export const ratioH = DEVICE_HEIGHT / DESIGN_HEIGHT
export const percentScreen = (DESIGN_WIDTH/DESIGN_HEIGHT) / (DEVICE_WIDTH/DEVICE_HEIGHT)


export const ColorTheme = '#3B7591' 
export const ColorThemeOrgan =  '#F2BB44'
export const ColorContentTheme = '#FFFFFF'

export function log(...arg: any[]) {
  if (__DEV__) {
    console.info(arg.map(i => (['string', 'number'].indexOf(typeof i) === -1 ? JSON.stringify(i, null, ' ') : i)).join(` `))
  }
}