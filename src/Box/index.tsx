import styled from 'styled-components/native'
import {
  alignItems,
  AlignItemsProps,
  alignSelf,
  AlignSelfProps,
  borderRadius,
  BorderRadiusProps,
  borders,
  BordersProps,
  bottom,
  BottomProps,
  boxShadow,
  BoxShadowProps,
  color,
  ColorProps,
  compose,
  flex,
  flexDirection,
  FlexDirectionProps,
  FlexProps,
  flexWrap,
  FlexWrapProps,
  height,
  HeightProps,
  justifyContent,
  JustifyContentProps,
  left,
  LeftProps,
  maxWidth,
  MaxWidthProps,
  minHeight,
  MinHeightProps,
  minWidth,
  MinWidthProps,
  opacity,
  OpacityProps,
  overflow,
  OverflowProps,
  position,
  PositionProps,
  right,
  RightProps,
  space,
  SpaceProps,
  top,
  TopProps,
  width,
  WidthProps,
  zIndex,
  ZIndexProps
} from 'styled-system'

export const systemProps = compose(
  alignItems,
  alignSelf,
  borderRadius,
  borders,
  bottom,
  boxShadow,
  color,
  flex,
  flexDirection,
  flexWrap,
  height,
  justifyContent,
  left,
  maxWidth,
  minHeight,
  minWidth,
  opacity,
  overflow,
  position,
  right,
  space,
  top,
  width,
  zIndex
)

export type BoxProps = AlignItemsProps &
  AlignSelfProps &
  BorderRadiusProps &
  BordersProps &
  BottomProps &
  BoxShadowProps &
  ColorProps &
  FlexProps &
  FlexDirectionProps &
  FlexWrapProps &
  HeightProps &
  JustifyContentProps &
  LeftProps &
  MaxWidthProps &
  MinHeightProps &
  MinWidthProps &
  OpacityProps &
  OverflowProps &
  PositionProps &
  RightProps &
  SpaceProps &
  TopProps &
  WidthProps &
  ZIndexProps & {
    elevation?: number
  }

const Box = styled.View<BoxProps>(systemProps)

export default Box

Box.defaultProps = {
  justifyContent: 'center',
  position: 'relative'
}
