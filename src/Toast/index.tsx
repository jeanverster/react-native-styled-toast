import Constants from 'expo-constants'
import * as React from 'react'
import { Animated, Easing, StyleSheet, TouchableOpacity, Vibration } from 'react-native'
import Box from '../Box'
import Icon from '../Icon'
import { Accent, CloseButtonCont, Heading, IconCont, StyledToast, SubText } from './styles'

export type ToastConfig = {
  bg?: string
  color?: string
  message: string
  subMessage?: string
  duration?: number
  onPress?: () => void
  borderColor?: string
  closeIconColor?: string
  shouldVibrate?: boolean
  closeButtonBgColor?: string
  position?: 'TOP' | 'BOTTOM'
  intent?: 'SUCCESS' | 'ERROR'
  closeIconBorderRadius?: number
}

export type ToastInternalConfig = {
  id?: string
  index?: number
  onClose?: (id: string) => void
}

const offset = Constants.statusBarHeight + 16

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 0
  },
  shadowOpacity: 0.1,
  shadowRadius: 1,
  elevation: 1
}

export const Toast: React.FC<ToastConfig & ToastInternalConfig> = ({
  intent,
  message,
  duration,
  onClose,
  id,
  index,
  shouldVibrate,
  onPress,
  borderColor,
  closeButtonBgColor,
  closeIconColor,
  closeIconBorderRadius,
  bg,
  color,
  subMessage
}) => {
  const isSuccess = intent === 'SUCCESS'
  const topOffset = offset + 60 * (index || 0)

  const animation = new Animated.Value(0)

  const removeToast = (id: string) => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true
    }).start(() => {
      onClose && onClose(id)
    })
  }

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
          id && removeToast(id)
        }, duration)
      }
    })
    if (shouldVibrate) {
      Vibration.vibrate(10)
    }
  }, [])

  const translateY = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-topOffset, 0, -topOffset],
    extrapolate: 'clamp'
  })

  const scale = animation.interpolate({
    inputRange: [0, 0.5],
    outputRange: [0.8, 1],
    extrapolate: 'clamp'
  })

  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp'
  })

  return (
    <StyledToast
      mb={4}
      py={2}
      bg={bg}
      borderColor={borderColor}
      style={{ transform: [{ translateY }, { scale }], opacity, ...shadow }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        testID="toast-touchable"
        style={{ ...StyleSheet.absoluteFillObject, flexDirection: 'row' }}
      >
        <Accent testID="toast-accent" bg={isSuccess ? 'success' : 'error'} />
        <IconCont px={4}>
          <Icon
            size={20}
            family="Feather"
            name={isSuccess ? 'check-circle' : 'x-circle'}
            color={isSuccess ? 'success' : 'error'}
          />
        </IconCont>
        <Box flex={1} alignItems="flex-start">
          <Heading color={color}>{message}</Heading>
          {!!subMessage && (
            <SubText color={color} mt={2}>
              {subMessage}
            </SubText>
          )}
        </Box>
      </TouchableOpacity>
      <CloseButtonCont onPress={() => onClose && id && onClose(id)}>
        <Box pl={1} p={2} borderRadius={closeIconBorderRadius} mx={2} bg={closeButtonBgColor} alignItems="center">
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
  closeIconBorderRadius: 4,
  borderColor: 'border'
}
