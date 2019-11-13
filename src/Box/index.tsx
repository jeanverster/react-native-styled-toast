import styled from 'styled-components/native'
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  color,
  ColorProps,
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps
} from 'styled-system'

export const systemProps = compose(
  space,
  layout,
  color,
  flexbox,
  background,
  border,
  position,
  shadow
)

export type BoxProps = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  BackgroundProps &
  BorderProps &
  PositionProps &
  ShadowProps & {
    elevation?: number
  }

const Box = styled.View<BoxProps>(systemProps)

export default Box

Box.defaultProps = {
  justifyContent: 'center',
  position: 'relative'
}
