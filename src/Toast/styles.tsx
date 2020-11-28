import { Animated, TouchableOpacity } from 'react-native'
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
  fontSize,
  FontSizeProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
  opacity,
  OpacityProps
} from 'styled-system'

export const systemProps = compose(
  space,
  layout,
  color,
  flexbox,
  background,
  border,
  position,
  shadow,
  opacity
)

export type StyledToastProps = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  BackgroundProps &
  BorderProps &
  PositionProps &
  ShadowProps & {
    elevation?: number
    accentColor?: string
  } & OpacityProps

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

export const StyledToast = styled(AnimatedTouchable)<StyledToastProps>(systemProps)

StyledToast.defaultProps = {
  py: 2,
  mb: 4,
  flex: 1,
  zIndex: 1000,
  width: '100%',
  bg: 'background',
  borderWidth: '1px',
  borderRadius: '4px',
  alignItems: 'center',
  flexDirection: 'row',
  accentColor: 'success',
  justifyContent: 'center',
  borderColor: 'border',
  opacity: 1
}

export const Accent = styled.View<ColorProps>`
  ${color};
  top: 0;
  left: 0;
  bottom: 0;
  width: 4px;
  position: absolute;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`

export type TextProps = SpaceProps & ColorProps & TextAlignProps & FontSizeProps

export const Heading = styled.Text<TextProps>`
  ${space};
  ${color};
  ${fontSize};
  ${textAlign};
  flex-wrap: wrap;
  font-weight: normal;
`

Heading.defaultProps = {
  fontSize: 2,
  color: 'text'
}

export const SubText = styled.Text<TextProps>`
  ${space};
  ${color};
  ${fontSize};
  ${textAlign};
  flex-wrap: wrap;
  font-weight: normal;
`

SubText.defaultProps = {
  fontSize: 1,
  color: 'text'
}

export const IconCont = styled.View<SpaceProps>`
  ${space};
  align-items: center;
  justify-content: center;
`

export const CloseButtonCont = styled.TouchableOpacity<SpaceProps>`
  ${space};
  align-items: center;
  justify-content: center;
`
