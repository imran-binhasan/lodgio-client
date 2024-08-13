import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Loading from '../pages/Loading/Loading';
import { toast } from 'react-toastify';

const PublicRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);

    if(loading){
        setTimeout(()=>{
            toast.success("Login successful !", {
                position: "top-right",
                autoClose: 3000,
              });
        },500)
        return <Loading/>
    }
     // If the user is logged in, redirect to the profile page
     if (user) {
        setTimeout(()=>{
            toast.success("Login successful !", {
                position: "top-right",
                autoClose: 3000,
              });
        },500)
        
        
        return <Navigate to={location.state?location.state:'/'} replace />;
    }
    return children
};

export default PublicRoute;