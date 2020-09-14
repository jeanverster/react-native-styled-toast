import * as React from 'react'
import { Animated, StyleSheet, TouchableOpacity, Vibration } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Box from '../Box'
import Icon from '../Icon'
import { Accent, CloseButtonCont, Heading, IconCont, StyledToast, SubText } from './styles'

export type ToastConfig = {
  bg?: string
  borderColor?: string
  closeButtonBgColor?: string
  closeButtonBorderRadius?: number
  closeIconColor?: string
  color?: string
  duration?: number
  hideIcon?: boolean
  intent?: 'SUCCESS' | 'ERROR' | 'INFO'
  message: string
  onPress?: () => void
  shouldVibrate?: boolean
  subMessage?: string
  iconFamily?:
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial'
  iconName?: string
  iconColor?: string
}

const statusBarHeight = getStatusBarHeight(true)

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

export const Toast: React.FC<ToastConfig & ToastInternalConfig> = ({
  bg,
  borderColor,
  closeButtonBgColor,
  closeButtonBorderRadius,
  closeIconColor,
  color,
  duration,
  hideIcon,
  id,
  index,
  intent,
  message,
  onClose,
  onPress,
  position,
  shouldVibrate,
  subMessage,
  iconFamily,
  iconName,
  iconColor
}) => {
  const isSuccess = intent === 'SUCCESS'
  const topOffset = offset + 60 * (index || 0)

  const animation = new Animated.Value(0)

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
      mb={4}
      py={2}
      bg={bg}
      borderColor={borderColor}
      style={{ transform: [{ translateY }, { scale }], ...shadow }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        testID="toast-touchable"
        style={{ ...StyleSheet.absoluteFillObject, flexDirection: 'row' }}
      >
        <Accent testID="toast-accent" bg={isSuccess ? 'success' : 'error'} />
        {!hideIcon && (
          <IconCont px={4}>
            <Icon
              size={20}
              family={iconFamily || 'Feather'}
              color={!!iconColor ? iconColor : isSuccess ? 'success' : 'error'}
              name={!!iconName ? iconName : isSuccess ? 'check-circle' : 'x-circle'}
            />
          </IconCont>
        )}
        <Box pl={hideIcon ? 4 : 0} flex={1} alignItems="flex-start">
          <Heading color={color}>{message}</Heading>
          {!!subMessage && (
            <SubText color={color} mt={2}>
              {subMessage}
            </SubText>
          )}
        </Box>
      </TouchableOpacity>
      <CloseButtonCont onPress={() => onClose && id && onClose(id)}>
        <Box p={2} mx={2} alignItems="center" bg={closeButtonBgColor} borderRadius={closeButtonBorderRadius}>
          <Icon size={20} family="Feather" name="x" color={closeIconColor} />
        </Box>
      </CloseButtonCont>
    </StyledToast>
  )
}

export default React.memo(Toast)

Toast.defaultProps = {
  duration: 3000,
  intent: 'SUCCESS',
  onPress: () => false,
  shouldVibrate: false,
  closeIconColor: 'text',
  message: 'Toast message!',
  closeButtonBgColor: 'muted',
  closeButtonBorderRadius: 4,
  borderColor: 'border',
  hideIcon: false
}
