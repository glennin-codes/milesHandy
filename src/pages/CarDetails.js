import { Button, Grid, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import LoadingSpinner from "../components/Common/LoadingSpinner/LoadingSpinner";
import { useHistory } from "react-router-dom";
import ImageCarousel from "../components/CarsSection/Courosel/ImageCourosel";
import CarsSection from "../components/CarsSection/CarsSection";

const DetailsContainer = styled(Grid)(({ theme }) => ({
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

const CarDetails = () => {
  const { carID } = useParams(); // get car id from url parameter

  const [carDetails, setCarDetails] = useState(null);
  // destructure car details
  const {
    carName,
    carType,
    transmission,
    fuel,
    color,
    mileage,
    price,
    engine,
    description,
  } = carDetails ? carDetails : {};

  useEffect(() => {
    axios
      .get(`https://milesmotors.herokuapp.com/car/${carID}`)
      .then(({ data }) => setCarDetails(data.data))
      .catch((err) => console.log(err));
  }, [carID]);

  // create table rows
  function createData(name, value) {
    return { name, value };
  }
  // table rows
  const rows = [
    createData("body color", color),
    createData("Car Type", carType),
    createData("transmission", transmission),
    createData("Fuel type", fuel),
    createData("engine", engine),
    // createData("mileage", `${mileage} meters`),
  ];

  const history = useHistory();

  // Numbers with Commas over 1000
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return !carDetails ? (
    <LoadingSpinner />
  ) : (
    <Box sx={{ maxWidth: "xl", mx: "auto", py: 3, px: 1 }}>
      <DetailsContainer container spacing={2}>
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              height: "500px",
              background: "#00000011",
              display: "flex",
              justifyContent: "center",
              borderRadius: "10px",
              "&:hover img": { transform: "scale(1.1)" },
            }}
          >
            <ImageCarousel />
          </Box>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                my: 2,
              }}
            >
              {carName}
            </Typography>
            <p style={{ padding: "0 10px", color: "#000000cc" }}>
              {description}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "medium",
              my: 2,
            }}
          >
            Car Details
          </Typography>
          <TableContainer>
            <Table>
              <TableBody
                sx={{
                  textTransform: "capitalize",
                  "& th": { fontWeight: "medium" },
                }}
              >
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
                <TableRow
                  sx={{ "& *": { fontSize: "25px", fontWeight: "bold" } }}
                >
                  <TableCell>Price</TableCell>
                  <TableCell align="right">Ksh {numberWithCommas(price)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ px: 2, my: 5 }}>
            <Button
              variant="outlined"
              fullWidth
              component="a"
              href="http://wa.me/+254733381707"
              target="_blank"
            
            >
              Enquire
            </Button>
          </Box>
        </Grid>
      </DetailsContainer>
     
       <CarsSection/>
     
    </Box>
  );
};

export default CarDetails;
