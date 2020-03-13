import { theme } from '@chakra-ui/core'

const customTheme = {
  ...theme,
  fonts: {
    heading: '"JetBrains Mono", sans-serif',
    body: 'system-ui, sans-serif',
    mono: 'Menlo, monospace'
  },
  colors: {
    ...theme.colors,
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac'
    }
  }
}

export { customTheme }
