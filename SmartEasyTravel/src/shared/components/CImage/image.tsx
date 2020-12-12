import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'


interface Props {
  source?: any
  url?: string
  style: StyleProp<ViewStyle> | any
  resizeMode: 'cover' | 'contain' | 'stretch' | 'center'
}

export const CImage = (props: Props) => {

  let url = ''

  if (props.url) {
    if (props.url.includes('http') || props.url.includes('https')) {
      url = props.url
    } else {
      url = `${''}${props.url}`
    }
  }

  return <FastImage
    style={props.style}
    source={props.source || { uri: url }}
    resizeMode={props.resizeMode === 'cover' ? FastImage.resizeMode.cover : props.resizeMode}
  />
}
