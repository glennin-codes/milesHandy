import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { alpha, Box, styled } from "@mui/system";
import * as React from 'react';
import {useEffect,useState } from "react";
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// const Icon = styled("i")(({ theme }) => ({
//   color: theme.palette.primary.light,
//   fontSize: "22px",
// }));

const SingleCar = ({ carInfo}) => {
  // const imageRef=useRef();
  // const [carImgUrl, setImgUrl] = useState("");
  

  const {
    carID,
    carImg,
    carName,
    carType,
    transmission,
    fuel,
    color,
    mileage,
    price,
    engine,
  } = carInfo;


  // Numbers over 1000 to separated by commas
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }





  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={{display: "flex", justifyContent: "center"}}>
      <NavLink to={`/cars/details/${carID}`}>
        <Box sx={{ display: "flex", flexDirection: "column"}}>
        <Card sx={{ width: 300 }}>
          <CardActionArea>
            <div style={{Height:350}}>
            < LazyLoadImage
              // component="img"
              // height=200
              // width=100%
              // sx={{ objectFit: "fill"}}
              style={{height:250, 
                borderRadius:"5px",
                width:'100%',objectFit: "fill"}}
                effect="blur"
                placeholderSrc={carImg}
              
              src={carImg}
              alt="car"
             
            />
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color="red">
               Ksh {numberWithCommas(price)}
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                fontWeight={700}
                textSize='1.5rem'
              >
                  {carName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <span style={{ backgroundColor: "#EEF0F8" }}>
                  {transmission}
                </span>{" "}
                | <span style={{ backgroundColor: "#EEF0F8" }}>{fuel}</span>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Details
            </Button>
          </CardActions>
        </Card>
        </Box>
      </NavLink>
    </Grid>
  );
};

export default SingleCar;
