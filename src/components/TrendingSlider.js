import React, { useEffect, useState } from "react";
import Slider from "react-slick"; 
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar'; 
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; 
import { Button } from "@mui/material"; 
import { Link as RouterLink ,useNavigate} from "react-router-dom";
import { LensAuthContext } from "../context/LensContext";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebase";



export default function TrendingSlider() {
    const navigate = useNavigate();

    const lensAuthContext = React.useContext(LensAuthContext);
    const {userPosts  } = lensAuthContext;

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

    const handleNavigate=(id)=>{ 
        navigate(`/trendingDetails${id}`)
    }

    const [story, setStory] = useState([]);


    useEffect(() => {
        async function getCreator() {
        var arry = [];

            const q = query(collection(db, "posts")); 
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => { 
                 
                arry.push(doc.data())
            });
        // console.log(arry); 
        setStory(arry);

        }
        getCreator()
    }, [])


    console.log(userPosts,"userPosts");

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col mt-4 mb-2">  
                    <div className="d-flex justify-content-between mb-2">
                        <h5>Trendings</h5>
                        <Button  component={RouterLink} to="/trending">View All</Button>
                    </div>
                    <Slider {...settings}>

                        {userPosts && userPosts.map((item) => { 
                            console.log(item,"item");
                            return (
                                <ImageListItem
                                    key={item.id}
                                    style={{ cursor: 'pointer' }}
                                    onClick={()=>handleNavigate(item.id)}
                                    onMouseEnter={e => {
                                        setStyle(item.id);
                                    }}
                                    onMouseLeave={e => {
                                        setStyle("");
                                    }}
                                >
                                    <img
                                        src={`${item.metadata.media[0].original.url} `}
                                        srcSet={`${item.metadata.media[0].original.url} `}
                                        alt={item.metadata.name}
                                        loading="lazy"
                                        width="100%" style={{ borderRadius: '20px', height: '150px', padding: '10px', cursor: 'pointer' }}
                                    />
                                    {
                                        style === item.metadata.name && <ImageListItemBar
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
                                        style === item.metadata.name && <ImageListItemBar
                                            sx={{
                                                background:
                                                    'linear-gradient(to bottom, rgba(0,0,0,0) 0%, ' +
                                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                            }}

                                            position="bottom"
                                            actionIcon={
                                                <img
                                                    src={`${item.metadata.media[0].original.url} `}
                                                    srcSet={`${item.metadata.media[0].original.url} `}
                                                    alt={item.metadata.description}
                                                    loading="lazy"
                                                    width="50" style={{ borderRadius: '20px', height: '50px', padding: '10px', margin: '15px' }}
                                                />

                                            }
                                            actionPosition="left"
                                        />
                                    }
                                    {
                                        style === item.metadata.description && <ImageListItemBar
                                            sx={{
                                                background:
                                                    'linear-gradient(to bottom, rgba(0,0,0,0) 0%, ' +
                                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                            }}

                                            position="bottom"
                                            actionIcon={
                                                <IconButton
                                                    sx={{ color: 'white', padding: '5px', margin: '10px 15px' }}
                                                    aria-label={`star ${item.metadata.description}`}
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
