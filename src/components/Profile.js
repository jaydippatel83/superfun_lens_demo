import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Divider, IconButton, InputBase, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../header/Header';
import MemeCard from './Cards/MemeCard';
import Search from './Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Chip from '@mui/material/Chip';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Send } from '@mui/icons-material';
import { profileById } from '../context/query';
import { posts } from '../LensProtocol/post/get-post';
import { follow } from '../LensProtocol/follow/follow';
import { toast } from 'react-toastify';
import { LensAuthContext } from '../context/LensContext';
import { findDOMNode } from 'react-dom';
import FollowModal from './modals/FollowModal';
import moment from 'moment'

function Profile() {
    const params = useParams();
    const [data, setData] = useState();
    const [show, setShow] = useState(false);
    const [detail, setDetail] = useState();
    const [showComment, setShowComment] = useState(false);
    const [comment, setComments] = React.useState([""]);
    const [post, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const lensAuthContext = React.useContext(LensAuthContext);
    const {login} = lensAuthContext;

    const [update,setUpdate]= useState(false);
    const [title,setTitle]= useState("");

    const [open, setOpen] = React.useState(false);   

    const handleClickOpen = (text) => {
        setTitle(text)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }; 



    const handleShowComment = () => {
        setShowComment(!showComment);
    };

    const tags = [
        "#tuesday ",
        "#happy tuesday",
        "#doggies ",
        " #happy tuesday morning",
        " #happy tuesday good morning",
        " #good tuesday morning"
    ] 
    useEffect(() => {
        const getUserData = async () => {
            const dd = await posts(params.id);
            setPosts(dd.data.publications.items);
        }
        getUserData();
    }, [params,update])
 

    useEffect(() => {
        getProfile();
    }, [loading,update])

    async function getProfile() {
        if (params.id !== null) {
            const user = await profileById(params.id);
            setData(user);
        }
    };
 

    const handleFollow = async (id) => {
        const fId = window.localStorage.getItem("profileId");
        setLoading(true);
        const data ={
           id : id,
           login: login,
           followId: fId 
        }
        const res = await follow(data);
        console.log(res, "res");
        if(res){ 
            setLoading(false);
            setUpdate(!update);
            toast.success("Followed!");
        }
        await getProfile();
       
    }
  
    return (
        < >
            <Header />

            <Box sx={{ marginTop: { sx: '20px', sm: '50px', md: '100px' } }}>
                <Search />
                <div className='container'>
                    <div className='row mt-5'>
                        <div className='col-12 col-sm-12 col-md-4 col-lg-4'>
                        {
                        data == undefined  && <Box sx={{ display: 'flex',justifyContent:'center' }}>
                            <CircularProgress />
                        </Box>
                    }
                            {
                                data && <Box style={{ margin: '10px  ', background: 'rgba(255,255,255,0.1)', padding: '20px' }}>
                                    <div className='text-center'>
                                        <img src={data.picture != null ? data.picture.original.url : 'assets/bg.png'} width="100" height="100" style={{ borderRadius: '50%' }} alt="" />
                                        <h5 className='pt-4' style={{ fontWeight: '600' }}>{data.handle}</h5>
                                        <h6 className='' style={{ fontWeight: '600' }}>{`@${data.handle.trim().toLowerCase()}`}</h6>
                                        {/* <p>{e.description}</p> */}
                                        <Button variant='outlined' onClick={() => handleFollow(data.id)}>{loading ? <CircularProgress/> :"Follow"}</Button>
                                    </div>
                                    {/* <Divider flexItem orientation="horizontal" style={{border:'1px solid white',margin :'10px 10px'}} /> */}
                                 <FollowModal data={data} open={open} close={handleClose} title={title}/>
                                    <div className='d-flex justify-content-around text-left mt-4'>
                                        <div className='p-0 m-0' onClick={()=>handleClickOpen("Followers")}>
                                            <p className='p-0 m-0'>Followers</p>
                                            <h4 className='p-0 m-0'>{data.stats.totalFollowers}</h4>

                                        </div>
                                        <Divider flexItem orientation="vertical" style={{ border: '1px solid white', margin: '0 10px' }} />
                                        <div className='p-0 m-0' onClick={()=>handleClickOpen("Following")}>
                                            <p className='p-0 m-0'>Following</p>
                                            <h4 className='p-0 m-0'>{data.stats.totalFollowing}</h4>

                                        </div>
                                    </div>
                                    {/* <Divider flexItem orientation="horizontal" style={{border:'1px solid white',margin :'10px 10px'}} /> */}

                                    <div className='d-flex justify-content-around text-left mt-4'>
                                        <Button variant='outlined'>Hire Me</Button>
                                        <Button variant='outlined'>Send Message</Button>
                                    </div>
                                </Box>
                            }
                        </div>

                        <div className='col-12 col-sm-12 col-md-8 col-lg-8'>
                            {
                                show && <div className='row'>
                                    <div className='col-12 ' style={{ margin: '10px 0' }}>
                                        {/* <p>{detail.description}</p> */}

                                        <Card   >
                                            <CardHeader
                                                avatar={
                                                    <Avatar src={detail.profile.picture != null ? detail.profile.picture.original.url : 'assets/bg.png'} aria-label="recipe">

                                                    </Avatar>
                                                }
                                                title={detail.__typename === "Comment" ? detail.mainPost.metadata.name : detail.metadata.name}
                                                subheader={moment(detail.createdAt).format('LLL')}
                                            />
                                            <CardMedia
                                                component="img"
                                                image={detail.__typename === "Comment" ? detail.mainPost.metadata.media[0].original.url : detail.metadata.media[0].original.url}
                                                alt={detail.__typename === "Comment" ? detail.mainPost.metadata.name : detail.metadata.name}
                                                sx={{ height: { xs: '200px', sm: '250px', md: '300px', lg: '450px', objectFit: 'fill' } }}
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="text.secondary" className='p-0'>
                                                    {detail.__typename === "Comment" ? detail.mainPost.metadata.description : detail.metadata.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions disableSpacing>
                                                <div
                                                    className="d-flex align-items-center"
                                                    style={{ color: 'white', padding: '2px', margin: '0 10px', cursor: 'pointer' }}
                                                >
                                                    <FavoriteBorderIcon />
                                                    <span className="d-none-xss">Likes</span>
                                                </div>

                                                <div
                                                    onClick={handleShowComment}
                                                    className="d-flex align-items-center"
                                                    style={{ color: 'white', padding: '2px', margin: '0 10px', cursor: 'pointer' }}
                                                >
                                                    < ModeCommentOutlinedIcon />
                                                    <span className="d-none-xss">Comment</span>
                                                </div>
                                                <IconButton
                                                    sx={{ color: 'white', padding: '2px', margin: '0 10px' }}
                                                >
                                                    < ShareOutlinedIcon />
                                                </IconButton>
                                                <label>Share</label>
                                            </CardActions>
                                            <Divider flexItem orientation="horizontal" style={{ border: '1px solid white' }} />
                                            {showComment ? (
                                                <div className='m-2'>
                                                    <div className="d-flex justify-content-around mt-2">
                                                        <div className="p-0">
                                                            <Avatar src={detail && detail.img} />
                                                        </div>
                                                        <form className="col-10 header-search ms-3 d-flex align-items-center">
                                                            <div className="input-group" style={{ background: 'white', borderRadius: '14px' }}>
                                                                <InputBase
                                                                    onChange={(e) => setComments(e.target.value)}
                                                                    sx={{ ml: 1, flex: 1, color: 'black' }}
                                                                    placeholder="Write a comment.."
                                                                    inputProps={{ 'aria-label': 'Search by memers' }}
                                                                />
                                                            </div>
                                                            <IconButton  >
                                                                <Send />
                                                            </IconButton>
                                                        </form>
                                                    </div>
                                                </div>
                                            ) : (
                                                ""
                                            )}
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
                                    post.length !== 0 ? post.map((e) => {
                                        return (
                                            <div className='col-12 col-sm-6 col-md-6 col-lg-4'>
                                                <MemeCard data={e} setDetail={setDetail} setShow={setShow} />
                                            </div>
                                        )
                                    }) : <h1>No publications is created!</h1>
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