import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { STRAPI_USER_STORAGE_KEY } from './constants/index'
import { fetchJwt } from './utils'

const httpLink = createHttpLink({
  uri: 'http://localhost:3456/graphql'
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = fetchJwt()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const errorLink = onError(({ response }) => {
  if (response?.errors && response.errors[0].message === 'Invalid token.') {
    window.localStorage.removeItem(STRAPI_USER_STORAGE_KEY)
    window.sessionStorage.removeItem(STRAPI_USER_STORAGE_KEY)
    window.location.replace(process.env.REACT_APP_CLIENT_HOST || '')
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(errorLink).concat(httpLink)
})

export default client
