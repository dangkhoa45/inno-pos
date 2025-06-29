import { createTheme } from '@mui/material/styles'

import { darkTheme, lightTheme } from './theme'

// Responsive breakpoints configuration
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
}

// Responsive utilities
export const responsive = {
  // Container max widths
  container: {
    xs: '100%',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px',
  },

  // Spacing scales
  spacing: {
    xs: 0.5,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  },

  // Font sizes
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },

  // Component heights
  heights: {
    header: {
      xs: '60px',
      sm: '70px',
      md: '80px',
    },
    card: {
      xs: '140px',
      sm: '160px',
      md: '180px',
    },
    button: {
      xs: '36px',
      sm: '40px',
      md: '48px',
    },
  },
}

// Enhanced theme with responsive utilities
const createResponsiveTheme = (baseTheme: any) => {
  return createTheme({
    ...baseTheme,
    breakpoints: {
      values: breakpoints,
    },
    components: {
      ...baseTheme.components,
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: '16px',
            paddingRight: '16px',
            '@media (min-width: 600px)': {
              paddingLeft: '24px',
              paddingRight: '24px',
            },
            '@media (min-width: 900px)': {
              paddingLeft: '32px',
              paddingRight: '32px',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            ...baseTheme.components?.MuiCard?.styleOverrides?.root,
            '@media (max-width: 599px)': {
              borderRadius: 8,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            ...baseTheme.components?.MuiButton?.styleOverrides?.root,
            '@media (max-width: 599px)': {
              fontSize: '0.875rem',
              padding: '8px 16px',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            ...baseTheme.components?.MuiTextField?.styleOverrides?.root,
            '@media (max-width: 599px)': {
              '& .MuiInputBase-input': {
                fontSize: '0.875rem',
              },
            },
          },
        },
      },
    },
  })
}

const responsiveLightTheme = createResponsiveTheme(lightTheme)
const responsiveDarkTheme = createResponsiveTheme(darkTheme)

export { responsiveDarkTheme, responsiveLightTheme }

export { ThemeProvider, useTheme } from './ThemeProvider'
