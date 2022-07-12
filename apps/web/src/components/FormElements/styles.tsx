import styled from '@emotion/styled'
import {
  color,
  ColorProps,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps
} from 'styled-system'

export type LabelProps = SpaceProps &
  ColorProps &
  TextAlignProps &
  FontSizeProps &
  FontWeightProps & { color?: string }

export const Label = styled.label<LabelProps>`
  ${space};
  ${color};
  ${fontSize};
  ${textAlign};
  ${fontWeight}
`

Label.defaultProps = {
  mt: 1,
  mb: 2,
  fontSize: 'md',
  textAlign: 'left',
  color: 'text.dark'
}
