import { Font } from 'expo';

const loadFonts = async () => {
  await Font.loadAsync({
    'poiret-one-regular': require('../../assets/fonts/PoiretOne-Regular.ttf'),
    'hind-bold': require('../../assets/fonts/Hind-Bold.ttf'),
    'hind-light': require('../../assets/fonts/Hind-Light.ttf'),
    'hind-medium': require('../../assets/fonts/Hind-Medium.ttf'),
    'hind-regular': require('../../assets/fonts/Hind-Regular.ttf'),
    'hind-semi-bold': require('../../assets/fonts/Hind-SemiBold.ttf'),  
  })
}

export {
  loadFonts
}