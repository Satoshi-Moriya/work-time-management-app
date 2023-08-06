import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

import Loading from '../../../components/Loading';

type AuthProviderProps = {
  children: React.ReactElement
}

const ProtectedRoute: React.FC<AuthProviderProps> = ({ children }) => {
  const [ userId ] = useContext(AuthContext);

  if (userId === undefined) {
    return <Loading />
  }

  if (!userId) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;