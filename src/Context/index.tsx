import * as React from 'react'
import { LayoutAnimation, UIManager } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Box from '../Box'
import Toast, { ToastConfig } from '../Toast'
import { ToastInternalConfig } from '../Toast/index'
import { uuid } from '../Utils'

type ToastContextType = {
  toast: (options: ToastConfig) => void
  position?: 'TOP' | 'BOTTOM'
  offset?: number
}

export const ToastContext = React.createContext<ToastContextType>({
  toast: () => null
})

export const useToast = () => React.useContext(ToastContext)

const originalOffset = getStatusBarHeight() + 16

UIManager && UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

export type FullToastConfig = ToastConfig & ToastInternalConfig

const ToastProvider: React.FC<Omit<ToastContextType, 'toast'>> = ({ children, position, offset: offsetProp }) => {
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
        <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start' }}>
          {toasts.map((config: ToastConfig & ToastInternalConfig) => {
            return <Toast position={position} key={config.id} onClose={(id) => hideToast(id)} {...config} />
          })}
        </SafeAreaView>
      </Box>
    </ToastContext.Provider>
  )
}

export default ToastProvider
