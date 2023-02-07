import {
  Button,
  Alert,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  imageListClasses
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, styled } from "@mui/system";
import axios from "axios";
import * as React from 'react';
import {useCallback,useEffect,useState} from 'react';
import { Link } from "react-router-dom";
import useAuth from "../AdminParts/../../../others/useAuthContext";
import { useHistory } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Toast from "../../../utilis/Toast";
import { toast } from "react-toastify";

// styled component for font awesome icon
const Icon = styled("i")(({ theme }) => ({
  color: "#00000099",
  fontSize: "22px",
  margin: "5px 10px 5px 0",
}));

const AddNewCar = ({ setProcessStatus, showSnackbar }) => {
  const [status, setStatus] = React.useState("");
  const [failed, setFailed] = React.useState("");
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  const [error, setError] = React.useState(""); 
const [images, setImages] = useState([]);
const [uploading, setIsUpLoading] = useState();
const [isSubmit,setIsSubmit]=useState(false);


//delete images
const deleteImage = (index) => {
  setImages((prevState) => prevState.filter((_, i) => i !== index));
};


useEffect(()=>{
  if (isSubmit) {
    window.scrollTo(0, 0);
  }
  if (uploading) {
    toast.loading(uploading);
    setIsUpLoading();
  }
  
  if (status) {
    toast.dismiss();
    toast.success(status);
    setStatus();
  }
  if(error){
    toast.error(error)
  }


},[isSubmit,uploading,error,status])

 
const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
  let processedFiles = 0;
  if (EstablishedAcceptedFiles.length + images.length > 10) {
    toast.error("Cannot accept more than 10 files.");
    return;
  }

  const numberOfAcceptedFiles = Math.min(acceptedFiles.length, 10 - images.length);
  const EstablishedAcceptedFiles = acceptedFiles.slice(0, numberOfAcceptedFiles);

  EstablishedAcceptedFiles.forEach(file => {
    if (processedFiles >= 10) {
      toast.error("Only 10 files can be processed at a time.");
      return;
    }
    processedFiles++;
    if (!file.type.startsWith("image/jpeg") && !file.type.startsWith("image/png") && !file.type.startsWith("image/jpg")) {
      toast.error(`File ${file.name} has an unsupported format and cannot be processed.`);
      return;
    }
    if (file.size > 5.5 * 1024 * 1024) {
      toast.error(`File ${file.name} is larger than 5.5 MB and cannot be processed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const binaryStr = reader.result;
      setImages(prevState => [...prevState, binaryStr]);
    };
  });
}, []);
 
  
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });
  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch (e) {
      setFailed(`failed to logout!`);
    }
  }

  const [values, setValues] = React.useState({}); // form values state
  const [carType, setCarType] = React.useState(""); // form car type state
  const [fuel, setFuel] = React.useState(""); // form fuel type state
  // handle changing value in form
  const handleValueChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const time = 1* 60 * 1000;//waiting time to upload
  // add new car in database
  const handleSubmit = (event) => {
     
    event.preventDefault();
    setIsSubmit(true);
    setIsUpLoading("Uploading to database.. wait for about a minute please");
 
    const newCarInfo = { ...values, carType, fuel ,images};
 
    axios.post("https://uploadercloudinary.onrender.com/car",newCarInfo)
      .then(({ data }) => {
        
        if (data.code === 1) {
          setStatus(`car added succesfully`);
         
         setImages([]);
        setFuel("");
        setCarType(" ");
        setIsSubmit(false);
          event.target.reset();
        }
      //  throw new Error('Failed to upload to Cloudinary');
      })
      .catch((err) => {
        setError(`car not added, there was an error`);
      
       
        //   showSnackbar() // show notification popup containing status
      });
      
  };
  return (
    <Box>
    <Toast time={time}/>
      {error && <Alert severity="error">{error}</Alert>}
      {status && <Alert severity="success">{status}</Alert>}
      {failed && <Alert severity="error">{failed}</Alert>}
      <Typography
        variant="h4"
        align="center"
        color="primary"
        fontWeight="bold"
      >{`User:${currentUser.email}`}</Typography>
      <Typography variant="h4" align="center" color="primary" fontWeight="bold">
        Add New Car In Shop
      </Typography>
      <Box maxWidth="sm" sx={{ my: 4, mx: "auto" }}>
        {/* new car information form */}
        <form onSubmit={handleSubmit}>
          <Grid
          
            container
            rowSpacing={3.5}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              {/* car name */}
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Icon className="fas fa-file-signature"></Icon>
                <TextField
                  fullWidth
                  label="Car Name"
                  variant="standard"
                  required
                  type="text"
                  onChange={handleValueChange("carName")}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={4}>
              {/* car body color */}
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Icon className="fas fa-palette"></Icon>
                <TextField
                  fullWidth
                  label="Body Color"
                  variant="standard"
                  required
                  type="text"
                  onChange={handleValueChange("color")}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={4}>
              {/* car body color */}
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Icon className="fas fa-palette"></Icon>
                <TextField
                  fullWidth
                  label="Unique ID"
                  variant="standard"
                  required
                  type="text"
                  onChange={handleValueChange("carID")}
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={4}>
              {/* car type selector */}
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Icon className="fas fa-car"></Icon>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Car Brand</InputLabel>
                  <Select 
                     
                    fullWidth
                    required
                    value={carType}
                    onChange={(e) => setCarType(e.target.value)}
                  >
                    <MenuItem value={"Toyota"}>Toyota</MenuItem>
                    <MenuItem value={"Subaru"}>Subaru</MenuItem>
                    <MenuItem value={"Audi"}>Audi</MenuItem>
                    <MenuItem value={"Mazda"}>Mazda</MenuItem>
                    <MenuItem value={"Ford"}>Ford</MenuItem>
                    <MenuItem value={"Nissan"}>Nissan</MenuItem>
                    <MenuItem value={"Suzuki"}>Suzuki</MenuItem>
                    <MenuItem value={"Volkswagen"}>Volks Wagen</MenuItem>
                    <MenuItem value={"Honda"}>Honda</MenuItem>
                    <MenuItem value={"Isuzu"}>Isuzu</MenuItem>
                    <MenuItem value={"Land Rover"}>Land Rover</MenuItem>
                    <MenuItem value={"Range Rover"}>Range Rover</MenuItem>
                    <MenuItem value={" Lexus"}>Lexus</MenuItem>
                    <MenuItem value={"Daihatsu"}>Daihatsu</MenuItem>
                    <MenuItem value={"Jeep"}>Jeep</MenuItem>
                    <MenuItem value={"BMW"}>BMW</MenuItem>
                    <MenuItem value={"Porsche"}>Porsche</MenuItem>
                    <MenuItem value={"Honda"}>Honda</MenuItem>
                    <MenuItem value={"Hyundai"}>Hyundai</MenuItem>
                    <MenuItem value={"Mitsubishi"}>Mitsubishi</MenuItem>
                    <MenuItem value={" KIA"}> KIA</MenuItem>
                    <MenuItem value={"Peugeot"}>Peugeot</MenuItem>
                    <MenuItem value={"Renault"}>Renault</MenuItem>
                    <MenuItem value={"Mahindra"}>Mahindra</MenuItem>
                    <MenuItem value={"Chevrolet"}>Chevrolet</MenuItem>
                    <MenuItem value={"Volvo"}>Volvo</MenuItem>
                    <MenuItem value={"Scania"}> Scania</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            {/* <Grid item xs={12} md={4}>
              {/* car mileage input */}
             {/* <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Icon className="fas fa-road"></Icon>
                <TextField
                  fullWidth
                  label="Mileage"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">km</InputAdornment>
                    ),
                  }}
                  variant="standard"
                  type="number"
                  onChange={handleValueChange("mileage")}
                />
              </Box>
            </Grid> */}
            <Grid item xs={12} md={6}>
              {/* car transmission status */}
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Icon className="fas fa-tachometer-alt"></Icon>
                <TextField
                  fullWidth
                  label="Transmission"
                  variant="standard"
                  required
                  text="text"
                  onChange={handleValueChange("transmission")}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* car engine info */}
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Icon className="fas fa-cogs"></Icon>
                <TextField
                  fullWidth
                  label="Engine"
                  variant="standard"
                  required
                  type="text"
                  onChange={handleValueChange("engine")}
                />
              </Box>
            </Grid>
            <Grid item xs={5} md={4}>
              {/* car fuel type input */}
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Icon className="fas fa-gas-pump"></Icon>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Fuel</InputLabel>
                  <Select
                    fullWidth
                    required
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                  >
                    <MenuItem value={"gasoline"}>Gasoline</MenuItem>
                    <MenuItem value={"diesel"}>Diesel</MenuItem>
                    <MenuItem value={"bio-diesel"}>Bio-Diesel</MenuItem>
                    <MenuItem value={"ethanol"}>Ethanol</MenuItem>
                    <MenuItem value={"petrol"}>Petrol</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={7} md={8}>
              {/* car price in us dollar */}
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Icon className="fas fa-dollar-sign"></Icon>
                <TextField
                  fullWidth
                  label="Price"
                  variant="standard"
                  required
                  type="number"
                  onChange={handleValueChange("price")}
                />
              </Box>
            </Grid>
            
            <Grid item  xs={12}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Paper
        style={{
          cursor: 'pointer',
          background: 'fafafa',
          color: '#bdbdbd',
          border: '1px dashed #ccc',
          '&:hover': { border: '1px solid #ccc' ,
         
        },

        }}
        elevation={6}
        >

        <div style={{ padding: '16px',height:'200px' }} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p style={{ color: 'green',fontWeight:'700'}}>Drop the images here...</p>
          ) : (
       
            <><p style={{marginBottom:'5.5px',fontWeight:'700',opacity:'none'}}>Drag 'n' Drop some images here, or click to select files</p>
            <em style={{color:"#FFBF00"}}>Please select at least 5 images but a muximum of 10</em>
            <em style={{color:"#FFBF00"}}>Ensure that each image does not exceed 7MB in size</em></>
            
          )}
          <em style={{color:"#FFBF00"}}>(images with *.jpeg, *.png, *.jpg extension will be accepted)</em> 
             <Icon className="fas fa-image" style={{fontSize: "65px",display:'flex', alignItems:'center',textAlign:'center',marginLeft:'45%',marginTop:"20px"}}>
              </Icon>
        </div>
      </Paper>
      </Box>
     
         </Grid>
         <Grid item xs={12}>
            {images.length > 0 && <div>
              {images.map((image,index)=>  <>
               <img src={image} key={index} alt="" style={{height:'50px',borderRadius:"2px",width:'50px',background:'#faebd7',marginRight:"5px",objectFit:"contain"}} />
               <DeleteIcon  style={{color: "rgb(255, 0, 0)"}}  onClick={() => deleteImage(index)}/> 
                </>
                )}
              </div>}
         </Grid>
            <Grid item xs={12}>
              {/* car description textarea */}
              <TextField
                fullWidth
                multiline
                rows={4}
                sx={{ my: 2 }}
                label="Description"
                variant="outlined"
                type="text"
                required
                onChange={handleValueChange("description")}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Button
                type="submit"
                variant="outlined"
                disabled={
                  currentUser?.email !== "ayiendaglen@gmail.com" || isSubmit
   } //disbling add to database //milesmotorssocialmedia@gmail.com
              >
                Add to Database
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Typography component={Link} to="/manage">
                Manage All cars
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Typography onClick={handleLogout} component={Button}>
                Logout
              </Typography>
            </Grid>
            
          </Grid>
        </form>
      </Box>
    </Box>
  
  );
};

export default AddNewCar;
