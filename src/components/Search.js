import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import { Button, styled, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    background: 'linear-gradient(to right top, #ff0f7b, #ff3d61, #ff6049, #ff7f36, #f89b29);',
    '&:hover': {
        background: 'linear-gradient(to left top, #ff0f7b, #ff3d61, #ff6049, #ff7f36, #f89b29);',
    },
}));

function Search() {

    const [sticky, setSticky] = useState("");

    // on render, set listener
    useEffect(() => { 
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
    };

    const classes = `header-section  m-auto ${sticky}`;

    return (
        <div className='container mt-5'>
            <div className='row'   >
                <div className='col-12 text-center mb-3'>
                    <Typography component="h5" sx={{ fontSize: 25, fontWeight: 'bold' }}>
                        Have a fun with <span style={{ color: '#F66A24' }}>Memes</span>,
                        {/* Super cool <span style={{ color: '#FFB511' }}>PFPs</span>, */}
                        <span> Participate</span> in <span style={{ color: '#488E72' }}>Meme Contest  </span>and
                        <span style={{ color: '#0078BF' }}> Hire Memers. </span>
                        {/* <span style={{ color: '#488E72' }}>GIFs</span> and
                        <span style={{ color: '#0078BF' }}>Stickers</span> */}
                    </Typography>
                </div>
                <CssBaseline />
                <div className={`${classes} ${sticky === 'is-sticky' ? 'col-10 ' : 'col-9'}`}
                    style={{ backgroundColor: 'rgba(255, 255, 255,0.1)', borderRadius: '4px', padding: '10px 10px 0 10px' }}>
                    <div >
                        <Paper
                            elevation={3}
                            component="form"
                            sx={{ p: '0', display: 'flex', alignItems: 'center' }}
                        >
                            <div className="input-group" style={{ background: 'white', borderRadius: '4px' }}>
                                <InputBase
                                    sx={{ ml: 1, flex: 1, color: 'black' }}
                                    placeholder="Search by memers, Stories, contest  "
                                    inputProps={{ 'aria-label': 'Search by memers' }}

                                />
                                < Button sx={{ p: '12px' }} style={{ background: '#488E72', color: 'white' }} endIcon={<SearchIcon />}>
                                </ Button>
                            </div>
                        </Paper>
                    </div>
                    <div className=' d-flex mt-2 justify-content-center'>
                        <p style={{ cursor: 'pointer' }}>Memers</p>
                        <Divider orientation="vertical" style={{ border: '1px solid white', height: '25px', margin: '0 10px' }} />
                        <p style={{ cursor: 'pointer' }}>Clips</p>
                        <Divider orientation="vertical" style={{ border: '1px solid white', height: '25px', margin: '0 10px' }} />
                        <p style={{ cursor: 'pointer' }}> Stories</p>
                        <Divider orientation="vertical" style={{ border: '1px solid white', height: '25px', margin: '0 10px' }} />
                        <p style={{ cursor: 'pointer' }}>Contest</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search