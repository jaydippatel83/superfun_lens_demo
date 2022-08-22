import { Avatar, Button, Divider, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import Slider from 'react-slick';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebase/firebase';

import Blockies from 'react-blockies'
 
function TopCreators() {

    const [story, setStory] = useState([]);


    useEffect(() => {
        async function getCreator() {
        var arry = [];

            const q = query(collection(db, "profiles")); 
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => { 
                arry.push(doc.data())
            }); 
        setStory(arry);

        }
        getCreator()
    }, [])
 


    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 8,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

  



    return (
        <div className='container mt-4' >
            <div className='row'>
                <div className='col mt-5'>
                    <div className="d-flex justify-content-between mb-2">
                        <h5>Top Memers</h5>
                        <Button component={RouterLink} to="/memers">View All</Button>
                    </div>
                    <Slider {...settings}>
                        {
                           story && story.map((e) => { 
                                return (
                                    <div key={e.handle}>
                                        <Link
                                            to={`/${e.id}`}
                                            state={{ Profile: e }}
                                            params={{ e }}
                                            color="inherit"
                                            underline="hover"
                                            component={RouterLink}
                                        >
                                            <div className="story" style={{ backgroundImage: `linear-gradient(360deg, rgba(255,255,255,1) 50%, rgba(11,11,11,0) 50%), url(${e.photo ? e.photo : "/assets/bg.png"})` }}>

                                                <Avatar src={e.photo ?  e.photo : "/assets/bg.png"} className="storyAvatar" />
                                                
                                                <h4>{e.handle}</h4>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>

        </div>

    )
}

export default TopCreators