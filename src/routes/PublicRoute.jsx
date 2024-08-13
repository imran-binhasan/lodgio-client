import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Loading from '../pages/Loading/Loading';

const PublicRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);

    if(loading){
        return <Loading/>
    }
    if(user){
        return <Navigate to={'/'}/>
    }
    return children
};

export default PublicRoute;