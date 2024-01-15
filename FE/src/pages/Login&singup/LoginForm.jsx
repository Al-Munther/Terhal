import React, { useContext } from 'react';
import { TextField, Button, Typography,  Stack, Card,  InputAdornment,IconButton,  Link } from '@mui/material';
import theme from '../../theme/theme';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Navbar from '../../layout/NavBar';
import AuthContext from '../../contexts/Auth/AuthContext'

const formStyles ={
  form: {
    height:'520px',
    width:'400px',
    borderRadius:0,
    borderTop:`5px solid ${theme.palette.primary.main}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    gap:'20px',
    alignItems: 'center',
    marginTop: "20px",
  },
  button: {
    width:'250px',
    height:'50px',
    margin:"10px",
    backgroundColor:theme.palette.primary.main,
    color:'#fff',
    '&:hover':{
    backgroundColor:theme.palette.primary.main,
    }
  },
};

const inputStyle={
    sx: { 
        backgroundColor:'#F1F3F5',
       width:'250px',
       color:theme.palette.primary.main
  
    }, 
  }

function LoginForm() {
  const [email, setemail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { loginUser, authError } = useContext(AuthContext);

  const handleLogin = (event) => {
    // event.preventDefault();
    console.log(email, password);
    loginUser({ email: email, password: password });
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <> 
      <Navbar color={theme.palette.text.primary}/>
      <Stack justifyContent='center' alignItems='center' m={8}>

        <Card sx={formStyles.form}>
        <Typography fontSize='28px'>LOGIN</Typography>
        <TextField  id="email" placeholder='Email' type="text" sx={inputStyle.sx}  value={email} 
            onChange={(event) => setemail(event.target.value)}/>
        <TextField  id="password" placeholder=' Password' type={showPassword ? 'text' : 'password'} sx={inputStyle.sx} value={password}
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
        
          <Button  onClick={handleLogin} type="submit" variant="contained" sx={formStyles.button}>
          LOGIN
          </Button>
          <Button  variant="contained" sx={formStyles.button}>
            SIGN UP
          </Button>
        
      <Typography>Forgot Password? <Link>Press here</Link></Typography>
        <Link>
        </Link>
        </Card>
        </Stack>
      </>
    
  );
}

export default LoginForm;