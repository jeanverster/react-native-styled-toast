<p>
  <img alt="react-native-styled-toast" src="https://i.imgur.com/w42dDGJ.png" width="208">
</p>

# react-native-styled-toast

<p>
  Themeable toaster component for React Native using Styled Components & Styled System.
</p>
<br />

<p>
  <img alt="react-native-styled-toast gif" src="https://i.imgur.com/eEmy0oL.gif" >
</p>

## Features

- Pure JS implementation
- iOS and Android compatible
- Styled with theme contraints
- Written in React Hooks

## Installation

`$ yarn add react-native-styled-toast`

## Usage

`react-native-styled-toast` uses `styled-components` and `styled-system` under the hood, so please ensure you have these installed in your project. It also makes use of the `Constants` API from `expo-constants`, so you will need that too.

Because this component relies on theming, you need to ensure that you've wrapped your app in the `ThemeProvider` component from `styled-components/native` - then use the `ToastProvider` and wrap the rest of your app:

```
import { ThemeProvider } from 'styled-components/native'
import { ToastProvider } from 'react-native-styled-toast

...

<ThemeProvider theme={theme}>
  <ToastProvider>
    <App />
  </ToastProvider>
</ThemeProvider>
```

Now that your app has access to the Toast context, you can make use of the provided `useToast` hook to trigger a notification anywhere in your app:

```
import { useToast } from 'react-native-styled-toast'

const { toast } = useToast()

<Button onPress={() => toast({...config}: ToastConfig)} />
```

At the moment the only way to trigger a toast notification is by using the `useToast` hook, so you will need `react-native@0.59` or newer and make use of function components.

**This component relies on `styled-system` to access colors from your theme**. So you need to ensure that your theme object is configured correctly. Please refer to the `styled-system` [docs](https://styled-system.com/getting-started#getting-started). Your theme colors should looks something like this:

```
// theme.js
export default {
  colors: {
    black: '#000e1a',
    white: '#fff',
    blue: '#007ce0',
    navy: '#004175',
  },
}
```

By default, `react-native-styled-toast` references the following theme color keys for their respective properties:

`background` (default toast background) \
`text` (default toast text color) \
`success` (default success accent color) \
`error` (default error accent color)

If your colors object in your theme does not contain these, you can customize these values in the toast configuration object. E.g:

```
const { toast } = useToast()

<Button onPress={() => toast({ bg: 'myBgColor', color: 'myTextColor' })} />
```

## Dark Mode Compatible 🌗

Because of the theming capability of `react-native-styled-toast`, it has out of the box support for dark mode. All you need to do is ensure the color keys you're using for your different modes are the same

## Typescript Support 🚀

`react-native-styled-toast` has been written in TypeScript so you can assure the type defs will always be up to date.

## Props

### `ToastProvider`

| Prop           | Value         | Description                                   | Default |
| -------------- | ------------- | --------------------------------------------- | ------- |
| **`position`** | TOP \| BOTTOM | Sets the position of the toast notifications. | TOP     |
|                |               |                                               |         |

### `ToastConfig`

| Prop                        | Type             | Required | Description                                             | Default        |
| --------------------------- | ---------------- | -------- | ------------------------------------------------------- | -------------- |
| **`bg`**                    | string           | no       | Sets the background color of the toast                  | background     |
| **`color`**                 | string           | no       | Sets the text color of the toast                        | text           |
| **`message`**               | string           | yes      | Text message that gets rendered                         | Toast Message! |
| **`subMessage`**            | string           | no       | Sub message that gets rendered below message            | undefined      |
| **`duration`**              | number           | no       | ms duration of toast before auto closing. 0 = infinite. | 3000           |
| **`onPress`**               | () => void       | no       | Function that gets exectuted onPress of toast           | () => false    |
| **`borderColor`**           | string           | no       | Sets border color of toast                              | border         |
| **`intent`**                | SUCCESS \| ERROR | no       | Updates icon and accent color based on intent.          | SUCCESS        |
| **`closeIconBorderRadius`** | number           | no       | Sets the border radius of the close icon container      | 4              |
| **`shouldVibrate`**         | boolean          | no       | Toggles whether phone vibrates on notification          | false          |

<br />
<div>Toast icon by <a href="https://www.flaticon.com/authors/ultimatearm" title="ultimatearm">ultimatearm</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>
