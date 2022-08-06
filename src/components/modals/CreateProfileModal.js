import { useNavigate } from "react-router-dom";
import createProfile from "../../LensProtocol/profile/Create_Profile";
import React,{ useState } from "react"; 
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { styled } from "@mui/system";

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    background: 'linear-gradient(to right top, #ff0f7b, #ff3d61, #ff6049, #ff7f36, #f89b29);',
    '&:hover': {
        background: 'linear-gradient(to left top, #ff0f7b, #ff3d61, #ff6049, #ff7f36, #f89b29);',
    },
}));


export default function ProfileCreation() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    

  const [handle, setHandle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  var forbiddenCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,`<>/?]+/;

  const handleSubmit = async (event) => {
    
    if (forbiddenCharacter.test(handle)) {
        console.log(handle,"handle");
      alert("Special character are not allowed.");
      return false;
    } else if (handle.includes(' ')) {
      alert("Spaces are not allowed.");
      return false;
    }
    setIsLoading(true);
    const result = await createProfile(handle);
    console.log(result,"result");
    // await setDispatcher();

    if (result === false) {
      setIsLoading(false);
    } else {
      navigate(`/profile/${handle}`);
    }
    console.log("create profile: profile has been indexed", result);
    return true;
  };

  if (isLoading) {
    return (
      <div className="flex mt-20">
        Loading...!
      </div>
    );
  }

  return ( 
    <div>
        < Button onClick={handleClickOpen} className='m-2' style={{ background: '#488E72', color: 'white', textTransform: 'capitalize' }}>  Create Profile</Button>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Post</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField className='mt-2' id="outlined-basic" label="Title" variant="outlined" fullWidth />
                    </DialogContentText> 
                   

                    <TextField onChange={(e)=> setHandle(e.target.value)} className='my-2' id="outlined-basic" label="Handle" variant="outlined" fullWidth placeholder='@handle' />
                </DialogContent>
                <DialogActions>
                    <ColorButton onClick={handleClose}>Cancel</ColorButton>
                    <ColorButton onClick={handleSubmit}>Create Profile</ColorButton>
                </DialogActions>
            </Dialog>
        </div> 
  );
}