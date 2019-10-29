import { Animated } from 'react-native'
import styled from 'styled-components/native'
import {
  color,
  ColorProps,
  fontSize,
  FontSizeProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
  top,
  TopProps
} from 'styled-system'

type StyledToastProps = {
  accentColor?: string
}

export const StyledToast = styled(Animated.View)<SpaceProps & ColorProps & TopProps & StyledToastProps>`
  ${top};
  ${color};
  ${space};
  width: 100%;
  z-index: 1000;
  min-height: 50px;
  border-radius: 4px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  box-shadow: 0 0px 2px rgba(30, 30, 30, 0.2);
`

StyledToast.defaultProps = {
  bg: 'muted',
  accentColor: 'success'
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
  font-weight: bold;
`

Heading.defaultProps = {
  fontSize: 4,
  color: 'text'
}

export const SubText = styled.Text<TextProps>`
  ${space};
  ${color};
  ${fontSize};
  ${textAlign};
  flex-wrap: wrap;
  font-weight: bold;
`

SubText.defaultProps = {
  fontSize: 1,
  color: 'text'
}

export const IconCont = styled.View<SpaceProps>`
  ${space};
  align-items: center;
`
