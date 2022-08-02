import { Box, Chip, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../header/Header';
import Search from '../Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { LinkOutlined } from '@mui/icons-material';

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
  const param = useParams();
  console.log(param, "param");
  useEffect(() => {
    const dd = sliderData && sliderData.filter((e) => e.name === param.id);
    setData(dd);
  }, [param])
  return (
    <>
      <Header />
      <Box sx={{ marginTop: { sx: '20px', sm: '50px', md: '100px' } }}>
        <Search />
        <div className='container'>
          {/* <div className='row mt-5'> */}
          {
          data &&  data.map((e) => (
              <div className='row'>
                <div className='col-12 col-sm-9 col-md-9 col-lg-9' style={{ margin: '10px 0' }}>
                  <p>{e.description}</p>
                  <div className='text-center'>

                    <img src={e.img} width="100%" />
                  </div>

                  <div className='col-12 ' style={{ margin: '10px 0' }}>
                    {
                      tags.map((e) => (
                        <Chip label={e} style={{ margin: '3px 0' }} variant="outlined" />
                      ))
                    }
                  </div>


                </div>
                <div className='col-12 col-sm-3 col-md-3 col-lg-3'>
                  <IconButton
                    sx={{ color: 'white', padding: '5px', margin: '10px' }}
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                  <label >Favorite</label>
                  <IconButton
                    sx={{ color: 'white', padding: '5px', margin: '10px' }}
                  >
                    < ModeCommentOutlinedIcon />
                  </IconButton>
                  <label>Comments</label>
                  <IconButton
                    sx={{ color: 'white', padding: '5px', margin: '10px' }}
                  >
                    < LinkOutlined />
                  </IconButton>
                  <label>Link</label>
                </div>
              </div>
            ))
          }
        </div>
        {/* </div> */}
      </Box>

    </ >
  )
}

export default TrendingDetails