import * as ReactNative from 'react-native'

export const getLocale = (): string => {
  const { RNI18N } = ReactNative.NativeModules
  switch (ReactNative.Platform.OS) {
      case 'android': return RNI18N.getCurrentLocale(l => l)
      case 'ios': return RNI18N.locale
      default: return 'en'
  }
}