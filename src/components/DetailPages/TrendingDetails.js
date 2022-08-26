import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, CircularProgress, Divider, IconButton, InputBase, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Header from '../../header/Header';
import Search from '../Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { PanoramaSharp, Send } from '@mui/icons-material';
import { profileById } from '../../context/query';
import { LensAuthContext } from '../../context/LensContext';
import { createComment } from '../../LensProtocol/post/comments/create-comment';
import { toast } from 'react-toastify';
import { getPublicationByLatest } from '../../LensProtocol/post/explore/explore-publications';
import { getComments, posts } from '../../LensProtocol/post/get-post';
import { getpublicationById } from '../../LensProtocol/post/get-publicationById';
import { addReaction } from '../../LensProtocol/reactions/add-reaction';
import { getLikes } from '../../LensProtocol/reactions/get-reactions';

const tags = [
  "#tuesday ",
  "#happy tuesday",
  "#doggies ",
  " #happy tuesday morning",
  " #happy tuesday good morning",
  " #good tuesday morning"
]
function TrendingDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [detail, setDetail] = useState();
  const [showComment, setShowComment] = useState(false);
  const [comment, setComments] = React.useState([""]);
  const [loading, setLoading] = useState(false);
  const lensAuthContext = React.useContext(LensAuthContext);
  const [count, setCount] = useState();

  const [posts, setPosts] = useState([]);
  const [displayCmt, setDisplayCmt] = useState([]);

  const { profile, userAdd,
    update,
    setUpdate,
    loginCreate, login } = lensAuthContext;

  const param = useParams();

  async function get_posts() {
    try {
      const pst = await getpublicationById(param.id);

      setData(pst.data.publication);
      const ids = detail != undefined ? detail.id : param.id;
      const cmt = await getComments(ids);
      setDisplayCmt(cmt); 
      const d = await getPublicationByLatest();
      setPosts(d.data.explorePublications.items);


    } catch (error) {
      console.log(error);
    }

  }


  useEffect(() => {
    get_posts();
  }, [param.id, update, loading, data, detail])




  const handleNavigate = (data) => {
    setDetail(data);
  }


  const handleShowComment = async () => {
    setShowComment(!showComment);

  };

  const handleComment = async (data) => {
    const id = window.localStorage.getItem("profileId");
    setLoading(true);
    const obj = {
      address: userAdd,
      comment: comment,
      login: loginCreate,
      profileId: id,
      publishId: data.id,
      user: profile.handle
    }
    const result = await createComment(obj);
    toast.success("Success!!")
    setLoading(false);
    setUpdate(!update);

  }

  const handleNav = (dd) => {
    navigate(`/${dd}`)
  }

  const addReactions = async (data) => {
    const id = window.localStorage.getItem("profileId");

    const dd = {
      id: id,
      address: userAdd,
      login: loginCreate,
      react: "UPVOTE",
      pId: data.profile.id,
      publishId: data && data.id,
    }
    const res = await addReaction(dd);
  }

  useEffect(() => {
    var array = [];
    async function getLisked() {
      const id = window.localStorage.getItem("profileId");
      const res = {
        pid: data && data?.mainPost?.profile?.id ? data?.mainPost?.profile?.id : detail && detail?.mainPost?.profile?.id ? detail?.mainPost?.profile?.id : detail?.profile?.id,
        pid2: id,
      }

      const like = await getLikes(res);
      like?.publications?.items?.map((e) => {
        if (e.reaction == "UPVOTE") {
          array.push(e.reaction);
        }
      })
      setCount(array)
    }
    getLisked();
  }, [param, detail, data])



  return (
    <>
      <Header />
      <Box sx={{ marginTop: { sx: '20px', sm: '50px', md: '100px' } }}>
        <Search />
        <div className='container'>
          {/* <div className='row mt-5'> */}
          <div className='row mt-5'>
            {
              detail === undefined && data &&
              <div key={data.id} className='col-12 col-sm-8 col-md-8 col-lg-8' style={{ margin: '10px 0' }}>
                <Card   >

                  <CardHeader
                    onClick={() => handleNav(data && data.__typename === "Comment" ? data.mainPost.profile.id : data.profile.id)}
                    avatar={
                      <Avatar
                        src={data != undefined && 
                          data?.profile?.picture != null ?
                          data?.profile?.picture?.original?.url :  'https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF'} aria-label="recipe">

                      </Avatar>
                    }
                    title={data && data.__typename === "Comment" ? data.mainPost.metadata.name : data.metadata.name}
                  />

                  <CardMedia
                    component="img"
                    image={data && data.__typename === "Comment" ? data.mainPost.metadata.media[0].original.url : data.metadata.media[0].original.url}
                    alt={data && data.__typename === "Comment" ? data.mainPost.metadata.name : data.metadata.name}
                    style={{ objectFit: 'fill' }}
                  />
                  <CardContent className=' '>
                    <Typography variant="body2" color="text.secondary">
                      {data && data.__typename === "Comment" ? data.mainPost.metadata.description : data.metadata.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <div
                      className="d-flex align-items-center"
                      style={{ color: 'white', padding: '5px', margin: '10px', cursor: 'pointer' }}
                      onClick={() => addReactions(data)}
                    >
                      <FavoriteBorderIcon /> {count && count.length}
                      <span className="d-none-xss m-1">Likes</span>
                    </div>

                    <div
                      onClick={handleShowComment}
                      className="d-flex align-items-center"
                      style={{ color: 'white', padding: '5px', margin: '10px', cursor: 'pointer' }}
                    >
                      < ModeCommentOutlinedIcon />  {data && data.stats.totalAmountOfComments}

                      <span className="d-none-xss m-2">Comment</span>
                    </div>

                    <IconButton
                      sx={{ color: 'white', padding: '5px', margin: '10px' }}
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
                          <Avatar src={data ? data.img : "https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF"} />
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
                          <IconButton onClick={() => handleComment(data)} >
                            {loading ? <CircularProgress /> : <Send />}
                          </IconButton>
                        </form>
                      </div>

                      {
                        data !== undefined && displayCmt && displayCmt.map((e) => {
                          return (
                            <div  style={{margin:'10px'}} key={e.id}>
                              <Divider />    
                              <div className="p-0 d-flex " style={{padding:'5px'}}>
                                <Avatar src={e.__typename === "Comment" ? e.profile?.picture?.original?.url : 'https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF'} />
                                <p className='mb-0 align-self-center ml-2'>{e.__typename === "Comment" ? e.profile.handle : e.profile.handle}</p>
                              </div>
                              <p style={{
                                padding: '10px',
                                background: '#000',
                                borderRadius: '14px',
                                margin: '5px',
                                width: 'fit-content'
                              }}>{e.__typename === "Comment" && e.metadata.content}</p>
                              <Divider />                        </div>
                          )
                        })
                      }

                    </div>
                  ) : (
                    ""
                  )}
                </Card>
                {
                  tags.map((e) => (
                    <Chip label={e} style={{ margin: '5px 0' }} variant="outlined" />
                  ))
                }
              </div>
            }
            {
              detail !== undefined && <div key={detail.id} className='col-12 col-sm-8 col-md-8 col-lg-8' style={{ margin: '10px 0' }}>
                <Card   >
                  <CardHeader
                    onClick={() => handleNav(detail != undefined && detail.__typename === "Comment" ? detail.mainPost.profile.id : detail.profile.id)}
                    avatar={
                      <Avatar
                        src={detail != undefined && 
                          detail?.profile?.picture != null ?
                          detail?.profile?.picture?.original?.url :  'https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF'} aria-label="recipe">

                      </Avatar>
                    }
                    title={detail != undefined && detail.__typename === "Comment" ? detail.mainPost.metadata.name : detail.metadata.name}
                  />
                  <CardMedia
                    component="img"
                    style={{ objectFit: 'fill' }}
                    image={detail != undefined && detail.__typename === "Comment" ? detail.mainPost.metadata.media[0].original.url : detail.metadata.media[0].original.url}
                    alt={detail != undefined && detail.__typename === "Comment" ? detail.mainPost.metadata.name : detail.metadata.name}
                    sx={{ height: { xs: '200px', sm: '250px', md: '300px', lg: '450px' } }}
                  />
                  <CardContent className=' '>
                    <Typography variant="body2" color="text.secondary">
                      {detail && detail.__typename === "Comment" ? detail.mainPost.metadata.description : detail.metadata.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <div
                      className="d-flex align-items-center"
                      style={{ color: 'white', padding: '5px', margin: '10px', cursor: 'pointer' }}
                      onClick={() => addReactions(detail)}
                    >
                      <FavoriteBorderIcon /> {count && count.length}
                      <span className="d-none-xss m-1">Likes</span>
                    </div>

                    <div
                      onClick={handleShowComment}
                      className="d-flex align-items-center"
                      style={{ color: 'white', padding: '5px', margin: '10px', cursor: 'pointer' }}
                    >
                      < ModeCommentOutlinedIcon /> {detail && detail.stats.totalAmountOfComments}
                      <span className="d-none-xss m-2">Comment</span>
                    </div>

                    <IconButton
                      sx={{ color: 'white', padding: '5px', margin: '10px' }}
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
                          <Avatar src={profile?.picture != null ? profile?.picture?.original?.url : 'https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF'} />
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
                          <IconButton onClick={() => handleComment(detail)}  >
                            <Send />
                          </IconButton>
                        </form>
                      </div>
                      {
                        detail !== undefined && displayCmt && displayCmt.map((e) => {
                          return (
                            <div  style={{margin:'20px'}} key={e.id}>
                              <div className="p-0 d-flex " style={{padding:'10px'}}>
                                <Avatar src={e.__typename === "Comment" ? e.profile?.picture?.original?.url : 'https://superfun.infura-ipfs.io/ipfs/QmRY4nWq3tr6SZPUbs1Q4c8jBnLB296zS249n9pRjfdobF'} />
                                <p className='mb-0 align-self-center ml-2'>{e.__typename === "Comment" ? e.profile.handle : e.profile.handle}</p>
                              </div>
                              <p style={{
                                padding: '10px',
                                background: '#000',
                                borderRadius: '14px',
                                margin: '5px',
                                width: 'fit-content'
                              }}>{e.__typename === "Comment" && e.metadata.content}</p>
                              <Divider />                        </div>
                          )
                        })
                      }
                    </div>
                  ) : (
                    ""
                  )}
                </Card>
                {
                  tags.map((e) => (
                    <Chip key={e} label={e} style={{ margin: '5px 0' }} variant="outlined" />
                  ))
                }
              </div>
            }
            {
              posts && posts.map((e) => {
                if (e.id !== param.id) {
                  return (
                    <div key={e.id} className='col-12 col-sm-4 col-md-4 col-lg-4'>
                      <Card sx={{ margin: '10px 0' }} onClick={() => handleNavigate(e)} >
                        <CardMedia
                          component="img"
                          height="240"
                          image={e.__typename === "Comment" ? e.mainPost.metadata.media[0].original.url : e.metadata.media[0].original.url}
                          alt={e.__typename === "Comment" ? e.mainPost.metadata.name : e.metadata.name}
                          style={{ objectFit: 'fill' }}
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary" className='mx-2'>
                            {e.__typename === "Comment" ? e.mainPost.metadata.content : e.metadata.content}
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing className='p-0'>
                          <IconButton aria-label="add to favorites">
                            <FavoriteBorderIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </div>
                  )
                }
                return (
                  <></>
                )
              })
            }
          </div>
        </div>
      </Box>

    </ >
  )
}

export default TrendingDetails