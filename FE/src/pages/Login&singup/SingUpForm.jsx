import React from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Card,
  InputAdornment,
  IconButton,
} from "@mui/material";
import theme from "../../theme/theme";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Navbar from "../../layout/NavBar";
import useHttpRequest from "../../hooks/useHttpRequest";
import { useNavigate } from "react-router-dom";

const formStyles = {
  form: {
    height: "740px",
    width: "400px",
    borderRadius: 0,
    borderTop: `5px solid ${theme.palette.primary.main}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: { xs: "10px", md: "20px" },
    alignItems: "center",
    marginTop: "20px",
  },
  button: {
    width: "250px",
    height: "50px",
    margin: "10px",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
};

const inputStyle = {
  sx: {
    backgroundColor: "#F1F3F5",
    width: { xs: "200px", md: "250px" },
    color: theme.palette.primary.main,
  },
};

function SingUpForm() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const { sendRequest, status, error } = useHttpRequest();

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Email:", email);
    // console.log('Date:', date);
    console.log("PhoneNumber:", phoneNumber);
    // console.log('PasswodCon:', passwordCon);
    sendRequest(
      {
        url: "api/tourists",
        method: "POST",
        data: {
          name: username,
          password,
          email,
          phoneNumber,
        },
      },
      (data) => {
        if (!error) {
          navigate("/login");
        }
      }
    );
  };

  console.log(error);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordCon, setShowPasswordCon] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordCon = () => setShowPasswordCon((view) => !view);

  return (
    <>
      <Navbar color={theme.palette.text.primary} />
      <Stack justifyContent="center" alignItems="center" m={8}>
        <Card sx={formStyles.form}>
          <Typography variant="h5">SIGN UP</Typography>
          <TextField
            id=""
            placeholder="UserName"
            type="text"
            sx={inputStyle.sx}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            id=""
            placeholder="Email"
            type="email"
            sx={inputStyle.sx}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {/* <TextField  id="" placeholder='Birthday' type="date" sx={inputStyle.sx}  value={date} 
          onChange={(event) => setDate(event.target.value)}/> */}
          <TextField
            id=""
            placeholder="PhoneNumber"
            type="text"
            sx={inputStyle.sx}
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <TextField
            id=""
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            sx={inputStyle.sx}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* <TextField  id="" placeholder='Confir Password' type={showPasswordCon ? 'text' : 'password'} sx={inputStyle.sx} value={passwordCon}
          onChange={(event) => setPasswordCon(event.target.value)} 
           InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPasswordCon}>
              {showPasswordCon ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}/> */}

          <Button
            variant="contained"
            sx={formStyles.button}
            onClick={handleLogin}
          >
            SIGN UP
          </Button>

          <Button
            onSubmit={handleLogin}
            type="submit"
            variant="contained"
            sx={formStyles.button}
          >
            LOGIN
          </Button>
        </Card>
      </Stack>
    </>
  );
}

export default SingUpForm;
