import * as React from 'react'
import { Animated, TouchableOpacity, Vibration } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Box, { BoxProps } from '../Box'
import Icon from '../Icon'
import { Accent, Heading, IconCont, StyledToast, StyledToastProps, SubText, TextProps } from './styles'

type IconFamilies =
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial'

export type ToastConfig = {
  accentColor?: string
  animationType?: 'slide' | 'scale' | 'fade'
  bg?: string
  closeButtonStyles?: BoxProps
  closeIconColor?: string
  closeIconFamily?: IconFamilies
  closeIconName?: string
  closeIconSize?: number
  color?: string
  duration?: number
  hideAccent?: boolean
  hideIcon?: boolean
  iconColor?: string
  iconFamily?: IconFamilies
  iconName?: string
  intent?: 'SUCCESS' | 'ERROR' | 'INFO'
  message: string
  onPress?: () => void
  messageProps?: TextProps
  subMessageProps?: TextProps
  shouldVibrate?: boolean
  subMessage?: string
  toastStyles?: StyledToastProps
  hideCloseIcon?: boolean
  iconSize?: number
  allowFontScaling?: boolean
  shadow?: {
    shadowColor?: string
    shadowOffset?: {
      width: number
      height: number
    }
    shadowOpacity?: number
    shadowRadius?: number
    elevation?: number
  }
}

const statusBarHeight = getStatusBarHeight()

export type ToastInternalConfig = {
  id?: string
  index?: number
  position?: 'TOP' | 'BOTTOM'
  onClose?: (id: string) => void
}

const offset = statusBarHeight + 16

const shadowDefault = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 0
  },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 1
}

const DEFAULT_PROPS: ToastConfig = {
  duration: 3000,
  intent: 'SUCCESS',
  onPress: () => false,
  shouldVibrate: false,
  closeIconColor: 'text',
  message: 'Toast message!',
  messageProps: {},
  subMessageProps: {},
  hideIcon: false,
  animationType: 'slide',
  toastStyles: {
    borderColor: 'border',
    bg: 'background'
  },
  closeButtonStyles: {
    p: 2,
    mx: 2,
    bg: 'muted',
    borderRadius: 4,
    alignItems: 'center'
  },
  hideCloseIcon: false,
  allowFontScaling: true
}

export const Toast: React.FC<ToastConfig & ToastInternalConfig> = ({
  accentColor,
  animationType,
  closeIconColor,
  closeIconFamily,
  closeIconName,
  closeIconSize,
  color,
  duration,
  hideIcon,
  iconColor,
  iconFamily,
  iconName,
  id,
  index,
  intent,
  message,
  messageProps,
  onClose,
  onPress,
  position,
  shouldVibrate,
  subMessage,
  subMessageProps,
  toastStyles,
  hideAccent,
  closeButtonStyles,
  hideCloseIcon,
  iconSize,
  allowFontScaling,
  shadow = shadowDefault
}) => {
  const isSuccess = intent === 'SUCCESS'
  const isInfo = intent === 'INFO'
  const topOffset = offset + 60 * (index || 0)

  const animation = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      if (duration !== 0) {
        const timer = setTimeout(() => {
          if (index === 0) {
            clearTimeout(timer)
          }
          id && onClose && onClose(id)
        }, duration)
      }
    })
    if (shouldVibrate) {
      Vibration.vibrate(10)
    }
  }, [])

  const translateY = animation.interpolate({
    inputRange: [0, 0.5],
    outputRange: [position === 'BOTTOM' ? topOffset : -topOffset, 0]
  })

  const scale = animation.interpolate({
    inputRange: [0, 0.5],
    outputRange: [0.8, 1],
    extrapolate: 'clamp'
  })

  const opacity = animation.interpolate({
    inputRange: [0, 0.5],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  })

  const getStyles = () => {
    switch (animationType) {
      case 'fade':
        return { opacity, ...shadow }
      case 'scale':
        return { transform: [{ scale }], opacity, ...shadow }
      default:
        return { transform: [{ translateY }, { scale }], ...shadow }
    }
  }

  return (
    <StyledToast
      onPress={() => {
        onPress && onPress()
        onClose && id && onClose(id)
      }}
      style={getStyles()}
      {...toastStyles}
      pr={!!subMessage ? 2 : 0}
    >
      {!hideAccent && (
        <Accent
          testID="toast-accent"
          bg={!!accentColor ? accentColor : isSuccess ? 'success' : isInfo ? 'info' : 'error'}
        />
      )}

      {!hideIcon && (
        <IconCont px={4}>
          <Icon
            size={iconSize || 20}
            family={iconFamily || 'Feather'}
            color={!!iconColor ? iconColor : isSuccess ? 'success' : isInfo ? 'info' : 'error'}
            name={!!iconName ? iconName : isSuccess ? 'check-circle' : isInfo ? 'alert-circle' : 'x-circle'}
          />
        </IconCont>
      )}
      <Box alignItems="flex-start" flex={1} pl={hideIcon ? 4 : 0} pr={!!subMessage ? 2 : 0} py={2}>
        <Box flexDirection="row" flexWrap="wrap" flex={1}>
          <Heading color={color} {...messageProps} allowFontScaling={allowFontScaling}>
            {message}
          </Heading>
        </Box>
        {!!subMessage && (
          <SubText color={color} mt={1} {...subMessageProps} allowFontScaling={allowFontScaling}>
            {subMessage}
          </SubText>
        )}
      </Box>
      {!hideCloseIcon && (
        <TouchableOpacity onPress={() => onClose && id && onClose(id)}>
          <Box {...Object.assign({}, DEFAULT_PROPS.closeButtonStyles, closeButtonStyles)}>
            <Icon
              size={closeIconSize || 20}
              family={closeIconFamily || 'Feather'}
              name={closeIconName || 'x'}
              color={closeIconColor}
            />
          </Box>
        </TouchableOpacity>
      )}
    </StyledToast>
  )
}

export default React.memo(Toast)

Toast.defaultProps = DEFAULT_PROPS
