 

import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar, useMediaQuery } from '@mui/material'
import React, {  useState } from 'react'
import Header from '../../header/Header'
import Search from '../Search'
import LinkIcon from '@mui/icons-material/Link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; 
import { useTheme } from '@mui/system';
import { LensAuthContext } from '../../context/LensContext';
import { useNavigate } from 'react-router-dom';

function StorieList() { 
    const navigate = useNavigate();
    const lensAuthContext = React.useContext(LensAuthContext);
    const {userPosts  } = lensAuthContext;
    const theme = useTheme();
    const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
    const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const xsmall = useMediaQuery(theme.breakpoints.down("xs"));

    const handleNavigate=(e)=>{ 
        navigate(`/trendingDetails/${e.id}`); 
    }
    
    const [style, setStyle] = useState("");

    return (
        <>
            <Header />
            <div className='footer-position' style={{ marginTop: '100px' }}>
                {/* <Search /> */}
                <div className='container'>
                    <div className='row'>
                        <Box sx={{ width: '100%', height: 'auto', overflowY: 'scroll',marginTop:'3%' }}>
                            <ImageList variant="masonry" cols={greaterThanMid && 4 || smallToMid && 3 || lessThanSmall && 2 || xsmall && 1}   gap={8}>  
                                {userPosts && userPosts.map((item) => (  
                                    <ImageListItem
                                    key={item.id}
                                    style={{ cursor: 'pointer' }}
                                    onClick={()=>handleNavigate(item)}
                                    onMouseEnter={e => {
                                        setStyle(item.id);
                                    }}
                                    onMouseLeave={e => {
                                        setStyle("");
                                    }}
                                >
                                    <img
                                        src={`${item.__typename === "Comment"  ? item?.mainPost?.metadata?.media[0]?.original?.url : item?.metadata?.media[0]?.original?.url}?w=248&fit=crop&auto=format`}
                                        srcSet={`${item.__typename === "Comment"  ? item?.mainPost?.metadata?.media[0]?.original?.url : item?.metadata?.media[0]?.original?.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item.metadata.name}
                                        loading="lazy"
                                          style={{ borderRadius: '20px', padding: '10px', cursor: 'pointer' }}
                                    />
                                    {
                                        style === item.id && <ImageListItemBar
                                            sx={{
                                                background:
                                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                            }}
                                            position="top"
                                            actionIcon={
                                                <IconButton
                                                    sx={{ color: 'white', padding: '5px', margin: '10px' }}
                                                >
                                                    <FavoriteBorderIcon />
                                                </IconButton>
                                            }
                                            actionPosition="right"
                                        />
                                    }
                                    {
                                        style === item.id && <ImageListItemBar
                                            sx={{
                                                background:
                                                    'linear-gradient(to bottom, rgba(0,0,0,0) 0%, ' +
                                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                            }}

                                            position="bottom"
                                            actionIcon={
                                                <img
                                                src={`${item.__typename === "Comment"  ? item?.mainPost?.metadata?.media[0]?.original?.url : item?.metadata?.media[0]?.original?.url}?w=248&fit=crop&auto=format`}
                                                srcSet={`${item.__typename === "Comment"  ? item?.mainPost?.metadata?.media[0]?.original?.url : item?.metadata?.media[0]?.original?.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                    alt={item.metadata.name}
                                                    loading="lazy"
                                                    width="50" style={{ borderRadius: '20px', height: '50px', padding: '10px', margin: '15px' }}
                                                />

                                            }
                                            actionPosition="left"
                                        />
                                    }
                                    {
                                        style === item.id && <ImageListItemBar
                                            sx={{
                                                background:
                                                    'linear-gradient(to bottom, rgba(0,0,0,0) 0%, ' +
                                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                            }}

                                            position="bottom"
                                            actionIcon={
                                                <IconButton
                                                    sx={{ color: 'white', padding: '5px', margin: '10px 15px' }}
                                                    aria-label={`star ${item.metadata.name}`}
                                                >
                                                    <LinkIcon />
                                                </IconButton>
                                            }
                                            actionPosition="right"
                                        />

                                    }
                                </ImageListItem>



                                ))}; 

                            </ImageList>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StorieList