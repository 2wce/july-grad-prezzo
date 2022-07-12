import { Button, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import { Form, Formik, FormikProps } from 'formik'
import { useSignupMutation } from 'generated/graphql'
import * as React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { StrapiLoginPayload } from 'utils'
import * as Yup from 'yup'
import { MotionFlex, SideSlider } from '../../components'
import { ConnectedFormGroup } from '../../components/FormElements'
import { ERROR_TOAST, SUCCESS_TOAST } from '../../constants'
import { useAuthContext } from '../../context/AuthProvider'
import { PageWrap } from '../../layouts'
import { images, theme } from '../../theme'
import { formatError } from '../../utils'

type RegisterProps = {}

const RegisterFormValidation = Yup.object().shape({
  name: Yup.string().required('A name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('An email address is required')
})

type RegisterValues = {
  name: string
  email: string
}

const Register: React.FC<RegisterProps> = () => {
  const { user, persistUser } = useAuthContext()
  const history = useHistory()

  const toast = useToast()

  const [register] = useSignupMutation({
    onCompleted: (data) => {
      if (persistUser) {
        persistUser(data.signup as StrapiLoginPayload, true)
      }

      toast({ description: 'Successfully registered.', ...SUCCESS_TOAST })
    },
    onError: () => {
      toast({ description: 'There was an error creating user.', ...ERROR_TOAST })
    }
  })

  React.useEffect(() => {
    if (user) {
      history.push('/auth/user-management')
    }
    // eslint-disable-next-line
  }, [user])

  return (
    <PageWrap
      pt={0}
      title="Register"
      align="center"
      justify="center"
      backgroundSize="cover"
      bgImage={`url(${images.bg})`}
    >
      <SideSlider>
        <Flex width="100%">
          <Heading as="h3" textAlign="left" mb={4}>
            Register
          </Heading>
        </Flex>
        <Formik
          validationSchema={RegisterFormValidation}
          initialValues={{
            name: '',
            email: ''
          }}
          onSubmit={async (input, { setStatus, setSubmitting }) => {
            setStatus(null)
            try {
              setSubmitting(true)
              if (register) {
                await register({ variables: { input } })
              }
              setSubmitting(false)
            } catch (error) {
              setStatus(formatError(error as Record<string, unknown>))
            }
          }}
        >
          {({ isSubmitting, status }: FormikProps<RegisterValues>) => (
            <Form style={{ width: '100%' }}>
              <ConnectedFormGroup name="name" label="Name" placeholder="Name" />
              <ConnectedFormGroup name="email" label="Email" placeholder="Email" type="email" />
              {status && (
                <MotionFlex initial={{ opacity: 0 }} animate={{ opacity: 1 }} mb={2} width="100%">
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
              <Flex mt={4} align="center" justify="center">
                <Text>
                  Already signed up?{' '}
                  <Link style={{ color: theme.colors.blue[500] }} to="/">
                    Login
                  </Link>{' '}
                </Text>
              </Flex>
            </Form>
          )}
        </Formik>
      </SideSlider>
    </PageWrap>
  )
}

export default Register
