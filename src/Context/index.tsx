import Constants from 'expo-constants'
import * as React from 'react'
import { LayoutAnimation, UIManager } from 'react-native'
import Box from '../Box'
import Toast, { ToastConfig } from '../Toast'
import { ToastInternalConfig } from '../Toast/index'
import { uuid } from '../Utils'

type ToastContextType = {
  toast?: (options: ToastConfig) => void
  position?: 'TOP' | 'BOTTOM'
  offset?: number
}

export const ToastContext = React.createContext<Partial<ToastContextType>>({})

export const useToast = () => React.useContext(ToastContext)

const originalOffset = Constants.statusBarHeight + 16

UIManager && UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

export type FullToastConfig = ToastConfig & ToastInternalConfig

const ToastProvider: React.FC<ToastContextType> = ({ children, position, offset: offsetProp }) => {
  const [toasts, setToasts] = React.useState<FullToastConfig[]>([])

  const toast = (newToast: ToastConfig) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setToasts((prevToasts) =>
      position === 'BOTTOM'
        ? [...prevToasts, { index: prevToasts.length, id: uuid(), ...newToast }]
        : [{ index: prevToasts.length, id: uuid(), ...newToast }, ...prevToasts]
    )
  }

  const hideToast = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setToasts((prevToasts) => prevToasts.filter((el) => el.id !== id))
  }

  const offset = offsetProp || originalOffset

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
