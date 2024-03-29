import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect,useState} from 'react'
import axios from 'axios'
import  Typography from '@mui/material/Typography';
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import useAuth from "../AdminParts/../../../others/useAuthContext"




export default function ManageCars() {
  const {currentUser}=useAuth()
    const [cars,setCars]=useState([])
    const[success,setSuccess]=React.useState("")
    const [refresh, setRefresh] = useState(false);
    useEffect(()=>{
const fetchCars= async ()=>{
const {data}=await axios.get("https://uploadercloudinary.onrender.com/cars/all")
setCars(data)
}
fetchCars()
    },[refresh])
    const deleteCar = async (carID) => {
      try {
        setSuccess("");
        alert(`Are you sure you want to delete ${carID}? This action is irreversible!`);
        const res = await axios.delete(`https://uploadercloudinary.onrender.com/car/${carID}`);
        if (res.status === 200) {
          setSuccess("Car deleted successfully");
          setRefresh(prevState => !prevState);
          
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 404) {
          alert("Car not found");
        
        } else {
          alert("There was an error");
         
        }
      }
    };
    
  return (
    <TableContainer component={Paper}>
      {success && <Alert severity='success'>{success}</Alert>}
      <Table sx={{width:'100vw',maxWidth:'100vw' }} aria-label="simple table">
        <TableHead sx={{width:"100vw"}}>
          <TableRow >
            <TableCell sx={{width:"15vw"}}>Car Name</TableCell>
            <TableCell sx={{width:"15vw"}}>Car IMAGE</TableCell>
            <TableCell sx={{width:"15vw"}} >Unique ID</TableCell>
            <TableCell sx={{width:"10vw"}} >Action</TableCell>
           
     
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map(({ carID, carImg, carName, carType, transmission, fuel, color, mileage, price, engine }) => (
            <TableRow
              key={carID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  sx={{width:"15vw"}} component="th" scope="row">
                {carName}
              </TableCell>
              <TableCell  sx={{width:"15vw"}} component="th" scope="row">
               <img src= {carImg} alt={''} style={{height:'100px',width:"100px"}}/>
              </TableCell>
              <TableCell  sx={{width:"25vw"}} >
                {carID}
              
              </TableCell>
           
              <TableCell  sx={{width:"10vw"}}  >
                <Typography component={Button}
                // disabled={currentUser?.email!=='milesmotorssocialmedia@gmail.com'}
                onClick={
                  ()=>deleteCar(carID)
                }
                >Delete</Typography>
              </TableCell>
           
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
