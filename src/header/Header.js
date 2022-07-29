import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [open, setOpen] = React.useState(false);

    const theme = useTheme();

    const drawerWidth = 240;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" color='primary' open={open}> 
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer" 
                        sx={{ display: { xs: 'block', sm: 'none' },mr: 2  }}
                        onClick={handleDrawerOpen}
                    >
                         <MenuIcon   />
                      
                    </IconButton>


                    <Drawer
                        sx={{
                            width: open && drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={open}
                    >
                        <DrawerHeader>
                            Logo
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </DrawerHeader>
                        <Divider />
                        <List>
                            {['Sports', 'Stickers', 'Artists', 'Clips'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Drawer> 

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        MUI
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search> 
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <h4 className='mx-2'>Sports</h4>
                    <h4 className='mx-2'>Stickers</h4>
                    <h4 className='mx-2'>Artist</h4>
                    <h4 className='mx-2'>Clips</h4>  
                    </Box>
                  
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar> 
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
