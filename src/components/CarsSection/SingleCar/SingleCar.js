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
import {React, useEffect,useState } from "react";
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useRef } from "react";
const Icon = styled("i")(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: "22px",
}));


// const config={
//   rootMargin:'0px 0px 0px 0px',
//   threshold:0
// }
const SingleCar = ({ carInfo,isLast}) => {
  const imageRef=useRef();
  const [carImgUrl, setImgUrl] = useState("");
  useEffect(()=>{
     if (!imageRef?.current) return;
     const observer=new IntersectionObserver(([entry]) => {
        if (isLast && entry.isIntersecting ){
          console.log('last one is on view port');
          observer.unobserve(entry.target);
        }
        if (entry.isIntersecting) 
        {
          setImgUrl(entry.target.dataset.src)
          
        }
        
        
     },{
         rootMargin:'600px',
          
     });
     observer.observe(imageRef.current)
  },[imageRef,isLast])

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



//   useEffect(()=>{
//      let observer=new window.IntersectionObserver((entries,self)=>{
//       entries.forEach((entry)=>{
//         if(entry.isIntersecting){
//           loadImages(entry.target)
//           self.unobserve(entry.target);
//         }
        
//       });
//     },config)   
//      const  imgs= document.querySelectorAll('[dataset.src]');
//     imgs.forEach(img=>{
//        observer.observe(img);
//     });
//     return ()=>{
//       imgs.forEach(img=>{
//         observer.unobserve(img);
//       })
//     }

//   },[])
// const loadImages=(image)=>{
//   image.src = image.dataset.src
// }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={{display: "flex", justifyContent: "center"}}>
      <NavLink to={`/cars/details/${carID}`}>
        <Box sx={{ display: "flex", flexDirection: "column"}}>
        <Card sx={{ width: 300 }}>
          <CardActionArea>
            <div style={{minHeight:300}}>
            < LazyLoadImage
              // component="img"
              // height=200
              // width=100%
              // sx={{ objectFit: "fill"}}
              style={{height:200,
                width:'100%',objectFit: "fill"}}
                effect="blur"
                placeholderSrc={carImg}
              src={carImgUrl}
              alt="car"
              ref={imageRef} 
            />
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color="red">
               Ksh {numberWithCommas(price)}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={700}
                textSize='1.5rem'
              >
                 {Icon} {carName}
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
