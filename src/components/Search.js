import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider'; 
import SearchIcon from '@mui/icons-material/Search'; 
import { Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import ListSubheader from '@mui/material/ListSubheader';

function Search() {

    const [sticky, setSticky] = useState("");

  // on render, set listener
  useEffect(() => {
    console.log("hello");
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = () => {
    /* Method that will fix header after a specific scrollable */
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 250 ? "is-sticky" : "";
    setSticky(stickyClass);
    console.log(stickyClass);
  };

  const classes = `header-section d-none d-xl-block  m-auto ${sticky}`;

    return (
        <div className='container mt-5'>
            <div className='row'   >
            <CssBaseline /> 
                <div className={`${classes} ${sticky == 'is-sticky' ? 'col-10' : 'col-9'}`} 
                 style={{backgroundColor:'rgba(255, 255, 255,0.1)', borderRadius:'4px' , padding:'10px 10px 0 10px' }}>
                    <div >
                        <Paper 
                            elevation={3} 
                            component="form"
                            sx={{ p: '0', display: 'flex', alignItems: 'center', borderRadius: '10px' }}
                        >
                            <div className="input-group" style={{ backgroundColor: 'white' }}>
                                <InputBase
                                    sx={{ ml: 1, flex: 1, color: 'black', }}
                                    placeholder="Search by memers, Stories, contest  "
                                    inputProps={{ 'aria-label': 'Search by memers' }}
                                />
                                <Button sx={{ p: '12px' }} variant="contained"  style={{background:  'linear-gradient(360deg, hsla(41, 100%, 53%, 1) 7%, hsla(20, 92%, 55%, 1) 58%)'}} endIcon={<SearchIcon  />}>
                                </Button>
                            </div>
                        </Paper>
                    </div>
                    <div className=' d-flex mt-2 justify-content-center'>
                        <p style={{cursor:'pointer'}}>Memers</p> 
                        <Divider orientation="vertical" style={{border:'1px solid white', height:'25px',margin :'0 10px'}} />
                        <p style={{cursor:'pointer'}}>Clops</p> 
                        <Divider orientation="vertical" style={{border:'1px solid white', height:'25px',margin :'0 10px'}}/>
                        <p style={{cursor:'pointer'}}> Stories</p> 
                        <Divider orientation="vertical"  style={{border:'1px solid white', height:'25px',margin :'0 10px'}}/>
                        <p style={{cursor:'pointer'}}>Contest</p> 
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Search