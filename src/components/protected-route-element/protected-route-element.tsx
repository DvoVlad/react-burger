import { Navigate, useLocation } from "react-router-dom";
import { FC, ReactElement } from "react";
import { useAppSelector } from "../../services";
interface ProtectedRouteElementProps {
  element: ReactElement;
  auth?: boolean;
}
const ProtectedRouteElement: FC<ProtectedRouteElementProps> = ({element, auth = false}) => {
  const userData = useAppSelector((store) => store.user.userData);
  const loadingStatus = useAppSelector((store) => store.user.loadingStatus);
  const location = useLocation();

  if(loadingStatus === 'idle') {
    if(auth) {
      const paramRedirect: string = location.pathname !== '/logout' ? location.pathname : '';
      if(paramRedirect) {
        return(userData ? element : <Navigate to={`/login?redirect=${paramRedirect}`} replace/>);
      }
      return(userData ? element : <Navigate to={`/login`} replace/>);
    } else {
      const paramRedirect: string = new URLSearchParams(location.search).get('redirect') ?? '';
      const urlRedirect: string = paramRedirect !== '' ? paramRedirect : '/';
      return(!userData ? element : <Navigate to={urlRedirect} replace/>);
    }
  } else {
    return null;
  }
}

export default ProtectedRouteElement;