import { Grid, Typography, Box } from "@material-ui/core";
import React from 'react';
import image from './images/4565.jpg'
const Welcome = (props) => {
  return (
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

      <Grid
        container
        item
        direction="column"
        alignItems="center"
        justify="center"
        style={{ padding: "30px", minHeight: "93vh" }}
      >
        <Grid item>
          <Typography variant="h3" color="primary">Welcome to Naukri Dekho</Typography>
        </Grid>
      </Grid>
    </Box>
    
  );
};

// const Welcome = () => {
//   return (
//     <Box
//       sx={{
//         backgroundImage: 'url(image)',
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // width: '100%',
        // height: '100vh',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: '30px',
//       }}
//     >
//       <Grid container direction="column" alignItems="center">
//         <Grid item>
//           <Typography variant="h2" style={{ color: '#fff' }}>
//             Welcome to Job Portal
//           </Typography>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };


export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
