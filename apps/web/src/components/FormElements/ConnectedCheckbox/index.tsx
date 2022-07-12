import { Checkbox, CheckboxProps, Flex, Text } from '@chakra-ui/react'
import { useField } from 'formik'
import * as React from 'react'
import { LabelProps } from '../styles'

export type ConnectedCheckboxProps = LabelProps &
  CheckboxProps & {
    label?: string
    name: string
  }

const ConnectedCheckbox: React.FC<ConnectedCheckboxProps> = ({ label, ...rest }) => {
  const [field, meta] = useField(rest.name)
  return (
    <Flex
      mb={rest.mb}
      ml={rest.ml}
      mr={rest.mr}
      mt={rest.mt}
      width="100%"
      align="center"
      justify={rest.justifyContent}
    >
      <Checkbox {...field} id={field.name} {...rest}>
        {label}
      </Checkbox>
      {meta.touched && meta.error ? (
        <Text color="red.500" textAlign="right">
          {meta.error}
        </Text>
      ) : null}
    </Flex>
  )
}

export default ConnectedCheckbox

ConnectedCheckbox.defaultProps = {
  mb: 2,
  alignItems: 'center',
  justifyContent: 'flex-start'
}
