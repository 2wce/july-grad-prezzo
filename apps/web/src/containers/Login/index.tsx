import { Button, Flex, Heading, Text, theme, useToast } from '@chakra-ui/react'
import { Form, Formik, FormikProps } from 'formik'
import { LocationDescriptorObject } from 'history'
import * as React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { StrapiLoginPayload } from 'utils'
import * as Yup from 'yup'
import { MotionFlex, SideSlider } from '../../components'
import { ConnectedCheckbox, ConnectedFormGroup } from '../../components/FormElements'
import { ERROR_TOAST, SUCCESS_TOAST } from '../../constants'
import { useAuthContext } from '../../context/AuthProvider'
import { useLoginLazyQuery } from '../../generated/graphql'
import { PageWrap } from '../../layouts'
import { images } from '../../theme'
import { formatError } from '../../utils'

const LoginFormValidation = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('An email address is required')
})

type LoginProps = {}

type InitialValues = {
  email: string
  rememberMe: boolean
}

const Login: React.FC<LoginProps> = () => {
  const { isAuthenticated, persistUser } = useAuthContext()

  const history = useHistory()
  const location = useLocation<{ email?: string; redirectTo?: LocationDescriptorObject }>()

  const toast = useToast()

  const [login] = useLoginLazyQuery({
    onCompleted: (data) => {
      if (persistUser) {
        persistUser(data.login as StrapiLoginPayload, true)
      }
      toast({ description: 'User login.', ...SUCCESS_TOAST })
    },
    onError: () => {
      toast({ description: 'There was an error login.', ...ERROR_TOAST })
    }
  })

  React.useEffect(() => {
    if (isAuthenticated) {
      let to: LocationDescriptorObject = { pathname: '/auth/user-management' }
      if (location.state?.redirectTo) {
        to = { pathname: location.state.redirectTo.pathname }
      }
      history.push(to)
    }
    // eslint-disable-next-line
  }, [isAuthenticated])

  return (
    <PageWrap
      align="center"
      title="Login"
      backgroundSize="cover"
      bgImage={`url(${images.bg})`}
      justify="center"
      pt={0}
    >
      <SideSlider>
        <Flex width="100%">
          <Heading as="h3" textAlign="left" mb={4}>
            Login
          </Heading>
        </Flex>
        <Formik
          validationSchema={LoginFormValidation}
          initialValues={{
            email: location.state?.email || '',
            rememberMe: false
          }}
          onSubmit={async ({ email }, { setSubmitting, setStatus }) => {
            setStatus(null)
            try {
              setSubmitting(true)
              if (login) {
                await login({ variables: { input: { email } } })
              }
              setSubmitting(false)
            } catch (error) {
              setStatus(formatError(error as Record<string, unknown>))
            }
          }}
        >
          {({ isSubmitting, status }: FormikProps<InitialValues>) => (
            <Form style={{ width: '100%' }}>
              <ConnectedFormGroup name="email" label="Email" placeholder="Email" />

              <ConnectedCheckbox mb={1} name="rememberMe" label="Remember Me" />
              {status && (
                <MotionFlex
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  justify="center"
                  mb={2}
                  width="100%"
                >
                  <Text textAlign="right" color="red.500">
                    {status}
                  </Text>
                </MotionFlex>
              )}
              <Button
                mt={4}
                width="100%"
                type="submit"
                colorScheme="brand"
                isLoading={isSubmitting}
              >
                SUBMIT
              </Button>
              <Flex mb={2} mt={4} align="center" justify="center">
                <Text>
                  Don&apos;t have an account?{' '}
                  <Link style={{ color: theme.colors.blue[500] }} to="/register">
                    Sign Up
                  </Link>{' '}
                </Text>
              </Flex>
              <Flex mb={2} align="center" justify="center">
                <Link style={{ color: theme.colors.blue[500] }} to="/forgot-password">
                  Forgot Password
                </Link>{' '}
              </Flex>
            </Form>
          )}
        </Formik>
      </SideSlider>
    </PageWrap>
  )
}

export default Login
