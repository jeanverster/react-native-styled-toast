import * as React from 'react'
import { LayoutAnimation, LayoutAnimationConfig, UIManager } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Box from '../Box'
import Toast, { ToastConfig } from '../Toast'
import { ToastInternalConfig } from '../Toast/index'
import { uuid } from '../Utils'

type ToastContextType = {
  toast: (options: ToastConfig) => void
  position?: 'TOP' | 'BOTTOM'
  offset?: number
  maxToasts?: number
}

export const ToastContext = React.createContext<ToastContextType>({
  toast: () => null
})

export const useToast = () => React.useContext(ToastContext)

const originalOffset = getStatusBarHeight()

UIManager && UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

export type FullToastConfig = ToastConfig & ToastInternalConfig

const CustomLayoutConfig: LayoutAnimationConfig = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  }
}

const ToastProvider: React.FC<Omit<ToastContextType, 'toast'>> = ({
  children,
  position,
  offset: offsetProp,
  maxToasts
}) => {
  const [toasts, setToasts] = React.useState<FullToastConfig[]>([])

  const toast = (newToast: ToastConfig) => {
    LayoutAnimation.configureNext(CustomLayoutConfig)
    setToasts((prevToasts) => {
      const toasts =
        position === 'BOTTOM'
          ? [...prevToasts, { index: prevToasts.length, id: uuid(), ...newToast }]
          : [{ index: prevToasts.length, id: uuid(), ...newToast }, ...prevToasts]
      if (maxToasts && prevToasts.length === maxToasts) {
        position === 'BOTTOM' ? toasts.shift() : toasts.pop()
        return toasts
      } else {
        return toasts
      }
    })
  }

  const hideToast = (id: string) => {
    LayoutAnimation.configureNext(CustomLayoutConfig)
    setToasts((prevToasts) => prevToasts.filter((el) => el.id !== id))
  }

  const offset = offsetProp ? offsetProp + originalOffset : originalOffset

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <Box
        px={4}
        left={0}
        right={0}
        position="absolute"
        pointerEvents="box-none"
        pt={position === 'BOTTOM' ? 0 : offset}
        pb={position === 'BOTTOM' ? offset : 0}
        style={position === 'BOTTOM' ? { bottom: 0 } : { top: 0 }}
      >
        {toasts.map((config: ToastConfig & ToastInternalConfig) => {
          return <Toast position={position} key={config.id} onClose={(id) => hideToast(id)} {...config} />
        })}
      </Box>
    </ToastContext.Provider>
  )
}

export default ToastProvider
