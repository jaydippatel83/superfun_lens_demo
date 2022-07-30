import React from 'react'
import ReactPlayer from 'react-player'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

function Clips() {
    const clipData = [
        {
            name: "Clip0",
            img: "https://www.youtube.com/watch?v=uelA2U9TbgM"
        },
        {
            name: "Clip1",
            img: "https://www.youtube.com/watch?v=t_cSk9tQQkk"
        },
        {
            name: "Clip1",
            img: "https://www.youtube.com/watch?v=t_cSk9tQQkk"
        },
        {
            name: "Clip1",
            img: "https://www.youtube.com/watch?v=t_cSk9tQQkk"
        },
        {
            name: "Clip1",
            img: "https://www.youtube.com/watch?v=t_cSk9tQQkk"
        },
    ]
    return (
        <div className='container'>
            <div className='row'>
                <div className="col-12 mt-4 mb-2">
                    <div className="d-flex justify-content-between">
                        <h4>Clips</h4>
                        <h4>View All Clips</h4>
                    </div>
                </div>
                {
                    clipData.map((e, i) => {
                        return (
                            <  >
                                {
                                    i === 0 ? <div className="col-lg-8 col-md-8 col-sm-6 col-12">
                                        <ReactPlayer url={e.img} style={{ padding: '5px', borderRadius: '20px' }} width="100%" />
                                        <List>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <ImageIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Photos"/>
                                            </ListItem> 
                                        </List>
                                    </div>
                                        : <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                            <ReactPlayer url={e.img} style={{ padding: '5px', borderRadius: '20px' }} width="100%" />
                                            <List>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <ImageIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Photos"/>
                                            </ListItem> 
                                        </List>
                                        </div>
                                }
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Clips