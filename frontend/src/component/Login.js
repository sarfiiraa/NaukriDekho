import { useContext, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  Paper,
  Box,
} from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";

import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";
import { green, grey } from "@material-ui/core/colors";
import React from 'react';
import image from './images/4565.jpg'
const useStyles = makeStyles((theme) => ({
  body: {
    padding: "60px 60px",
  },
  inputBox: {
    width: "300px",
  },
  submitButton: {
    width: "300px",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });
    if (verified) {
      axios
        .post(apiList.login, loginDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  return loggedin ? (
    <Redirect to="/" />
  ) : (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
      }}
    >
      <Paper elevation={3} className={classes.body} >
      <Grid container direction="column" spacing={4} alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h2">
            Login
          </Typography>
        </Grid>
        <Grid item>
          <EmailInput
            label="Email"
            value={loginDetails.email}
            onChange={(event) => handleInput("email", event.target.value)}
            inputErrorHandler={inputErrorHandler}
            handleInputError={handleInputError}
            className={classes.inputBox}
          />
        </Grid>
        <Grid item>
          <PasswordInput
            label="Password"
            value={loginDetails.password}
            onChange={(event) => handleInput("password", event.target.value)}
            className={classes.inputBox}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLogin()}
            className={classes.submitButton}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Paper>
    </Box>
  );
};

export default Login;


//==============================================

// import { useContext, useState } from "react";
// import {
//   Grid,
//   Button,
//   Typography,
//   makeStyles,
//   Paper,
// } from "@material-ui/core";
// import axios from "axios";
// import { Redirect } from "react-router-dom";

// import PasswordInput from "../lib/PasswordInput";
// import EmailInput from "../lib/EmailInput";
// import { SetPopupContext } from "../App";

// import apiList from "../lib/apiList";
// import isAuth from "../lib/isAuth";

// const useStyles = makeStyles((theme) => ({
//   body: {
//     padding: "60px 60px",
//   },
//   inputBox: {
//     width: "300px",
//   },
//   submitButton: {
//     width: "300px",
//   },
//   paper: {
//     backgroundColor: theme.palette.grey[200], // Light grey color
//   },
// }));

// const Login = (props) => {
//   const classes = useStyles();
//   const setPopup = useContext(SetPopupContext);

//   const [loggedin, setLoggedin] = useState(isAuth());

//   const [loginDetails, setLoginDetails] = useState({
//     email: "",
//     password: "",
//   });

//   const [inputErrorHandler, setInputErrorHandler] = useState({
//     email: {
//       error: false,
//       message: "",
//     },
//     password: {
//       error: false,
//       message: "",
//     },
//   });

//   const handleInput = (key, value) => {
//     setLoginDetails({
//       ...loginDetails,
//       [key]: value,
//     });
//   };

//   const handleInputError = (key, status, message) => {
//     setInputErrorHandler({
//       ...inputErrorHandler,
//       [key]: {
//         error: status,
//         message: message,
//       },
//     });
//   };

//   const handleLogin = () => {
//     const verified = !Object.keys(inputErrorHandler).some((obj) => {
//       return inputErrorHandler[obj].error;
//     });
//     if (verified) {
//       axios
//         .post(apiList.login, loginDetails)
//         .then((response) => {
//           localStorage.setItem("token", response.data.token);
//           localStorage.setItem("type", response.data.type);
//           setLoggedin(isAuth());
//           setPopup({
//             open: true,
//             severity: "success",
//             message: "Logged in successfully",
//           });
//           console.log(response);
//         })
//         .catch((err) => {
//           setPopup({
//             open: true,
//             severity: "error",
//             message: err.response.data.message,
//           });
//           console.log(err.response);
//         });
//     } else {
//       setPopup({
//         open: true,
//         severity: "error",
//         message: "Incorrect Input",
//       });
//     }
//   };

//   return loggedin ? (
//     <Redirect to="/" />
//   ) : (
//     <Paper elevation={3} className={`${classes.body} ${classes.paper}`}>
//       <Grid container direction="column" spacing={4} alignItems="center">
//         <Grid item>
//           <Typography variant="h3" component="h2">
//             Login
//           </Typography>
//         </Grid>
//         <Grid item>
//           <EmailInput
//             label="Email"
//             value={loginDetails.email}
//             onChange={(event) => handleInput("email", event.target.value)}
//             inputErrorHandler={inputErrorHandler}
//             handleInputError={handleInputError}
//             className={classes.inputBox}
//           />
//         </Grid>
//         <Grid item>
//           <PasswordInput
//             label="Password"
//             value={loginDetails.password}
//             onChange={(event) => handleInput("password", event.target.value)}
//             className={classes.inputBox}
//           />
//         </Grid>
//         <Grid item>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handleLogin()}
//             className={classes.submitButton}
//           >
//             Login
//           </Button>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// export default Login;

