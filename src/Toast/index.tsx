import Constants from 'expo-constants'
import * as React from 'react'
import { Animated, Easing, StyleSheet, TouchableOpacity, Vibration } from 'react-native'
import Box from '../Box'
import Icon from '../Icon'
import { Accent, IconCont, StyledToast, SubText } from './styles'

export type ToastConfig = {
  id?: string
  index?: number
  message: string
  duration?: number
  onPress?: () => void
  shouldVibrate?: boolean
  intent?: 'SUCCESS' | 'ERROR'
  onClose?: (id: string) => void
}

const offset = Constants.statusBarHeight + 16

export const Toast: React.FC<ToastConfig> = ({
  intent,
  message,
  duration,
  onClose,
  id,
  index,
  shouldVibrate,
  onPress
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
    <StyledToast mb={4} style={{ transform: [{ translateY }, { scale }], opacity }} py={2}>
      <TouchableOpacity
        activeOpacity={1}
        testID="toast-touchable"
        onPress={onPress}
        // eslint-disable-next-line
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
          <SubText>{message}</SubText>
        </Box>
      </TouchableOpacity>
    </StyledToast>
  )
}

export default React.memo(Toast)

Toast.defaultProps = {
  duration: 3000,
  intent: 'SUCCESS',
  onPress: () => false,
  shouldVibrate: false,
  message: 'Toast message!'
}
