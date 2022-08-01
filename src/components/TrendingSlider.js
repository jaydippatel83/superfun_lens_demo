import React, { useState } from "react";
import Slider from "react-slick";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { LinkedCamera } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";



export default function TrendingSlider() {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const [style, setStyle] = useState("");

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


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col mt-4 mb-2">
                    <div className="d-flex justify-content-between">
                        <h4>Trendings</h4> 
                        <Button component={Link} to="/trending">View All</Button>
                    </div>
                    <Slider {...settings}>

                        {sliderData.map((item) => {
                            return (
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
                                        src={`${item.img} `}
                                        srcSet={`${item.img} `}
                                        alt={item.name}
                                        loading="lazy"
                                        width="100%" style={{ borderRadius: '20px', height: '150px', padding: '10px', cursor: 'pointer' }}
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

                                            position="bottom"
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
                                    {
                                        style == item.name && <ImageListItemBar
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
                            );
                        })}

                    </Slider>
                </div>
            </div>
        </div>
    );
}
