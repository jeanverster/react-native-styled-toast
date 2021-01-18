import * as React from 'react'
import { Animated, TouchableOpacity, Vibration } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Box from '../Box'
import { BoxProps } from '../Box/index'
import Icon from '../Icon'
import { Accent, Heading, IconCont, StyledToast, StyledToastProps, SubText } from './styles'

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
  shouldVibrate?: boolean
  subMessage?: string
  toastStyles?: StyledToastProps
}

const statusBarHeight = getStatusBarHeight()

export type ToastInternalConfig = {
  id?: string
  index?: number
  position?: 'TOP' | 'BOTTOM'
  onClose?: (id: string) => void
}

const offset = statusBarHeight + 16

const shadow = {
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
  hideIcon: false,
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
  }
}

export const Toast: React.FC<ToastConfig & ToastInternalConfig> = ({
  accentColor,
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
  onClose,
  onPress,
  position,
  shouldVibrate,
  subMessage,
  toastStyles,
  hideAccent,
  closeButtonStyles
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

  return (
    <StyledToast
      onPress={() => {
        onPress && onPress()
        onClose && id && onClose(id)
      }}
      style={{ transform: [{ translateY }, { scale }], ...shadow }}
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
            size={20}
            family={iconFamily || 'Feather'}
            color={!!iconColor ? iconColor : isSuccess ? 'success' : isInfo ? 'info' : 'error'}
            name={!!iconName ? iconName : isSuccess ? 'check-circle' : isInfo ? 'alert-circle' : 'x-circle'}
          />
        </IconCont>
      )}
      <Box alignItems="flex-start" flex={1} pl={hideIcon ? 4 : 0} pr={!!subMessage ? 2 : 0} py={2}>
        <Box flexDirection="row" flexWrap="wrap" flex={1}>
          <Heading color={color}>{message}</Heading>
        </Box>
        {!!subMessage && (
          <SubText color={color} mt={1}>
            {subMessage}
          </SubText>
        )}
      </Box>
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
    </StyledToast>
  )
}

export default React.memo(Toast)

Toast.defaultProps = DEFAULT_PROPS
