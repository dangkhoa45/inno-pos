import React from 'react'

import ArticleIcon from '@mui/icons-material/Article'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import PostAddIcon from '@mui/icons-material/PostAdd'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import { Link, useLocation } from '@tanstack/react-router'

const drawerWidth = 240

const menuItems = [
  { path: '/', label: 'Home', icon: <HomeIcon /> },
  { path: '/sale', label: 'Sales', icon: <ShoppingCartIcon /> },
  { path: '/posts', label: 'Posts', icon: <ArticleIcon /> },
  { path: '/posts/add', label: 'Add Post', icon: <PostAddIcon /> },
  { path: '/about', label: 'About', icon: <InfoIcon /> },
]

interface NavigationProps {
  open: boolean
  onClose: () => void
}

export const Navigation: React.FC<NavigationProps> = ({ open, onClose }) => {
  const location = useLocation()

  const drawer = (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={onClose}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>
  )
}
