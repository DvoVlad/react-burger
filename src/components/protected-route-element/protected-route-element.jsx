import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRouteElement({element, auth = false}) {
  const userData = useSelector((store) => store.user.userData);

  if(auth) {
    return(userData ? element : <Navigate to="/login" replace/>);
  } else {
    return(!userData ? element : <Navigate to="/" replace/>);
  }
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  auth: PropTypes.bool
}

export default ProtectedRouteElement;