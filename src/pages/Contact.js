
import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import {React, useEffect ,useState} from "react";
import { SendEmail } from "../utilis/Api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toast from '../utilis/Toast';
const Contact = () => {
  // states
  const[FirstName,setFirstName]=useState('')
  const[LastName,setLastName]=useState('')
  const[email,setEmail]=useState('')
  const[message,setMessage]=useState('')
  const[number,setNumber]=useState('')
  const [buttonLoading, setButtonLoading] = useState(false);
  const [send, setSend] = useState();

///////////////////////////////////////

  useEffect(()=>{
    if (send) {
      toast.success(send.msg);
      setFirstName("")
      setLastName("")
      setEmail("")
      setNumber("")
      setMessage("")
      setSend()
      
       
     
    }
},[send])   

  const onSubmit = (e) => {
    e.preventDefault();
    setButtonLoading(true);

    SendEmail({ FirstName,LastName ,email,number, message, setSend }).then(
      () => {
        setButtonLoading(false);
      }
    );
  };

  return (
    <>
    <Toast/>
    <Box sx={{ display: "flex", justifyContent: { xs: "center" } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: { sm: 5 },
        }}
      >
        <Typography variant="h4" fontSize="bold">
          Contact Us
        </Typography>
        <Typography>Got any question? Send us a message below.</Typography>
        <form onSubmit={onSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
            }}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", marginTop: 2 }}
            >
              <label htmlFor="First name" id="FirstName">
                First name
              </label>
              <TextField
                
                id="FirstName"
                placeholder="Enter your first name"
                value={FirstName}
                required
                onChange={(e)=>setFirstName(e.target.value)}
              />
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", marginTop: 2 }}
            >
              <label htmlFor="Last name" id="LastName">
                Last name
              </label>
              <TextField
                id="LastName"
                placeholder="Enter your last name"
                value={LastName}
                required
                onChange={(e)=>setLastName(e.target.value)}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", marginTop: 2 }}>
            <label htmlFor="email" id="email">
              Email
            </label>
            <TextField
              id="email"
              type="email"
              placeholder="youremail@email.com"
              value={email}
              required
              onChange={(e)=>setEmail(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", marginTop: 2 }}>
            <label htmlFor="number" id="number">
              Phone Number
            </label>
            <TextField id="number" type="number" required value={number} onChange={(e)=>setNumber(e.target.value)}/>
            <Box
              sx={{ marginTop: 2, display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="message" id="message">
                Message
              </label>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={7}
                id="message"
                required
                placeholder="Send us a message and we'll reply as soon as possible.."
                style={{ margin: 5 }}
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
              />
            </Box>

            <Button
              variant="contained"
              sx={{ width: "100%" }}
              type="submit"
            > {buttonLoading ? 'SENDING..' : 'SEND'}</Button>
          </Box>
        </form>
      
      </Box>
    </Box>
    </>
  );
};

export default Contact;
