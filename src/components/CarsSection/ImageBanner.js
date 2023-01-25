//hompage banner//

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ImageBanner = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = imageSlides.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const { carID } = useParams(); // get car id from url parameter

  const [carImages, setCarImages] = useState(null);
  // destructure car details
  const { carImg, img2, img3, img4, img5 } = carImages ? carImages : {};

  useEffect(() => {
    axios
      .get(`https://milesbackend.onrender.com/car/${carID}`)
      .then(({ data }) => setCarImages(data.data))
      .catch((err) => console.log(err));
  }, [carID]);
  const imageSlides = [
    {
      id: 1,
      imgPath: carImg,
    },
    {
      id: 2,
      imgPath: img2,
    },
    {
      id: 3,
      imgPath: img3,
    },
    {
      id: 4,
      imgPath: img4,
    },
    {
      id: 5,
      imgPath: img5,
    },
  ];
  return (
    <Box sx={{ position: "relative", color: "white" }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={3000}
      >
        {imageSlides.map((step, index) => (
          <div
            key={step.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  display: "block",
                  overflow: "hidden",
                  height: "100%",
                  transition: "transform .5s",
                  objectFit: "cover",
                }}
                src={step.imgPath}
                alt={"cars"}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Paper
        square
        elevation={0}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          background: "transparent",
          color: "white",
          pl: 2,
          opacity: "0.8",
        }}
      ></Paper>
      <Box
        sx={{
          background: "linear-gradient(#00000000, #000000cc)",
          pt: 8,
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
        }}
      >
        <Paper
          square
          elevation={0}
          sx={{
            background: "transparent",
            color: "#ffffff66",
            pl: 2,
          }}
        ></Paper>
        <MobileStepper
          sx={{
            background: "transparent",
            color: "inherit",
            mt: 2,
          }}
          steps={maxSteps}
          position="static"
          variant="text"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              sx={{ color: "inherit", pr: 1, pl: 2 }}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{ color: "inherit", pl: 1, pr: 2 }}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </Box>
  );
};

export default ImageBanner;
