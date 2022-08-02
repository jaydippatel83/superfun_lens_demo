import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Fab, IconButton, ImageList, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../header/Header';
import MemeCard from './Cards/MemeCard';
import Search from './Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { LinkOutlined } from '@mui/icons-material';
import Chip from '@mui/material/Chip';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Stack from '@mui/material/Stack';

function Profile() {
    const params = useParams();
    console.log(params, "param");
    const [data, setData] = useState();
    const [show, setShow] = useState(false);
    const [detail, setDetail] = useState();

    const storyData = [
        {
            name: "Jaydip Patel",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNTBiIBka08VQlJa_2LMCkrZKqZ7fT-PV_zw&usqp=CAU",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "Mansi Joshi",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2AnKOLhLgzlFjwD4nLP21BDjglT43XsVwJQ&usqp=CAU",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '4 day ago'
        },
        {
            name: "Disha Sathwara",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgWkh-FmK4k2h4a0dVk9FDO14869w7TjqwyA&usqp=CAU",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago',
        },
        {
            name: "Dhruv Sathwara",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDXiKxCdCFAZverAZZPHT77HqndAlgTEtncg&usqp=CAU",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "Karan Pujara",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTScPSEyda4ZdKgzlMZpIjmCoa6Hyt8xVBNeg&usqp=CAU",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "Web3Builder",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPQGFlovSwUJsdCOFZYqKxiGTy9aBjCLmQVw&usqp=CAU",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "CryptoYard",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRIuplMPz5muZkszIGtUUO0H7XkCw5gxhTew&usqp=CAU",
            description: "21 GIFs From the Second Truss–Sunak Tory Leadership Debate",
            date: '3 day ago'
        },
        {
            name: "CrypticDev",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4meNTJr3kzXWPMkCAjzkTNXeD3Ys8LBfGPziN_epUuBsbmG9PTCMux02sno7Tm6TKspA&usqp=CAU",
            description: "Apologies Aren’t Enough, We Need Reparations Apologies Aren’t Enough, We Need Reparations"
        },
        {
            name: "CryptoPunk",
            img: "https://g.foolcdn.com/art/companylogos/square/link.png",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "Vitalik",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbJbf16Wo-44LjPMWnx9UPvA11MzO8_0igDw&usqp=CAU",
            description: "Apologies Aren’t Enough, We Need Reparations",
            date: '3 day ago'
        },
        {
            name: "Polygon",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIB9Rv-Q2c3sp_1N-bKK0EspLRtR5Y45iJUA&usqp=CAU",
            description: "A Showdown Over Abortion Access Is Unfolding In Kansas",
            date: '3 day ago'
        }
    ]

    const tags = [
        "#tuesday ",
        "#happy tuesday",
        "#doggies ",
        " #happy tuesday morning",
        " #happy tuesday good morning",
        " #good tuesday morning"
    ]

    useEffect(() => {
        const getUserData = () => {
            const dd = storyData && storyData.filter((e) => e.name === params.id);
            setData(dd);
        }
        getUserData();
    }, [params])


    console.log(data, "data");

    return (
        < >
            <Header />

            <Box sx={{ marginTop: { sx: '20px', sm: '50px', md: '100px' } }}>
                <Search />
                <div className='container'>
                    <div className='row mt-5'>
                        <div className='col-12 col-sm-12 col-md-4 col-lg-4'>
                            {
                                data && data.map((e) => {
                                    return (
                                        <Box style={{ margin: '10px  ', background: 'rgba(255,255,255,0.1)', padding: '20px' }}>
                                            <div className='text-center'>
                                                <img src={e.img} width="100" height="100" style={{ borderRadius: '50%' }} />
                                                <h5 className='pt-4' style={{ fontWeight: '600' }}>{e.name}</h5>
                                                <h6 className='' style={{ fontWeight: '600' }}>{`@${e.name.trim().toLowerCase()}`}</h6>
                                                <p>{e.description}</p>
                                                <Button variant='outlined'>Follow</Button>
                                            </div>
                                            {/* <Divider flexItem orientation="horizontal" style={{border:'1px solid white',margin :'10px 10px'}} /> */}

                                            <div className='d-flex justify-content-around text-left mt-4'>
                                                <div className='p-0 m-0'>
                                                    <p className='p-0 m-0'>Followers</p>
                                                    <h4 className='p-0 m-0'>101</h4>

                                                </div>
                                                <Divider flexItem orientation="vertical" style={{ border: '1px solid white', margin: '0 10px' }} />
                                                <div className='p-0 m-0'>
                                                    <p className='p-0 m-0'>Following</p>
                                                    <h4 className='p-0 m-0'>56</h4>

                                                </div>
                                            </div>
                                            {/* <Divider flexItem orientation="horizontal" style={{border:'1px solid white',margin :'10px 10px'}} /> */}

                                            <div className='d-flex justify-content-around text-left mt-4'>
                                                <Button variant='outlined'>Hire Me</Button>
                                                <Button variant='outlined'>Send Message</Button>
                                            </div>
                                        </Box>
                                    )
                                })
                            }
                        </div>

                        <div className='col-12 col-sm-12 col-md-8 col-lg-8'>
                            {
                                show && <div className='row'>
                                    <div className='col-12 ' style={{ margin: '10px 0' }}>
                                        {/* <p>{detail.description}</p> */}

                                        <Card   >
                                            <CardMedia
                                                component="img"
                                                image={detail.img}
                                                alt={detail.name}
                                                sx={{ height: { xs: '200px', sm: '250px', md: '300px', lg: '450px' } }}
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="text.secondary">
                                                    {detail.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions disableSpacing>
                                                <IconButton aria-label="add to favorites">
                                                    <FavoriteBorderIcon />
                                                </IconButton>
                                                <IconButton
                                                    sx={{ color: 'white', padding: '5px', margin: '10px' }}
                                                >
                                                    < ModeCommentOutlinedIcon />
                                                </IconButton>
                                                <label>Comments</label>
                                                <IconButton
                                            sx={{ color: 'white', padding: '5px', margin: '10px' }}
                                        >
                                            < ShareOutlinedIcon />
                                        </IconButton>
                                        <label>Share</label>
                                            </CardActions>
                                        </Card> 

                                        <div className='col-12 ' style={{ margin: '10px 0' }}>
                                            {
                                                tags.map((e) => (
                                                    <Chip label={e} style={{ margin: '3px 0' }} variant="outlined" />
                                                ))
                                            }
                                        </div>


                                    </div> 
                                </div>
                            }
                            <div className='row'>
                                {
                                    storyData && storyData.map((e) => {
                                        return (
                                            <div className='col-12 col-sm-6 col-md-6 col-lg-4'>
                                                <MemeCard data={e} setDetail={setDetail} setShow={setShow} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </ >
    )
}

export default Profile