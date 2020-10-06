import * as React from 'react'
import { Animated, Vibration } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Box from '../Box'
import Icon from '../Icon'
import { Accent, CloseButtonCont, Heading, IconCont, StyledToast, SubText } from './styles'

export type ToastConfig = {
  accentColor?: string
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

export const Toast: React.FC<ToastConfig & ToastInternalConfig> = ({
  accentColor,
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
      mb={4}
      py={2}
      bg={bg}
      onPress={onPress}
      pr={!!subMessage ? 2 : 0}
      borderColor={borderColor}
      style={{ transform: [{ translateY }, { scale }], ...shadow }}
    >
      <Accent
        testID="toast-accent"
        bg={!!accentColor ? accentColor : isSuccess ? 'success' : isInfo ? 'info' : 'error'}
      />
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
      <Box py={2} pr={!!subMessage ? 2 : 0} flex={1} pl={hideIcon ? 4 : 0} alignItems="flex-start">
        <Box flexDirection="row" flexWrap="wrap" flex={1}>
          <Heading color={color}>{message}</Heading>
        </Box>
        {!!subMessage && (
          <SubText color={color} mt={1}>
            {subMessage}
          </SubText>
        )}
      </Box>
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
