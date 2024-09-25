import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../main';
import Loader from './Loader';


function PrivateRoute({ children }) {
  const { isAuthenticated, loading , user } = useContext(Context);

  if (loading) return <Loader />; 
  if(!user)return<Loader/>  

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
