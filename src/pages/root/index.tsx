import { useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Outlet } from '@tanstack/react-router'

import { Navigation } from '@/components/Navigation'
import { LoginForm } from '@/pages/login'
import { AuthProvider, useAuth } from '@/stores/AuthContext'
import { OrderProvider } from '@/stores/OrderContext'
import { ThemeProvider } from '@/theme'

function RootLayoutInner() {
  const { currentUser, loading, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!currentUser) {
    return (
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          gap={3}
        >
          <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Inno POS
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ mb: 3 }}
            >
              Please log in to continue
            </Typography>
            <LoginForm />
          </Paper>
        </Box>
      </Container>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <AppBar position="sticky" elevation={0} sx={{ borderRadius: 0 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Inno POS
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Navigation open={mobileOpen} onClose={handleDrawerToggle} />
      <Container maxWidth={false} sx={{ flex: 1, py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  )
}

export default function Root() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <OrderProvider>
          <RootLayoutInner />
        </OrderProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
