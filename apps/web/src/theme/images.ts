// v4 causes dynamic image imports to be objects: https://github.com/facebook/create-react-app/issues/9992
export default {
  bg: require('../assets/images/core-bg.jpg')?.default,
  sovtechLogo: require('../assets/images/sovtech-small.png')?.default,
  404: require('../assets/images/404.svg')?.default,
  noData: require('../assets/images/no-data.png')?.default
}
