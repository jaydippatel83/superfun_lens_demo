import React from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Button } from '@mui/material';

function Search() {
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-9 m-auto'>
                    <div className=' '>
                    <Paper
                    elevation={3}
                        component="form"
                        sx={{ p: '0', display: 'flex', alignItems: 'center',borderRadius:'10px' }}
                    >
                        <div className="input-group" style={{backgroundColor:'white'}}>
                            <InputBase
                                sx={{ ml: 1, flex: 1 ,color:'black',}}
                                placeholder="Search by memers, Stories, contest  "
                                inputProps={{ 'aria-label': 'Search by memers' }}
                            />
                            <Button sx={{ p: '12px' }} variant="outlined" color='info' endIcon={<SearchIcon />}>
                            </Button>
                        </div>
                    </Paper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search