import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRouteElement({element, auth = false}) {
  const userData = useSelector((store) => store.user.userData);
  const loadingStatus = useSelector((store) => store.user.loadingStatus);
  const location = useLocation();

  if(loadingStatus === 'idle' || loadingStatus === 'failed update') {
    if(auth) {
      const paramRedirect = location.pathname !== '/logout' ? location.pathname : '';
      if(paramRedirect) {
        return(userData ? element : <Navigate to={`/login?redirect=${paramRedirect}`} replace/>);
      }
      return(userData ? element : <Navigate to={`/login`} replace/>);
    } else {
      const paramRedirect = new URLSearchParams(location.search).get('redirect');
      if(paramRedirect) {
        return(!userData ? element : <Navigate to={paramRedirect} replace/>);
      }
      return(!userData ? element : <Navigate to="/" replace/>);
    }
  } else {
    return null;
  }
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  auth: PropTypes.bool
}

export default ProtectedRouteElement;