//======================================


// import { useContext, useState } from "react";
// import {
//   Grid,
//   Button,
//   Typography,
//   makeStyles,
//   Paper,
//   Container,
//   Box,
//   useMediaQuery,
//   useTheme,
// } from "@material-ui/core";
// import axios from "axios";
// import { Redirect } from "react-router-dom";

// import PasswordInput from "../lib/PasswordInput";
// import EmailInput from "../lib/EmailInput";
// import { SetPopupContext } from "../App";

// import apiList from "../lib/apiList";
// import isAuth from "../lib/isAuth";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     minHeight: "100vh",
//     backgroundImage: "url('/path-to-your-background-image.jpg')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   paper: {
//     padding: theme.spacing(4),
//     maxWidth: 400,
//     width: "100%",
//     backgroundColor: theme.palette.grey[100],
//     boxShadow: theme.shadows[5],
//   },
//   inputBox: {
//     width: "100%",
//     marginBottom: theme.spacing(2),
//   },
//   submitButton: {
//     width: "100%",
//     padding: theme.spacing(1.5),
//     marginTop: theme.spacing(2),
//   },
//   logo: {
//     width: 100,
//     marginBottom: theme.spacing(2),
//   },
// }));

// const Login = (props) => {
//   const classes = useStyles();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
//   const setPopup = useContext(SetPopupContext);

//   const [loggedin, setLoggedin] = useState(isAuth());

//   const [loginDetails, setLoginDetails] = useState({
//     email: "",
//     password: "",
//   });

//   const [inputErrorHandler, setInputErrorHandler] = useState({
//     email: {
//       error: false,
//       message: "",
//     },
//     password: {
//       error: false,
//       message: "",
//     },
//   });

//   const handleInput = (key, value) => {
//     setLoginDetails({
//       ...loginDetails,
//       [key]: value,
//     });
//   };

//   const handleInputError = (key, status, message) => {
//     setInputErrorHandler({
//       ...inputErrorHandler,
//       [key]: {
//         error: status,
//         message: message,
//       },
//     });
//   };

//   const handleLogin = () => {
//     const verified = !Object.keys(inputErrorHandler).some((obj) => {
//       return inputErrorHandler[obj].error;
//     });
//     if (verified) {
//       axios
//         .post(apiList.login, loginDetails)
//         .then((response) => {
//           localStorage.setItem("token", response.data.token);
//           localStorage.setItem("type", response.data.type);
//           setLoggedin(isAuth());
//           setPopup({
//             open: true,
//             severity: "success",
//             message: "Logged in successfully",
//           });
//           console.log(response);
//         })
//         .catch((err) => {
//           setPopup({
//             open: true,
//             severity: "error",
//             message: err.response.data.message,
//           });
//           console.log(err.response);
//         });
//     } else {
//       setPopup({
//         open: true,
//         severity: "error",
//         message: "Incorrect Input",
//       });
//     }
//   };

//   return loggedin ? (
//     <Redirect to="/" />
//   ) : (
//     <div className={classes.root}>
//       <Container component="main" maxWidth="xs">
//         <Paper elevation={3} className={classes.paper}>
//           <Box display="flex" flexDirection="column" alignItems="center">
//             <img src="/path-to-your-logo.png" alt="Logo" className={classes.logo} />
//             <Typography component="h1" variant="h5">
//               Sign in
//             </Typography>
//             <form noValidate>
//               <EmailInput
//                 label="Email Address"
//                 value={loginDetails.email}
//                 onChange={(event) => handleInput("email", event.target.value)}
//                 inputErrorHandler={inputErrorHandler}
//                 handleInputError={handleInputError}
//                 className={classes.inputBox}
//               />
//               <PasswordInput
//                 label="Password"
//                 value={loginDetails.password}
//                 onChange={(event) => handleInput("password", event.target.value)}
//                 className={classes.inputBox}
//               />
//               <Button
//                 type="button"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 className={classes.submitButton}
//                 onClick={handleLogin}
//               >
//                 Sign In
//               </Button>
//             </form>
//           </Box>
//         </Paper>
//       </Container>
//     </div>
//   );
// };

// export default Login;
