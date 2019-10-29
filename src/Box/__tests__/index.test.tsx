import { render } from '@testing-library/react-native'
import * as React from 'react'
import { Text } from 'react-native'
import Box from '..'

describe('<Box />', () => {
  const setup = () => {
    const utils = render(
      <Box>
        <Text>Test</Text>
      </Box>
    )
    return { ...utils }
  }
  test('should render children', () => {
    const { getByText } = setup()
    expect(getByText(/test/i)).toBeDefined()
  })
})
