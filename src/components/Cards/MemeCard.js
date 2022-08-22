import React from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function MemeCard(props) {

    const handleNavigate = ( data) => {
        props.setDetail(data);
        props.setShow(true);
    }

    return (
        <Card sx={{ maxWidth: 345, margin: '10px 0' }} onClick={() => handleNavigate(props.data)}>
            <CardMedia
                component="img"
                height="194"
                image={props.data.metadata.media[0].original.url}
                alt={props.data.metadata.name}
                style={{objectFit:'fill' }}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.data.metadata.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}
