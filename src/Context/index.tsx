import Constants from 'expo-constants'
import * as React from 'react'
import { LayoutAnimation } from 'react-native'
import Box from '../Box'
import Toast, { ToastConfig } from '../Toast'
import { uuid } from '../Utils'

type ToastContextType = {
  toast?: (options: ToastConfig) => void
}

export const ToastContext = React.createContext<Partial<ToastContextType>>({})

export const useToast = () => React.useContext(ToastContext)

const offset = Constants.statusBarHeight + 16

const ToastProvider: React.FC<ToastContextType> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastConfig[]>([])

  const toast = (newToast: ToastConfig) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setToasts((prevToasts) => [{ index: prevToasts.length, id: uuid(), ...newToast }, ...prevToasts])
  }

  const hideToast = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setToasts((prevToasts) => prevToasts.filter((el) => el.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <Box px={4} pt={offset} position="absolute" top={0} left={0} right={0}>
        {toasts.map((config) => {
          return <Toast key={config.id} onClose={(id) => hideToast(id)} {...config} />
        })}
      </Box>
    </ToastContext.Provider>
  )
}

export default ToastProvider
