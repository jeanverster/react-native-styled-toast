import { Animated } from 'react-native'
import styled from 'styled-components/native'
import {
  borderColor,
  BorderColorProps,
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

type StyledToastProps = SpaceProps &
  ColorProps &
  TopProps &
  BorderColorProps & {
    accentColor?: string
  }

export const StyledToast = styled(Animated.View)<StyledToastProps>`
  ${top};
  ${color};
  ${space};
  ${borderColor};
  width: 100%;
  z-index: 1000;
  border-width: 1;
  min-height: 50px;
  border-radius: 4px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`

StyledToast.defaultProps = {
  bg: 'background',
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
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  align-items: center;
  justify-content: center;
`
