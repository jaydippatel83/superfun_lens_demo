import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
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
import { Avatar, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import UploadModal from '../components/modals/UploadModal';
import ProfileCreation from '../components/modals/CreateProfileModal';
import getProfiles from '../LensProtocol/profile/get-profiles';
import { useEthers } from "@usedapp/core";
import Web3Modal from 'web3modal';

import { LensAuthContext } from '../context/LensContext'
import Blockies from 'react-blockies'
import UpdateProfile from '../components/modals/update-profile';

const pages = [
    {
        name: 'Memes',
        path: 'trending'
    },
    {
        name: 'PFPs',
        path: 'pfps'
    },
    {
        name: 'Contests',
        path: 'contest'
    },
    {
        name: 'Artists',
        path: 'artist'
    }
]

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    background: 'linear-gradient(to right top, #ff0f7b, #ff3d61, #ff6049, #ff7f36, #f89b29);',
    '&:hover': {
        background: 'linear-gradient(to left top, #ff0f7b, #ff3d61, #ff6049, #ff7f36, #f89b29);',
    },
}));



export default function Header() {

    const lensAuthContext = React.useContext(LensAuthContext);
    const { profile, login, disconnectWallet, update } = lensAuthContext;

    const { account, activateBrowserWallet, deactivate } = useEthers();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [open, setOpen] = React.useState(false);
    const [editopen, setEditOpen] = React.useState(false);
    // const navigate = useRoutes();

    const theme = useTheme();
    const isConnected = account !== undefined;

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
    // const handleNavigate =(e)=>{
    //     navigate(`/${e}`);
    // }

    

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
            {/* <ProfileCreation /> */}
            {/* <Blockies seed={profile.id} size={10} className="rounded-full" style={{borderRadius:'50%'}} /> */}
            {/* <Avatar src={profile && profile.picture.original.url} /> */}
            <MenuItem onClick={handleMenuClose} > {
                profile && <p>{profile.handle}</p>
            }</MenuItem>
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
                {
                    profile && <p>{profile.handle}</p>
                }
            </MenuItem>
        </Menu>
    );

    const navigateToHome = () => {
        navigate('/');
    }

    return (
        <div className='container p-0 '>
            <Box sx={{ flexGrow: 1 }} >
                <AppBar sx={{ padding: { xs: '0', md: '0 85px', lg: '0 4%', background: 'black' } }} color='primary' open={open}>
                    <Toolbar>
                        
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ display: { xs: 'block', sm: 'none' }, mr: 2 }}
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />

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
                                <img alt='' style={{ cursor: 'pointer' }} onClick={navigateToHome} src='assets/superfunLogo1.png' />
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                </IconButton>
                            </DrawerHeader>
                            <Divider />
                            <List>
                                {['Memes', 'PFPs', 'Artists', 'Contests'].map((text, index) => (
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
                            sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
                        >
                            <img alt='' onClick={navigateToHome} src='assets/superfunLogo1.png' />
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 'auto' }}>
                            {pages.map((page) => (
                                <Link key={page.name} to={`/${page.path}`} underline="none" sx={{ my: 2, color: 'white', display: 'block', }}>{page.name}</Link>
                            ))}
                            <UploadModal />
                            {/* <Button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                onClick={async () => {
                                    try {
                                        await authenticate({ provider: "injected" });
                                        window.localStorage.setItem("connectorId", "injected");
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }}
                            >
                                <img src={Metamask} alt={"Metamask"} className="h-10 w-10" />
                                <p className="mx-5">Metamask</p>
                            </Button> */}

                            {
                                profile && <Button className='m-2' style={{ background: '#488E53', color: 'white', textTransform: 'capitalize' }} onClick={disconnectWallet}>
                                    Disconnect
                                </Button>
                            }

                            {
                                !profile && <Button className='m-2' style={{ background: '#488E72', color: 'white', textTransform: 'capitalize' }} onClick={login}>
                                    Login
                                </Button>
                            }

<UpdateProfile />

                            {/* < Button onClick={connectWallet} className='m-2' style={{ background: '#488E72', color: 'white', textTransform: 'capitalize' }}>Login</Button> */}
                        </Box> 

                        <ProfileCreation/>

                        {
                            profile && <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                                {/* <Avatar src={profile && profile.picture.original.url} /> */}
                                <p className='text-center m-1'>{profile.handle}</p>

                            </Box>
                        }

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
        </div>
    );

}