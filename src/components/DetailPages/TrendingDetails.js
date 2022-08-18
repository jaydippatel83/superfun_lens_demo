import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Divider, IconButton, InputBase, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../header/Header';
import Search from '../Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
 
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { PanoramaSharp, Send } from '@mui/icons-material';
import { profileById } from '../../context/query';
import { LensAuthContext } from '../../context/LensContext';
 
const tags = [
  "#tuesday ",
  "#happy tuesday",
  "#doggies ",
  " #happy tuesday morning",
  " #happy tuesday good morning",
  " #good tuesday morning"
]
function TrendingDetails() {
  const [data, setData] = useState(); 
  const [detail, setDetail] = useState();
  const [showComment, setShowComment] = useState(false);
  const [comment, setComments] = React.useState([""]);

  const lensAuthContext = React.useContext(LensAuthContext);
  const {userPosts  } = lensAuthContext;

  const param = useParams();  

  useEffect(() => { 
    async function getProfile() { 
      if (param.id !== null) {
        const user = await  userPosts && userPosts.filter((e)=>e.id === param.id)
        setData(user);
      }

    };
    getProfile(); 
  }, [param])
 

  const handleNavigate = (data) => {
    setDetail(data); 
  }
 

  const handleShowComment = () => {
    setShowComment(!showComment);
  };


  return (
    <>
      <Header />
      <Box sx={{ marginTop: { sx: '20px', sm: '50px', md: '100px' } }}>
        <Search />
        <div className='container'>
          {/* <div className='row mt-5'> */}
          <div className='row mt-5'>
            {
              detail === undefined && data ? data.map((e) => (
                <div key={e.metadata.name} className='col-12 col-sm-8 col-md-8 col-lg-8' style={{ margin: '10px 0' }}>
                  <Card   >
                    <CardHeader
                      avatar={
                        <Avatar src={e.metadata.media[0].original.url} aria-label="recipe">

                        </Avatar>
                      }
                      title={e.metadata.name} 
                    />
                    <CardMedia
                      component="img"
                      image={e.metadata.media[0].original.url}
                      alt={e.metadata.name} 
                      style={{objectFit:'fill'}}
                    />
                    <CardContent>
                      {/* <Typography variant="body2" color="text.secondary">
                        {e.description}
                      </Typography> */}
                    </CardContent>
                    <CardActions disableSpacing>
                    <div 
                        className="d-flex align-items-center"
                        style={{ color: 'white', padding: '5px', margin: '10px', cursor: 'pointer' }}
                      >
                        <FavoriteBorderIcon />
                        <span className="d-none-xss">Likes</span>
                      </div>

                      <div
                        onClick={handleShowComment}
                        className="d-flex align-items-center"
                        style={{ color: 'white', padding: '5px', margin: '10px', cursor: 'pointer' }}
                      >
                        < ModeCommentOutlinedIcon />
                        <span className="d-none-xss">Comment</span>
                      </div>

                      <IconButton
                        sx={{ color: 'white', padding: '5px', margin: '10px' }}
                      >
                        < ShareOutlinedIcon />
                      </IconButton>
                      <label>Share</label>
                    </CardActions>

                    <Divider flexItem orientation="horizontal" style={{border:'1px solid white' }} />
                    {showComment ? (
                      <div className='m-2'>
                        <div className="d-flex justify-content-around mt-2">
                          <div className="p-0">
                             <Avatar src={detail && detail.img}/>
                          </div>
                          <form className="col-10 header-search ms-3 d-flex align-items-center">
                            <div className="input-group" style={{ background: 'white',borderRadius:'14px' }}>
                            <InputBase
                                     onChange={(e) => setComments(e.target.value)}
                                    sx={{ ml: 1, flex: 1, color: 'black'}}
                                    placeholder="Write a comment.."
                                    inputProps={{ 'aria-label': 'Search by memers' }}
                                /> 
                            </div>
                            <IconButton  >
                              <Send  />
                            </IconButton>
                          </form>
                        </div> 
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
              )) :
                <div className='col-12 col-sm-8 col-md-8 col-lg-8' style={{ margin: '10px 0' }}>
                  <Card   >
                  <CardHeader
                      avatar={
                        <Avatar src={detail && detail.metadata.media[0].original.url} aria-label="recipe">

                        </Avatar>
                      }
                      title={detail && detail.metadata.name} 
                    />
                    <CardMedia
                      component="img"
                      style={{objectFit:'fill'}}
                      image={detail && detail.metadata.media[0].original.url}
                      alt={ detail && detail.metadata.name}
                      sx={{ height: { xs: '200px', sm: '250px', md: '300px', lg: '450px' } }}
                    />
                    <CardContent>
                      {/* <Typography variant="body2" color="text.secondary">
                    {e.description}
                  </Typography> */}
                    </CardContent>
                    <CardActions disableSpacing>
                    <div 
                        className="d-flex align-items-center"
                        style={{ color: 'white', padding: '5px', margin: '10px', cursor: 'pointer' }}
                      >
                        <FavoriteBorderIcon />
                        <span className="d-none-xss">Likes</span>
                      </div>

                      <div
                        onClick={handleShowComment}
                        className="d-flex align-items-center"
                        style={{ color: 'white', padding: '5px', margin: '10px', cursor: 'pointer' }}
                      >
                        < ModeCommentOutlinedIcon />
                        <span className="d-none-xss">Comment</span>
                      </div>
                       
                      <IconButton
                        sx={{ color: 'white', padding: '5px', margin: '10px' }}
                      >
                        < ShareOutlinedIcon />
                      </IconButton>
                      <label>Share</label>
                    </CardActions>
                    <Divider flexItem orientation="horizontal" style={{border:'1px solid white' }} />
                    {showComment ? (
                      <div className='m-2'>
                        <div className="d-flex justify-content-around mt-2">
                          <div className="p-0">
                             <Avatar src={detail && detail.metadata.media[0].original.url}/>
                          </div>
                          <form className="col-10 header-search ms-3 d-flex align-items-center">
                            <div className="input-group" style={{ background: 'white',borderRadius:'14px' }}>
                            <InputBase
                                     onChange={(e) => setComments(e.target.value)}
                                    sx={{ ml: 1, flex: 1, color: 'black'}}
                                    placeholder="Write a comment.."
                                    inputProps={{ 'aria-label': 'Search by memers' }}
                                /> 
                            </div>
                            <IconButton  >
                              <Send  />
                            </IconButton>
                          </form>
                        </div> 
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
              userPosts && userPosts.map((e) => {
                if (e.id !== param.id) {
                  return (
                    <div className='col-12 col-sm-4 col-md-4 col-lg-4'>
                      <Card sx={{ margin: '10px 0' }} onClick={() => handleNavigate(e)} >
                        <CardMedia
                          component="img" 
                          height="240"
                          image={e.metadata.media[0].original.url}
                          alt={e.metadata.name} 
                          style={{objectFit:'fill'}}
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">

                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
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