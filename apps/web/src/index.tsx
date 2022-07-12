import { ApolloProvider } from '@apollo/react-hooks'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { css, Global } from '@emotion/react'
import React from 'react'
import 'react-dates/initialize'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'
import client from './apollo'
import App from './App'
import { APP_NAME } from './constants'
import { AppProvider, AuthProvider } from './context'
import * as serviceWorker from './serviceWorker'
import { theme } from './theme'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Helmet titleTemplate={`${APP_NAME} | %s`} />
          <AppProvider>
            <CSSReset />
            <Global
              styles={css`
                * {
                  font-family: ${theme.fonts.body};
                }
              `}
            />
            <App />
          </AppProvider>
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
