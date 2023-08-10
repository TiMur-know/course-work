import { useContext } from 'react';
import { UserContext } from './userContext';
import AccessErrorPage from './access_error';
const withAuthorization = (allowedRoles) => (WrappedComponent) => {
    return (props) => {
    const { user } = useContext(UserContext);
    if (!user || !allowedRoles.includes(user.role)) {
        return <AccessErrorPage />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthorization;