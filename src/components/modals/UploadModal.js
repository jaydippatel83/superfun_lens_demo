import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { InputBase } from '@mui/material';
import { YouTube } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { createPost } from '../../LensProtocol/post/create-post';
import { LensAuthContext } from '../../context/LensContext';
import { Buffer } from 'buffer';
import { Web3Storage } from 'web3.storage';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// import { create as ipfsHttpClient } from "ipfs-http-client"; 
const apiToken = process.env.REACT_APP_IPFS;
const client = new Web3Storage({ token: apiToken });

// const client = ipfsHttpClient('https://2DIKlkyA71zoQOZD912IAmpaZjk:38a490f2dde76d9ce0cbf0a9143a6b01@filecoin.infura.io');

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    background: 'linear-gradient(to right top, #ff0f7b, #ff3d61, #ff6049, #ff7f36, #f89b29);',
    '&:hover': {
        background: 'linear-gradient(to left top, #ff0f7b, #ff3d61, #ff6049, #ff7f36, #f89b29);',
    },
}));

export default function UploadModal() {
    const lensAuthContext = React.useContext(LensAuthContext);
    const { profile, login, disconnectWallet, update, isUpdate } = lensAuthContext;
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [tags, setTags] = React.useState([]);
    const [file, setFile] = React.useState("");


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addTags = event => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };

    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };

    const handleUpload = async () => { 
        const postData = {
            title: title,
            photo: file,
            tags: tags,
            login: login
        }
        console.log(postData,"postData");
        const res = await createPost(postData);
        console.log(res, "res");
        isUpdate(!update);
    }

   

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        const ext = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${ext}`;
        const newFile = new File([file], fileName, { type: file.type });
        const cid = await client.put([newFile], {
            name: fileName,
        });
        const imageURI = `https://${cid}.ipfs.dweb.link/${fileName}`;
        setFile(imageURI);

    }

    return (
        <div>
            <Button className='m-2' style={{ background: '#F66A24', color: 'white', textTransform: 'capitalize' }} onClick={handleClickOpen}  >Post</ Button>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField onChange={(e) => setTitle(e.target.value)} className='mt-2' id="outlined-basic" label="Title" variant="outlined" fullWidth />
                    </DialogContentText>

                    <div className="flex items-center mt-2" style={{ border: '1px solid white', borderRadius: '6px' }}>
                        <input
                            onChange={(e) => handleUploadImage(e)}
                            type="file"
                            name="file"
                            id="file"
                            className="input-file d-none" />
                        <label
                            htmlFor="file"
                            style={{ width: '100%', cursor: 'pointer' }}
                            className="rounded-3 text-center    js-labelFile p-2 my-2 w-20  "
                        >
                            <CloudUploadIcon />
                            <p className="js-fileName">
                                Upload Meme(PNG, JPG, GIF, MP4.)
                            </p>
                        </label>
                    </div>
                    <TextField onKeyUp={event => addTags(event)} className='my-2' id="outlined-basic" label="Add Tags" variant="outlined" fullWidth placeholder='#crypto #gif #meme' />

                    <Stack direction="row" spacing={1}>
                        {tags.map((tag, index) => (
                            <Chip label={`#${tag}`}
                                onClick={() => removeTags(index)}
                                variant="outlined"
                            />

                        ))}
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <ColorButton onClick={handleClose}>Cancel</ColorButton>
                    <ColorButton onClick={handleUpload}>Upload</ColorButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}
