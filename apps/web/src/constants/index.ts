import { IToast } from '@chakra-ui/react'

export const APP_NAME = 'Core React Boilerplate'

export const STRAPI_USER_STORAGE_KEY = 'strapi-user'

export const CLIENT_HOST = process.env.REACT_APP_CLIENT_HOST

// Development
export const IS_PROD = process.env.NODE_ENV === 'production'

export const PASSWORD_REGEX_MESSAGE =
  'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1' +
  ' number and 1 special character'

export const SUCCESS_TOAST: IToast = {
  duration: 6000,
  isClosable: true,
  title: 'Success!',
  status: 'success',
  position: 'bottom-right'
}

export const ERROR_TOAST: IToast = {
  duration: 6000,
  title: 'Oops!',
  status: 'error',
  isClosable: true,
  position: 'bottom-right'
}

export const DATE_FORMAT = 'DD/MM/YYYY'

export const PHONE_NUMBER_REGEX = new RegExp('^([0]{1})?([1-9]{1}[0-9]{8})$')

export const COUNTRY_CODE = '+27'

export const EMPTY_FILE: any = {
  id: '',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  name: '',
  hash: '',
  mime: '',
  size: 0,
  url: '',
  provider: ''
}

export const WARNING_TOAST: IToast = {
  duration: 6000,
  title: 'Oops!',
  status: 'warning',
  isClosable: true,
  position: 'bottom-right'
}
