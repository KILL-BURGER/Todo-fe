import {Navigate, useNavigate} from "react-router-dom";

const PrivateRoute = ({user, children}) => {
  return (
    user ? children : <Navigate to='/login'/>
  );
};

export default PrivateRoute;