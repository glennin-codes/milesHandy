import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../others/useAuthContext';


const PrivateRoute = ({component:Component, ...rest}) => {
    const { currentUser } = useAuth();
    return (
     
            <Route {...rest}
             render={props=>{
               return  currentUser?<Component {...props}/>:
                <Redirect to="/login"/>
             }
                
             } />
    );
};

export default PrivateRoute;