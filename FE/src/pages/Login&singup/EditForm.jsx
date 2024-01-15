import React from 'react';
import { TextField, Button, Typography,  Stack, Card,  InputAdornment,IconButton } from '@mui/material';
import theme from '../../theme/theme';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Navbar from '../../layout/NavBar';
import useHttpRequest from "../../hooks/useHttpRequest";
import AuthContext from "../../contexts/Auth/AuthContext";
import { useContext, useEffect, useState } from "react";


const formStyles ={
  form: {
    p:'40px 0',
    width:'400px',
    borderRadius:0,
    borderTop:`5px solid ${theme.palette.primary.main}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    gap:{xs:'10px',md:'20px'},
    alignItems: 'center',
    marginTop:"20px",
  },
  button: {
    width:'250px',
    height:'50px',
    margin:"10px",
    backgroundColor:theme.palette.primary.main,
    color:'#fff',
    '&:hover':{
        backgroundColor:theme.palette.secondary.main,
    }
  },
};

const inputStyle={
    sx: { 
        backgroundColor:'#F1F3F5',
       width:{xs:'200px',md:'250px'},
       color:theme.palette.primary.main
  
    }, 
  }

function EditForm() {
  
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [passwordCon, setPasswordCon] = React.useState('');
  const [image, setImage] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [langs, setLangs] = React.useState([]);

  const handleLogin = (event) => {
    event.preventDefault();
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordCon, setShowPasswordCon] = React.useState(false);
  const { authState } = useContext(AuthContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordCon = () => setShowPasswordCon((view) => !view);

  // hh
  // const {
  //   sendRequest: sendUpdateUserRequest,
  //   status: updateCityRequestStatues,
  //   error: updateCityRequestError,
  // } = useHttpRequest();

  // const handelUpdate = () => {
  //   console.log(authState)
  //   const formData = new FormData();

  //   formData.append("username", username);
  //   formData.append("password", password);
  //   formData.append("email", email);
  //   formData.append("location", location);
  //   formData.append("phone", phone);
  //   formData.append("image", image);
  //   formData.append("description", description);
  //   formData.append("langs", langs);

    
  //   sendUpdateUserRequest(
  //       {
  //         url: "api/tourist",
  //         method: "PUT",
  //         data: formData,
  //       },
  //       (data) => {console.log(data)}
  //     );
  //     }

  
  return (
    <>
    <Navbar color={theme.palette.text.primary}/>
    <Stack justifyContent='center' alignItems='center' m={8}>
      <Card sx={formStyles.form} onSubmit={handleLogin}>
      <Typography variant="h3" >Edit</Typography>
        <TextField  id="" placeholder='UserName' type="text" sx={inputStyle.sx}  value={username} 
          onChange={(event) => setUsername(event.target.value)} />
        <TextField  id="" placeholder='Email' type="email" sx={inputStyle.sx}  value={email} 
          onChange={(event) => setEmail(event.target.value)}/>
          <TextField  id="" placeholder='Location' type="text" sx={inputStyle.sx}  value={location} 
          onChange={(event) => setLocation(event.target.value)}/>
          <TextField  id="" placeholder='Phone' type="text" sx={inputStyle.sx}  value={phone} 
          onChange={(event) => setPhone(event.target.value)}/>
          <TextField  id="" placeholder='Image' type="file" sx={inputStyle.sx}  value={image} 
          onChange={(event) => setImage(event.target.value)}/>
          <TextField  id="" placeholder='Languages' type="text" sx={inputStyle.sx}  value={langs} 
          onChange={(event) => setLangs(event.target.value)} />
          
      <TextField  id="" placeholder='Password' type={showPassword ? 'text' : 'password'} sx={inputStyle.sx} value={password}
          onChange={(event) => setPassword(event.target.value)} 
           InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}/>
      <TextField  id="" placeholder='Confir Password' type={showPasswordCon ? 'text' : 'password'} sx={inputStyle.sx} value={passwordCon}
          onChange={(event) => setPasswordCon(event.target.value)} 
           InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPasswordCon}>
              {showPasswordCon ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}/>

      <TextField  id="" placeholder='description' type="text" sx={inputStyle.sx}  value={description} fullWidth minRows={5} maxRows={6}  multiline
          onChange={(event) => setDescription(event.target.value)}/>

        <Button  variant="contained" sx={formStyles.button} >
        Edit
        </Button>
      </Card>
      </Stack>
    </>
  );
}

export default EditForm;