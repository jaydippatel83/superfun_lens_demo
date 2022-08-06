import React, { useCallback, useState } from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button } from '@mui/material';
import { Link  as RouterLink} from 'react-router-dom';

function Stories() {
    const [style, setStyle] = useState("");
    const storyData = [
        {
            name: "Slider0",
            img: "https://media.giphy.com/media/3o6YgrDPMg1pa2kV0s/giphy.gif",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "Slider1",
            img: "https://media.giphy.com/media/uk4Va5MkRp2bfkOk6f/giphy.gif",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '4 day ago'
        },
        {
            name: "Slider2",
            img: "https://media.giphy.com/media/t56wjBdpeFNwxQglmJ/giphy.gif",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago',
        },
        {
            name: "Slider3",
            img: "https://media.giphy.com/media/MCeIiRETfwBK2rtGRi/giphy.gif",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "Slider4",
            img: "https://media.giphy.com/media/fvr9cMCOqerIpC4Ipm/giphy.gif",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "Slider5",
            img: "https://media.giphy.com/media/mguPrVJAnEHIY/giphy.gif",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "Slider6",
            img: "https://media.giphy.com/media/mguPrVJAnEHIY/giphy.gif",
            description: "21 GIFs From the Second Truss–Sunak Tory Leadership Debate",
            date: '3 day ago'
        },
        {
            name: "Slider7",
            img: "https://media.giphy.com/media/iJJ6E58EttmFqgLo96/giphy.gif",
            description: "Apologies Aren’t Enough, We Need Reparations Apologies Aren’t Enough, We Need Reparations"
        },
        {
            name: "Slider8",
            img: "https://media.giphy.com/media/pynZagVcYxVUk/giphy.gif",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "Slider9",
            img: "https://media.giphy.com/media/3NtY188QaxDdC/giphy.gif",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "Slider10",
            img: "https://media.giphy.com/media/srV1WPgHVbDal3UJ9h/giphy.gif",
            description: "A Showdown Over Abortion Access Is Unfolding In Kansas",
            date: '3 day ago'
        }
    ]

    const [storyItem, setStoryItem] = useState(storyData);
    const [hasMore, setHasmore] = useState(true);
    const [lastPosition, setLastPosition] = useState(0);
    const perPage = 4;


    const loadProducts = useCallback(() => {
        setTimeout(() => {
            // setStoryItem((prev) => [...prev, ...prev]);
        }, 500);

        // setLastPosition(lastPosition + perPage);
    }, []);




    return (


        <InfiniteScroll
            dataLength={storyItem.length}
            next={loadProducts}
            hasMore={hasMore}
            loader={<h4 className='text-center'>Loading...</h4>}

        >
            <div className='container mt-3'>
                <div className='row'>
                    <div className="col-12 mt-2 mb-2"> 
                        <div className="d-flex justify-content-between mb-2">
                        <h5>Stories</h5>
                        <Button  component={RouterLink} to="/stories">View All</Button>
                    </div>
                    </div>


                    {
                        storyData.map((item, i) => { 
                            return (
                                <div className='col-12 col-sm-6 col-md-3 col-lg-3 p-2' key={i}>
                                    <ImageListItem
                                        style={{ cursor: 'pointer' }}
                                        onMouseEnter={e => {
                                            setStyle(item.name);
                                        }}
                                        onMouseLeave={e => {
                                            setStyle("");
                                        }}
                                    >
                                        <img
                                            src={`${item.img} `}
                                            srcSet={`${item.img} `}
                                            alt={item.name}
                                            loading="lazy"
                                            width="100%" style={{ borderRadius: '10px', height: '300px', cursor: 'pointer' }}
                                        />
                                        {
                                            style == item.name && <ImageListItemBar
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
                                            style == item.name && <ImageListItemBar
                                                sx={{
                                                    background:
                                                        'linear-gradient(to bottom, rgba(0,0,0,0) 0%, ' +
                                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                                }}

                                                position="top"
                                                actionIcon={
                                                    <img
                                                        src={`${item.img} `}
                                                        srcSet={`${item.img} `}
                                                        alt={item.name}
                                                        loading="lazy"
                                                        width="50" style={{ borderRadius: '20px', height: '50px', padding: '10px', margin: '15px' }}
                                                    />

                                                }
                                                actionPosition="left"
                                            />
                                        }
                                        <ImageListItemBar
                                            sx={{
                                                background:
                                                    'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, ' +
                                                    'rgba(0,0,0,0.7) 70%, rgba(0,0,0,0) 100%)',
                                            }}
                                            position="bottom"
                                            actionIcon={
                                                <div className='p-2 mb-0'>
                                                    <p className='mb-0' >{item.description}</p><span>{item.date}</span></div>
                                            }
                                            actionPosition="left"
                                        />

                                    </ImageListItem>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </InfiniteScroll>

    )
}

export default Stories