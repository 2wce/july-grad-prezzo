import { ApolloError } from '@apollo/client'
import { UseToastOptions } from '@chakra-ui/react'
import { User } from 'generated/graphql'
import get from 'lodash/get'
import { ReactNode } from 'react'
import { ERROR_TOAST, STRAPI_USER_STORAGE_KEY, WARNING_TOAST } from '../constants'

export type StrapiLoginPayload = {
  jwt: string
  user: User
}

/**
 * Gets JWT of authenticatedUser from either sessionStorage or localStorage
 */
export const fetchJwt = (): string | null => {
  const localUser = localStorage.getItem(STRAPI_USER_STORAGE_KEY)
  const sessionUser = sessionStorage.getItem(STRAPI_USER_STORAGE_KEY)
  const user = sessionUser || localUser

  return user ? JSON.parse(user).jwt : null
}

export function formatError({ response }: Record<string, unknown>): string {
  return get(response, 'data.message[0].messages[0].message', 'An unknown error has occured.')
}

/**
 * function to return a handle errors returned from GraphQL queries/mutations.
 * @param message error message returned and destructured
 * @param toast useToast from Chakra
 * @param description optional *user friendly* message. Recommended
 * not using the graphQL error message.
 * recommended usage:
 * onError: (e) => handleErrors(e, toast, 'fetching your data')
 */

export const handleErrors = (
  { message }: ApolloError | Error,
  toast: (props: UseToastOptions) => ReactNode | void,
  description?: string
): ReactNode | void => {
  if (message.includes('403')) {
    return toast({ description: message, ...WARNING_TOAST })
  }
  return toast({
    description: description
      ? `Something went wrong with ${description}.`
      : message.replace('GraphQL error:', '').trim(),
    ...ERROR_TOAST
  })
}
