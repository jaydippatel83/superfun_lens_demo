 

import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar, useMediaQuery } from '@mui/material'
import React, {  useState } from 'react'
import Header from '../../header/Header'
import Search from '../Search'
import LinkIcon from '@mui/icons-material/Link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; 
import { useTheme } from '@mui/system';

function StorieList() { 

    const theme = useTheme();
    const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
    const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const xsmall = useMediaQuery(theme.breakpoints.down("xs"));

    

     
    const sliderData = [
        {
            name: "Slider0",
            img: "https://media.giphy.com/media/3o6YgrDPMg1pa2kV0s/giphy.gif"
        },
        {
            name: "Slider1",
            img: "https://media.giphy.com/media/uk4Va5MkRp2bfkOk6f/giphy.gif"
        },
        {
            name: "Slider2",
            img: "https://media.giphy.com/media/t56wjBdpeFNwxQglmJ/giphy.gif"
        },
        {
            name: "Slider3",
            img: "https://media.giphy.com/media/MCeIiRETfwBK2rtGRi/giphy.gif"
        },
        {
            name: "Slider4",
            img: "https://media.giphy.com/media/fvr9cMCOqerIpC4Ipm/giphy.gif"
        },
        {
            name: "Slider5",
            img: "https://media.giphy.com/media/mguPrVJAnEHIY/giphy.gif"
        },
        {
            name: "Slider6",
            img: "https://media.giphy.com/media/mguPrVJAnEHIY/giphy.gif"
        },
        {
            name: "Slider7",
            img: "https://media.giphy.com/media/iJJ6E58EttmFqgLo96/giphy.gif"
        },
        {
            name: "Slider8",
            img: "https://media.giphy.com/media/pynZagVcYxVUk/giphy.gif"
        },
        {
            name: "Slider9",
            img: "https://media.giphy.com/media/3NtY188QaxDdC/giphy.gif"
        },
        {
            name: "Slider10",
            img: "https://media.giphy.com/media/srV1WPgHVbDal3UJ9h/giphy.gif"
        }
    ]

    const [style, setStyle] = useState("");

    return (
        <>
            <Header />
            <div style={{ marginTop: '100px' }}>
                <Search />
                <div className='container'>
                    <div className='row'>
                        <Box sx={{ width: '100%', height: 'auto', overflowY: 'scroll',marginTop:'3%' }}>
                            <ImageList variant="masonry" cols={greaterThanMid && 4 || smallToMid && 3 || lessThanSmall && 2 || xsmall && 1}   gap={8}>  
                                {sliderData.map((item) => (  
                                    <ImageListItem
                                    key={item.name}
                                    style={{ cursor: 'pointer' }}
                                    onMouseEnter={e => {
                                        setStyle(item.name);
                                    }}
                                    onMouseLeave={e => {
                                        setStyle("");
                                    }}
                                >
                                    <img
                                        src={`${item.img}?w=248&fit=crop&auto=format`}
                                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item.name}
                                        loading="lazy"
                                          style={{ borderRadius: '20px', padding: '10px', cursor: 'pointer' }}
                                    />
                                    {
                                        style === item.name && <ImageListItemBar
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
                                        style === item.name && <ImageListItemBar
                                            sx={{
                                                background:
                                                    'linear-gradient(to bottom, rgba(0,0,0,0) 0%, ' +
                                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                            }}

                                            position="bottom"
                                            actionIcon={
                                                <img
                                                src={`${item.img}?w=248&fit=crop&auto=format`}
                                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                    alt={item.name}
                                                    loading="lazy"
                                                    width="50" style={{ borderRadius: '20px', height: '50px', padding: '10px', margin: '15px' }}
                                                />

                                            }
                                            actionPosition="left"
                                        />
                                    }
                                    {
                                        style === item.name && <ImageListItemBar
                                            sx={{
                                                background:
                                                    'linear-gradient(to bottom, rgba(0,0,0,0) 0%, ' +
                                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                            }}

                                            position="bottom"
                                            actionIcon={
                                                <IconButton
                                                    sx={{ color: 'white', padding: '5px', margin: '10px 15px' }}
                                                    aria-label={`star ${item.name}`}
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