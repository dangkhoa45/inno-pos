import { createTheme } from '@mui/material/styles'

// TD Design System Brand Colors
export const tdColors = {
  primary: '#0070f4',
  secondary: '#677484',
  default: '#677484',
  success: '#00b63e',
  info: '#0070f4',
  warning: '#ff8800',
  danger: '#ed232f',
  error: '#ed232f',
  link: '#0070f4',
  promotion: '#ef06bc',
  white: '#ffffff',
  black: '#000000',
} as const

// Utility functions
export const getColorWithOpacity = (color: string, opacity: number): string => {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export const isValidColor = (color: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

// Color scales for theme
export const colors = {
  primary: {
    50: '#e6f1fe',
    100: '#cce2fd',
    200: '#99c6fb',
    300: '#66a9f8',
    400: '#338df6',
    500: '#0070f4',
    600: '#005ac3',
    700: '#004392',
    800: '#002d62',
    900: '#001631',
  },
  secondary: {
    50: '#f0f1f3',
    100: '#e1e3e6',
    200: '#c2c7ce',
    300: '#a4acb5',
    400: '#85909d',
    500: '#677484',
    600: '#525d6a',
    700: '#3e464f',
    800: '#292e35',
    900: '#15171a',
  },
  success: {
    25: '#f2fbf5',
    50: '#e6f8ec',
    100: '#ccf0d8',
    200: '#99e2b2',
    300: '#66d38b',
    400: '#33c565',
    500: '#00b63e',
    600: '#009232',
    700: '#006d25',
    800: '#004919',
    900: '#00240c',
  },
  warning: {
    50: '#fff3e6',
    100: '#ffe7cc',
    200: '#ffcf99',
    300: '#ffb866',
    400: '#ffa033',
    500: '#ff8800',
    600: '#cc6d00',
    700: '#995200',
    800: '#663600',
    900: '#331b00',
  },
  error: {
    25: '#fef4f5',
    50: '#fde9ea',
    100: '#fbd3d5',
    200: '#f8a7ac',
    300: '#f47b82',
    400: '#f14f59',
    500: '#ed232f',
    600: '#be1c26',
    700: '#8e151c',
    800: '#5f0e13',
    900: '#2f0709',
  },
  grey: {
    25: '#f7f8f9',
    50: '#f0f1f3',
    75: '#e8eaed',
    100: '#e1e3e6',
    150: '#d1d5da',
    200: '#c2c7ce',
    250: '#b3bac2',
    300: '#a4acb5',
    350: '#959ea9',
    400: '#85909d',
    600: '#525d6a',
    700: '#3e464f',
    750: '#343a42',
    800: '#292e35',
    850: '#1f2328',
    900: '#15171a',
  },
  promotion: {
    50: '#fde6f8',
    100: '#fccdf2',
    200: '#f99be4',
    300: '#f56ad7',
    400: '#f238c9',
    500: '#ef06bc',
    600: '#bf0596',
    700: '#8f0471',
    800: '#60024b',
    900: '#300126',
  },
}

// Type definitions
export type TdColor = keyof typeof tdColors
export type ColorScale = keyof typeof colors
export type ColorShade = keyof typeof colors.primary

// Light theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary[500], // #0070f4
      light: colors.primary[300], // #66a9f8
      dark: colors.primary[700], // #004392
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.secondary[500], // #677484
      light: colors.secondary[300], // #a4acb5
      dark: colors.secondary[700], // #3e464f
      contrastText: '#ffffff',
    },
    error: {
      main: colors.error[500], // #ed232f
      light: colors.error[300], // #f47b82
      dark: colors.error[700], // #8e151c
    },
    warning: {
      main: colors.warning[500], // #ff8800
      light: colors.warning[300], // #ffb866
      dark: colors.warning[700], // #995200
    },
    success: {
      main: colors.success[500], // #00b63e
      light: colors.success[300], // #66d38b
      dark: colors.success[700], // #006d25
    },
    info: {
      main: colors.primary[500], // #0070f4 (using primary for info)
      light: colors.primary[300],
      dark: colors.primary[700],
    },
    background: {
      default: colors.grey[25], // #f7f8f9
      paper: '#ffffff',
    },
    text: {
      primary: colors.grey[900], // #15171a
      secondary: colors.grey[600], // #525d6a
    },
    divider: colors.grey[200], // #c2c7ce
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
})

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary[400], // #338df6
      light: colors.primary[300], // #66a9f8
      dark: colors.primary[600], // #005ac3
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.secondary[400], // #85909d
      light: colors.secondary[300], // #a4acb5
      dark: colors.secondary[600], // #525d6a
      contrastText: '#ffffff',
    },
    error: {
      main: colors.error[400], // #f14f59
      light: colors.error[300], // #f47b82
      dark: colors.error[600], // #be1c26
    },
    warning: {
      main: colors.warning[400], // #ffa033
      light: colors.warning[300], // #ffb866
      dark: colors.warning[600], // #cc6d00
    },
    success: {
      main: colors.success[400], // #33c565
      light: colors.success[300], // #66d38b
      dark: colors.success[600], // #009232
    },
    info: {
      main: colors.primary[400], // #338df6
      light: colors.primary[300],
      dark: colors.primary[600],
    },
    background: {
      default: colors.grey[900], // #15171a
      paper: colors.grey[850], // #1f2328
    },
    text: {
      primary: '#ffffff',
      secondary: colors.grey[400], // #85909d
    },
    divider: colors.grey[700], // #3e464f
  },
  typography: lightTheme.typography,
  shape: lightTheme.shape,
  components: {
    ...lightTheme.components,
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: colors.grey[850], // #1f2328
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: colors.grey[850], // #1f2328
        },
      },
    },
  },
})

export { darkTheme, lightTheme }
