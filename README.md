<p>
  <img alt="react-native-styled-toast" src="https://i.imgur.com/w42dDGJ.png" width="208">
</p>

# react-native-styled-toast

<p>
  Themeable toaster component for React Native using Styled Components & Styled System.
</p>
<br />

<p>
  <img alt="react-native-styled-toast gif" src="https://i.imgur.com/CYiuYPD.gif" width="350">
</p>

## Features

- Pure JS implementation
- Supports multiple toasts
- iOS and Android compatible
- Styled with theme contraints
- Written using React Hooks
- Fully typed with TypeScript

## Installation

`$ yarn add react-native-styled-toast`

## Usage

`react-native-styled-toast` uses `styled-components` and `styled-system` under the hood, so please ensure you have these installed in your project. It also makes use of the `Constants` API from `expo-constants`, so you will need that too.

Because this component relies on theming, you need to ensure that you've wrapped your app in the `ThemeProvider` component from `styled-components` - then use the `ToastProvider` and wrap the rest of your app:

```jsx
import { ThemeProvider } from 'styled-components'
import { ToastProvider } from 'react-native-styled-toast'

return (
  <ThemeProvider theme={theme}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </ThemeProvider>
)
```

Now that your app has access to the Toast context, you can make use of the provided `useToast` hook to trigger a notification anywhere in your app:

```jsx
import { useToast } from 'react-native-styled-toast'

const { toast } = useToast()

return <Button onPress={() => toast({ message: 'Check me out!', ...config })} />
```

If you aren't able to make use of hooks for whatever reason, you can still use the provided ToastContext.Consumer

```jsx
import { ToastContext } from 'react-native-styled-toast'

return (
  <ToastContext.Consumer>
    {({ toast }) => {
      return (
        <Button
          onPress={() =>
            toast({
              message: 'Woo! This is a success toast.'
            })
          }
          title="Show Success Toast"
        />
      )
    }}
  </ToastContext.Consumer>
)
```

**This component relies on `styled-system` to access colors from your theme**. So you need to ensure that your theme object is configured correctly. Please refer to the `styled-system` [docs](https://styled-system.com/getting-started#getting-started). Your theme object should contain at least a spacing scale with some default colors, it should looks something like this:

```javascript
export default {
  space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
  colors: {
    text: '#0A0A0A',
    background: '#FFF',
    border: '#E2E8F0',
    muted: '#F0F1F3',
    success: '#7DBE31',
    error: '#FC0021'
  }
}
```

By default, `react-native-styled-toast` references the following theme color keys for their respective properties:

`background` (default toast background) \
`text` (default toast text color) \
`success` (default success accent color) \
`error` (default error accent color) \
`muted` (default close button bg color)

If your colors object in your theme does not contain these, you can customize these values in the toast configuration object. E.g:

```jsx
const { toast } = useToast()

<Button onPress={() => toast({ bg: 'myBgColor', color: 'myTextColor' })} />
```

## Dark Mode Compatible 🌗

Because of the theming capability of `react-native-styled-toast`, it has out of the box support for dark mode. All you need to do is ensure the color keys you're using for your different modes are the same

## Props

### `ToastProvider`

| Prop           | Type   | Required | Description                                        | Default                        |
| -------------- | ------ | -------- | -------------------------------------------------- | ------------------------------ |
| **`position`** | enum   | no       | Sets the position of the toasts                    | TOP                            |
| **`offset`**   | number | no       | Overrides the default offset from the top / bottom | Constants.statusBarHeight + 16 |

### `ToastConfig`

| Prop                        | Type    | Required | Description                                             | Default        |
| --------------------------- | ------- | -------- | ------------------------------------------------------- | -------------- |
| **`bg`**                    | string  | no       | Sets the background color of the toast                  | background     |
| **`color`**                 | string  | no       | Sets the text color of the toast                        | text           |
| **`message`**               | string  | yes      | Text message that gets rendered                         | Toast Message! |
| **`subMessage`**            | string  | no       | Sub message that gets rendered below message            | undefined      |
| **`duration`**              | number  | no       | ms duration of toast before auto closing. 0 = infinite. | 3000           |
| **`onPress`**               | func    | no       | Function that gets exectuted onPress of toast           | () => false    |
| **`borderColor`**           | string  | no       | Sets border color of toast                              | border         |
| **`intent`**                | enum    | no       | Updates icon and accent color based on intent.          | SUCCESS        |
| **`closeButtonBgColor`**    | string  | no       | Sets bg color of the close button                       | muted          |
| **`closeIconColor`**        | string  | no       | Sets the color of the close icon                        | text           |
| **`closeIconBorderRadius`** | number  | no       | Sets the border radius of the close icon container      | 4              |
| **`shouldVibrate`**         | boolean | no       | Toggles whether phone vibrates on notification          | false          |

<br />
<div>Toast icon by <a href="https://www.flaticon.com/authors/ultimatearm" title="ultimatearm">ultimatearm</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>
