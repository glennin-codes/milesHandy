import { Box, styled } from '@mui/system';
import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Container, Typography } from '@mui/material';
import useAuthContext from '../others/useAuthContext';
import { useHistory, useLocation } from 'react-router-dom';
import Login from '../components/Auth/Login/Login';
import { PageHeading } from '../App';

const SignInButton = styled(Box)(({ theme }) => ({
    width: '100%', maxWidth: '400px', textAlign: 'center',
    display: 'flex', alignItems: 'center',
    padding: '10px', margin: '20px auto', cursor: 'pointer',
    border: `1px solid ${theme.palette.primary.main}`, borderRadius: '30px',
    '&:hover': { background: theme.palette.primary.main, color: 'white' },
}))

const Authentication = ({ children }) => {
    const { user, googleLogin } = useAuthContext();

    const location = useLocation();
    const backToPrevious = location.state?.from?.pathname || '/profile';
    const history = useHistory();
    user && history.push(backToPrevious);


    return (
        <Box>
            <Container>
                <PageHeading sx={{ color: 'primary.main' }}>Authentication</PageHeading>
                {children || <Login />}
                <SignInButton onClick={googleLogin}>
                    <GoogleIcon sx={{ mr: 1 }} />
                    <Typography sx={{ flexGrow: 1 }}>Sign in with Google</Typography>
                </SignInButton>
            </Container>
        </Box>
    );
};

export default Authentication;